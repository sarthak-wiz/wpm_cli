export function calculateWPM(originalText, typedText, duration) {
    const words = originalText.trim().split(/\s+/).length;
    const minutes = duration / 60; // Convert seconds to minutes
    return Math.round(words / minutes);
}

export function calculateAccuracy(original, typed) {
    let correct = 0;
    const totalChars = original.length;

    for (let i = 0; i < totalChars; i++) {
        if (original[i] === typed[i]) {
            correct++;
        }
    }

    return Math.round((correct / totalChars) * 100);
}

export function countMistakes(original, typed) {
    let mistakes = 0;
    const maxLength = Math.max(original.length, typed.length);

    for (let i = 0; i < maxLength; i++) {
        if (original[i] !== typed[i]) {
            mistakes++;
        }
    }

    return mistakes;
}