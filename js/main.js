//////////////// render cards //////////////////////////

let randomPositions = []; 
for (let i = 0; i < 10; i++) {
    randomPositions.push(i); 
    randomPositions.push(i); 
}

 for (let i = 0; i < 30; i++) {
     swap(randomPositions, Math.floor(Math.random() * 20), Math.floor(Math.random() * 20)); 
}
 
randomPositions.forEach(index => {
    renderCard(index); 
});
///////////////////////////////////////////////////////


let rightMatches = 0; 
let gameState = 0; 
let selectedCards = []; 
let wrongTries = 0; 
let playerName; 
let cards = document.querySelectorAll('.card'); 
let playerNameSpan = document.getElementById('playerName'); 
let wrongTriesSpan = document.getElementById('wrong'); 
let overlay = document.getElementById('overlay'); 
let startButton = document.getElementById('startButton');
let wonDiv = document.getElementById('won'); 
let loseDiv = document.getElementById('lose'); 

let checkAudio = new Audio('./audio/check.mp3');

let refreshButtons = document.querySelectorAll('.refresh'); 



wrongTriesSpan.innerText = wrongTries; 


refreshButtons.forEach(button => {
    button.addEventListener('click', function () {
        location.reload(); 
    })
});



startButton.addEventListener('click', function () {
    playerName = prompt("enter player name : ");
    overlay.style.display = 'none'; 
    playerNameSpan.innerText = playerName; 
    disableClickAll(); 
    setTimeout(enableClickAll, 2000); 
    setTimeout(flipAll, 200); 
    setTimeout(flipBack, 2000); 

})





cards.forEach(card => {
    card.addEventListener('click', function (e) {
        if (gameState === 0) {
            e.currentTarget.classList.add('flipped'); 
            e.currentTarget.classList.add('disabled'); 
            selectedCards.push(e.currentTarget); 
            gameState = 1; 
        } else if (gameState === 1) {
            disableClickAll();
            setTimeout(flipBack, 800); 
            setTimeout(enableClickAll, 900); 
            e.currentTarget.classList.add('flipped'); 
            e.currentTarget.classList.add('disabled'); 
            selectedCards.push(e.currentTarget); 
            if (checkSimilar()) {
                checkCards(selectedCards);
                checkAudio.play(); 
                rightMatches++; 
                if (rightMatches === 10 && wrongTries < 10) {
                    overlay.style.display = 'flex'; 
                    startButton.style.display = 'none'; 
                    wonDiv.style.display = 'flex'; 
                } else if (rightMatches === 10 && wrongTries >= 10) {
                    overlay.style.display = 'flex'; 
                    startButton.style.display = 'none'; 
                    loseDiv.style.display = 'flex'; 
                }
            } else {
                wrongTriesSpan.innerText = ++wrongTries; 
                if (wrongTries >= 10) {
                    wrongTriesSpan.style.color = 'red'; 
                }
            }
            selectedCards.pop(); 
            selectedCards.pop(); 
            gameState = 0; 
        }
    })
});

function checkSimilar() {
    console.log(selectedCards[0].getAttribute('image-type')); 
    console.log(selectedCards[1].getAttribute('image-type')); 

    
    if (selectedCards[0].getAttribute('image-type') === selectedCards[1].getAttribute('image-type')) {
        return true; 
    } else {
        return false; 
    }
}

function flipBack() {
    cards.forEach(card => {
        if (card.classList.contains('un-checked')) {
            card.classList.remove('flipped');
        }
    });
}

function checkCards(selectedCards) {
    selectedCards.forEach((card) => {
        card.classList.remove('un-checked'); 
        card.classList.add('checked')
    })
}

function disableClickAll() {
    cards.forEach(card => {
        card.classList.add('disabled'); 
    });
}

function enableClickAll() {
    cards.forEach(card => {
        card.classList.remove('disabled'); 
    });
}

function swap(array , firstIndex , secondIndex) {
    let temp = array[firstIndex]; 
    array[firstIndex] = array[secondIndex]; 
    array[secondIndex] = temp; 
}

function flipAll() {
    cards.forEach(card => {
        card.classList.add('flipped'); 
    });
}

function renderCard(imageIndex) {
    let images = ['angularjs', 'bootstrap', 'cplusplus', 'csharp', 'css3', 'github', 'html5', 'java', 'typescript', 'visualstudio'];
    let card = `
    <div class="card un-checked" image-type='${images[imageIndex]}'>
        <div class="face front">
            <i class="fa fa-question-circle" aria-hidden="true"></i>
        </div>
        <div class="face back">
            <div class="image">
                <img src="imgs/${images[imageIndex]}.png" alt="">
            </div>
        </div>
    </div>
    ` ; 

    let cardsContainer = document.getElementById('cardsContainer');  
    cardsContainer.innerHTML += card; 
}