// Scraper Service
// Currently uses mock data. Replace getMockPosts() internals with real API calls.
// Real APIs needed: Twitter API v2, Reddit API, Facebook Graph API, etc.

const MOCK_POSTS = [
  {
    id: '1', user: 'Priya Sharma', handle: '@priya_travels',
    platform: 'Twitter', country: 'India', lang: 'English',
    category: 'Tatkal', sentiment: 'negative',
    text: 'Applied for Tatkal passport 3 days ago, still no update on the portal. Has anyone faced this? The PSK helpline just rings and rings. Really frustrated!',
    summary: 'User frustrated with no update on Tatkal passport application after 3 days, helpline unreachable.',
    likes: 234, comments: 56, shares: 12,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2', user: 'James Mitchell', handle: '@jamesmit',
    platform: 'Reddit', country: 'USA', lang: 'English',
    category: 'Renewal', sentiment: 'positive',
    text: 'Just got my passport renewed in record 4 days! Filed online, no appointment needed. The new digital process is so much smoother than before.',
    summary: 'User praises fast 4-day passport renewal through new digital online process.',
    likes: 891, comments: 143, shares: 67,
    createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3', user: 'Arun Kumar', handle: '@arun_k_official',
    platform: 'Twitter', country: 'India', lang: 'Hindi',
    category: 'Scams', sentiment: 'negative',
    text: 'WARNING: Got a call from someone claiming to be from Passport Seva. They asked for OTP and Rs.2500 fee. DO NOT fall for this!',
    summary: 'User warns about passport fraud call demanding OTP and money, urges reporting to cybercrime.',
    likes: 2100, comments: 389, shares: 1240,
    createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4', user: 'Ministry of External Affairs', handle: '@MEAIndia',
    platform: 'Twitter', country: 'India', lang: 'English',
    category: 'Government', sentiment: 'neutral',
    text: 'Passport Seva Kendras across 37 cities will observe extended working hours (8AM–8PM) from Dec 1–31 to clear pending applications.',
    summary: 'MEA announces extended PSK hours across 37 cities in December to clear passport application backlog.',
    likes: 5670, comments: 1230, shares: 3450,
    createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
  },
];

/**
 * Get posts — returns mock data now, but is structured to be replaced
 * with real Twitter/Reddit/etc. API calls
 */
async function getMockPosts() {
  // TODO: Replace with real scrapers:
  // const twitterPosts = await scrapeTwitter('passport');
  // const redditPosts = await scrapeReddit('passport');
  // return [...twitterPosts, ...redditPosts, ...];
  return MOCK_POSTS;
}

/**
 * Example stub for Twitter API v2 scraping
 * Requires TWITTER_BEARER_TOKEN in .env
 */
async function scrapeTwitter(keyword) {
  // const res = await fetch(
  //   `https://api.twitter.com/2/tweets/search/recent?query=${keyword}&max_results=100`,
  //   { headers: { Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}` } }
  // );
  // const data = await res.json();
  // return data.data.map(t => ({ id: t.id, text: t.text, platform: 'Twitter', ... }));
  return [];
}

module.exports = { getMockPosts, scrapeTwitter };
