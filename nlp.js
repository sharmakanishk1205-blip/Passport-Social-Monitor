// NLP Service — categorisation, sentiment, gibberish detection

const CATEGORIES = {
  'Application': ['apply', 'application', 'first time', 'new passport', 'form'],
  'Renewal': ['renew', 'renewal', 'expired', 'expiry', 'extend'],
  'Tatkal': ['tatkal', 'urgent', 'emergency passport', 'tatkaal'],
  'Appointments': ['appointment', 'slot', 'book', 'PSK', 'seva kendra', 'walk-in'],
  'Visa': ['visa', 'tourist visa', 'business visa', 'stamp', 'entry'],
  'Travel Issues': ['airport', 'stranded', 'denied', 'blocked', 'detained'],
  'Government': ['ministry', 'MEA', 'announcement', 'government', 'official'],
  'Scams': ['fraud', 'scam', 'fake', 'OTP', 'phishing', 'warning'],
  'Personal Experiences': ['my experience', 'got my', 'finally', 'took me'],
  'News': ['report', 'breaking', 'news', 'update', 'latest'],
};

const POSITIVE_WORDS = ['great', 'fast', 'smooth', 'excellent', 'happy', 'finally', 'amazing', 'recommend', 'easy', 'good'];
const NEGATIVE_WORDS = ['frustrated', 'delay', 'problem', 'fail', 'fraud', 'scam', 'stranded', 'blocked', 'disappointed', 'bad', 'stuck'];

/**
 * Classify post text into one of 10 categories
 */
function categorise(text) {
  const lower = text.toLowerCase();
  let bestCat = 'News';
  let bestScore = 0;

  for (const [cat, keywords] of Object.entries(CATEGORIES)) {
    const score = keywords.reduce((acc, kw) => acc + (lower.includes(kw) ? 1 : 0), 0);
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

/**
 * Basic rule-based sentiment analysis
 */
function getSentiment(text) {
  const lower = text.toLowerCase();
  let score = 0;
  POSITIVE_WORDS.forEach(w => { if (lower.includes(w)) score++; });
  NEGATIVE_WORDS.forEach(w => { if (lower.includes(w)) score--; });
  if (score > 0) return 'positive';
  if (score < 0) return 'negative';
  return 'neutral';
}

/**
 * Detect gibberish / spam / bot posts
 * Returns true if the post should be filtered OUT
 */
function filterGibberish(text) {
  if (!text || text.length < 20) return true;

  // Too many repeated characters
  if (/(.)\1{5,}/.test(text)) return true;

  // Very high ratio of non-alphabetic characters
  const alphaCount = (text.match(/[a-zA-Z]/g) || []).length;
  const ratio = alphaCount / text.length;
  if (ratio < 0.3) return true;

  // Common spam patterns
  const spamPatterns = [/click here/i, /buy now/i, /free money/i, /\$\$\$/, /work from home/i];
  if (spamPatterns.some(p => p.test(text))) return true;

  // Extremely short with no real content
  const wordCount = text.trim().split(/\s+/).length;
  if (wordCount < 4) return true;

  return false;
}

module.exports = { categorise, getSentiment, filterGibberish };
