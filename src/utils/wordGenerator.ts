const COMMON_WORDS = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "I", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at", "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what", "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take", "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also", "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us"
];

const CODE_SNIPPETS = [
  "const", "function", "return", "export", "default", "import", "from", "async", "await", "try", "catch", "finally", "if", "else", "switch", "case", "break", "continue", "while", "for", "of", "in", "let", "var", "interface", "type", "class", "extends", "implements", "public", "private", "protected", "static", "readonly", "new", "this", "super", "throw", "typeof", "instanceof", "void", "null", "undefined", "true", "false", "=>", "...", "??", "?."
];

export function generateWords(type: 'english' | 'code', count: number): string[] {
  const source = type === 'english' ? COMMON_WORDS : CODE_SNIPPETS;
  const result: string[] = [];
  for (let i = 0; i < count; i++) {
    result.push(source[Math.floor(Math.random() * source.length)]);
  }
  return result;
}