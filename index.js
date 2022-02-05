const clearButton = document.querySelector('#clear')
const showButton = document.querySelector('#show')
const cardsContainer = document.querySelector('#cards-container')
const prevButton = document.querySelector('#prev')
const nextButton = document.querySelector('#next')
const currentIndexEl = document.querySelector('#current')
const addContainer = document.querySelector('#add-container')
const hideButton = document.querySelector('#hide')
const questionEl = document.querySelector('#question')
const answersEl = document.querySelector('#answer')
const addCardButton = document.querySelector('#add-card')

let currentCardIndex = 0
let cardsEl = []
let cardsData = getCardsData()

function getCardsData() {
  if(JSON.parse(localStorage.getItem('cards')) === null) {
    return []
  } else {
    return JSON.parse(localStorage.getItem('cards'))
  }
}

function createCards() {
  cardsData.forEach((data, index) => createCard(data,index))
}

function createCard(data, index) {
  const card = document.createElement('div')
  card.classList.add('card')
  if(index === 0) {
    card.classList.add('active')
  }
  card.innerHTML = `
    <div class="inner-card">
      <div class="inner-card-front">
        <p>
          ${data.question}
        </p>
      </div>
      <div class="inner-card-back">
        <p>
          ${data.answer}
        </p>
      </div>
    </div>
  `
  card.addEventListener('click', () => card.classList.toggle('show-answer'))
  cardsEl.push(card)
  cardsContainer.appendChild(card)
  updateIndexText()
}

function updateIndexText() {
  currentIndexEl.innerText = `${currentCardIndex + 1} / ${cardsEl.length}`
}

function setStorage(cardsData) {
  localStorage.setItem('cards', JSON.stringify(cardsData))
  window.location.reload()
}

createCards()

nextButton.addEventListener('click', () => {
  cardsEl[currentCardIndex].className = 'card left'
  currentCardIndex++
  if(currentCardIndex > cardsEl.length - 1) {
    currentCardIndex = cardsEl.length - 1
  }
  cardsEl[currentCardIndex].classList = 'card active'
  updateIndexText()
})

prevButton.addEventListener('click', () => {
  cardsEl[currentCardIndex].className = 'card right'
  currentCardIndex--
  if(currentCardIndex < 0) {
    currentCardIndex = 0
  }
  cardsEl[currentCardIndex].className = 'card active'
  updateIndexText()
})

showButton.addEventListener('click', () => addContainer.classList.add('show'))

hideButton.addEventListener('click', () => addContainer.classList.remove('show'))

addCardButton.addEventListener('click', () => {
  const question = questionEl.value
  const answer = answersEl.value

  if(question.trim() && answer.trim()) {
    const newCard = {question, answer}
    
    createCard(newCard)
    
    questionEl.value = ''
    answersEl.value = ''
    
    addContainer.classList.remove('show')
    cardsData.push(newCard)

    setStorage(cardsData)
  }
})

clearButton.addEventListener('click', () => {
  localStorage.clear()
  cardsContainer.innerHTML = ''
  window.location.reload()
})