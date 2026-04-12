// Basic profanity & slur filter for AdSense compliance and community safety
// Expand this list as needed

const bannedPatterns = [
  // Racial slurs
  /\bn[i!1][g9][g9][e3]r\b/gi,
  /\bk[i1]k[e3]\b/gi,
  /\bsp[i1][c©]k\b/gi,
  /\bch[i1]nk\b/gi,
  /\bw[e3]tb[a@]ck\b/gi,

  // Extreme hate / slurs
  /\bf[a@][g9][g9][o0]t\b/gi,
  /\btr[a@]nn[yi]\b/gi,

  // Threats
  /\b(i will |i'm going to |gonna )(kill|murder|rape|hurt)\b/gi,

  // Self-harm encouragement
  /\b(kill your(self)?|kys)\b/gi,
];

// Words to asterisk (softer filter)
const softFilterWords = [
  'fuck', 'shit', 'bitch', 'asshole', 'cunt', 'pussy', 'cock',
  'dick', 'whore', 'slut', 'bastard', 'motherfucker', 'jackass',
];

function filterMessage(text) {
  let filtered = text;

  // Hard block: replace with [removed]
  for (const pattern of bannedPatterns) {
    filtered = filtered.replace(pattern, '[removed]');
  }

  // Soft filter: asterisk profanity
  for (const word of softFilterWords) {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filtered = filtered.replace(regex, (match) => '*'.repeat(match.length));
  }

  return filtered;
}

function containsBannedContent(text) {
  return bannedPatterns.some((pattern) => {
    pattern.lastIndex = 0;
    return pattern.test(text);
  });
}

module.exports = { filterMessage, containsBannedContent };
