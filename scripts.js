// code for typing game
// Created by: Johanna Liu
// Date: Jan 2024

function addClass(element, name) {
    if (!element.classList.contains(name)) {
        element.classList.add(name);
    }
}

function removeClass(element, name) {
    if (element.classList.contains(name)) {
        element.classList.remove(name);
    }
}

// Fetch a random word from the API
function generateWords() {
    return fetch('https://random-word-api.herokuapp.com/word')
        .then(response => response.json())
        .then(data => data[0]);
}

// Create an array of words
async function renderWords() {
    const wordArray = [];
    const wordCount = 25;

    // Generate words and store them in an array
    for (let i = 0; i < wordCount; i++) {
        const word = await generateWords();
        wordArray.push(word);
    }

    // Render the words as spans
    const wordsContainer = document.getElementById('words');
    wordsContainer.innerHTML = ''; // Clear the container
    wordArray.join(' ').split('').forEach((char, index) => {
        const span = document.createElement('span');
        span.className = 'letter';
        span.textContent = char;
        if (index === 0) addClass(span, 'current');
        wordsContainer.appendChild(span);
    });

    // Start tracking typing input
    trackTyping();
}

// Typing logic
function trackTyping() {
    const wordsContainer = document.getElementById('words');
    const letters = wordsContainer.querySelectorAll('.letter');
    let currentIndex = 0;

    document.addEventListener('keydown', (event) => {
        const key = event.key;
        const currentLetter = letters[currentIndex];
        const expected = currentLetter.innerHTML;
        const isLetter = key.length === 1 && key !== ' ';
        const isSpace = key === ' '

        console.log({key, expected})

        if (isLetter) {
            if (currentLetter) {
                addClass(currentLetter, key === expected ? 'correct' : 'wrong')
                currentIndex ++
            }
        }

        if (isSpace) {
            if (expected !== ' ') {
                addClass(currentLetter, 'wrong')
                currentIndex++
            } else {
                addClass(currentLetter, 'correct')
                currentIndex++
            }

        }
    });
}

// Initialize the game
renderWords();

