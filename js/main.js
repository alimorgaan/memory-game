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



let cards = document.querySelectorAll('.card'); 
let gameState = 0; 
let selectedCards = []; 


disableClickAll(); 
setTimeout(enableClickAll, 2000); 
setTimeout(flipAll, 500); 
setTimeout(flipBack, 2000); 



cards.forEach(card => {
    card.addEventListener('click', function (e) {
        if (gameState === 0) {
            e.currentTarget.classList.add('flipped'); 
            selectedCards.push(e.currentTarget); 
            gameState = 1; 
        } else if (gameState === 1) {

            disableClickAll();
            setTimeout(flipBack, 1000); 
            setTimeout(enableClickAll, 1000); 

            e.currentTarget.classList.add('flipped'); 
            selectedCards.push(e.currentTarget); 
            if (checkSimilar()) {
                checkCards(selectedCards);
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