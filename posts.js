const express = require('express');
const router = express.Router();
const { getMockPosts } = require('../services/scraper');
const { filterGibberish, categorise, getSentiment } = require('../services/nlp');
const { generateSummary } = require('../services/summarise');
const { clusterPosts } = require('../services/cluster');

// GET /api/posts
// Query params: platform, category, sentiment, lang, country, search, sortBy
router.get('/', async (req, res) => {
  try {
    const { platform, category, sentiment, lang, country, search, sortBy = 'time' } = req.query;

    // 1. Fetch raw posts (mock data — replace with real scrapers)
    let posts = await getMockPosts();

    // 2. Gibberish filter
    posts = posts.filter(p => !filterGibberish(p.text));

    // 3. Enrich with NLP
    posts = posts.map(p => ({
      ...p,
      category: p.category || categorise(p.text),
      sentiment: p.sentiment || getSentiment(p.text),
      summary: p.summary || generateSummary(p.text),
    }));

    // 4. Cluster similar posts
    posts = clusterPosts(posts);

    // 5. Apply filters
    if (platform) posts = posts.filter(p => p.platform === platform);
    if (category) posts = posts.filter(p => p.category === category);
    if (sentiment) posts = posts.filter(p => p.sentiment === sentiment);
    if (lang) posts = posts.filter(p => p.lang === lang);
    if (country) posts = posts.filter(p => p.country === country);
    if (search) {
      const q = search.toLowerCase();
      posts = posts.filter(p =>
        p.text.toLowerCase().includes(q) ||
        (p.summary || '').toLowerCase().includes(q) ||
        p.user.toLowerCase().includes(q)
      );
    }

    // 6. Sort
    if (sortBy === 'engagement') {
      posts.sort((a, b) => (b.likes + b.comments + b.shares) - (a.likes + a.comments + a.shares));
    } else {
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json({ success: true, count: posts.length, posts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;
