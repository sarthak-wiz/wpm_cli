const easyTexts = [
    "The quick brown fox jumps over the lazy dog.",
    "A journey of a thousand miles begins with a single step.",
    "To be or not to be, that is the question."
  ];
  
  const mediumTexts = [
    "In the end, it's not the years in your life that count. It's the life in your years.",
    "Success is not final, failure is not fatal: it is the courage to continue that counts.",
    "The only way to do great work is to love what you do."
  ];
  
  const hardTexts = [
    "I am not a product of my circumstances. I am a product of my decisions.",
    "Strive not to be a success, but rather to be of value. That is the true measure of achievement.",
    "The future belongs to those who believe in the beauty of their dreams and work tirelessly to achieve them."
  ];
  
  export function generateText(difficulty) {
    let texts;
    switch (difficulty) {
      case 'Easy':
        texts = easyTexts;
        break;
      case 'Medium':
        texts = mediumTexts;
        break;
      case 'Hard':
        texts = hardTexts;
        break;
      default:
        texts = easyTexts;
    }
    return texts[Math.floor(Math.random() * texts.length)];
  }