// Massivni tanlash
const words = [
    { english: "hello", uzbek: "salom" },
    { english: "goodbye", uzbek: "xayr" },
    { english: "apple", uzbek: "olma" },
    { english: "car", uzbek: "avtomobil" },
    { english: "event", uzbek: "hodisa" },
    { english: "position", uzbek: "holati" },
    { english: "product", uzbek: "mahsulot" },
    { english: "book", uzbek: "kitob" },
    { english: "create", uzbek: "yaratish" },
    { english: "compyuter", uzbek: "komputer" },
    { english: "post", uzbek: "post" },
];

// Takrorlanmagan so'zlar ro'yxati
const wordsLength = words.length
const uniqueIndexes = [];

// Random indekslarni tanlash
while (uniqueIndexes.length < wordsLength) {
    const randomIndex = Math.floor(Math.random() * wordsLength);
    if (!uniqueIndexes.includes(randomIndex)) {
        uniqueIndexes.push(randomIndex);
    }
}

// Savollarni tayyorlash
const questions = uniqueIndexes.map(index => {
    const questionWord = words[index];
    const options = [];

    // To'g'ri javobni variantlar ichiga joylash
    options.push(questionWord.uzbek);

    // Boshqa variantlarni tanlash
    while (options.length < 4) {
        const randomIndex = Math.floor(Math.random() * wordsLength);
        const randomWord = words[randomIndex];
        if (!options.includes(randomWord.uzbek)) {
            options.push(randomWord.uzbek);
        }
    }

    // Variantlarni aralashtirish
    options.sort(() => Math.random() - 0.5);

    // Savolni qaytarish
    return {
        question: questionWord.english,
        options: options
    };
});

// Kodni test qilish uchun:
console.log(questions);
