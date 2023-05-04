const time = document.querySelector('.time')
const data = document.querySelector('.date')
const goodDay = document.querySelector('.greeting')
const name = document.querySelector('.name')
const body = document.querySelector('body')
const sliderNext = document.querySelector('.slide-next')
const sliderPrev = document.querySelector('.slide-prev')
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const errorWeather = document.querySelector('.weather-error')
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity')
const city = document.querySelector('.city')
const quote = document.querySelector('.quote')
const author = document.querySelector('.author')
const changeQuote = document.querySelector('.change-quote')



const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"];

// показ даты
function showDate() {
  const date = new Date();
  const currentDate = days[date.getDay()] + ', ' + months[date.getMonth()] + ' ' + date.getDate()
  data.textContent = currentDate
}
// показ времени
function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime
  showDate()
  showGreeting()
  setTimeout(showTime, 1000);
}
showTime()


// приветствие
function showGreeting() {
  const date = new Date();
  const hours = date.getHours();
  if (hours >= 0 && hours < 6) {
    goodDay.textContent = 'Good night,'
  } else if (hours >= 6 && hours < 12) {
    goodDay.textContent = 'Good morning,'
  } else if (hours >= 12 && hours < 18) {
    goodDay.textContent = 'Good afternoon,'
  } else {
    goodDay.textContent = 'Good evening,'
  }
}

showGreeting()

// local storage
function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)

// random изображения фона
let randomNumber = Math.floor(Math.random() * (20 - 1 + 1)) + 1

function setBg() {
  const date = new Date();
  const hours = date.getHours();
  let result = ''
  if (hours >= 0 && hours < 6) {
    result = 'night'
  } else if (hours >= 6 && hours < 12) {
    result = 'morning'
  } else if (hours >= 12 && hours < 18) {
    result = 'afternoon'
  } else {
    result = 'evening'
  }
  const img = new Image()
  let bgNum = randomNumber.toString().padStart(2, "0")
  img.src = `https://raw.githubusercontent.com/pollipolinch/stage1-tasks/assets/images/${result}/${bgNum}.jpg`
  img.onload = () => {
    body.style.backgroundImage = `url('https://raw.githubusercontent.com/pollipolinch/stage1-tasks/assets/images/${result}/${bgNum}.jpg')`
  }
}
setBg()

// слайдер

function getSlideNext() {
  if (randomNumber == 20) {
    randomNumber = 1
  } else {
    randomNumber = randomNumber + 1
  }
  setBg()
}
function getSlidePrev() {
  if (randomNumber == 1) {
    randomNumber = 20
  } else {
    randomNumber = randomNumber - 1
  }
  setBg()
}
sliderNext.addEventListener('click', getSlideNext)
sliderPrev.addEventListener('click', getSlidePrev)

// погода
function setStorage() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setStorage)

function getStorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
}
window.addEventListener('load', getStorage)
async function getWeather() {
  try{
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=d90631d05cab6d1d7616676252e5c495&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    weatherIcon.className = 'weather-icon owf'
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`
    errorWeather.textContent =""
  } catch(err){
    temperature.textContent = "";
    weatherDescription.textContent = ""
    wind.textContent = ""
    humidity.textContent = ""
    errorWeather.textContent = "Error! city not found!"
  }

}
getWeather()

city.addEventListener('change', getWeather)

function setstorage() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setstorage)

function getstorage() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  }
  getWeather()
}
window.addEventListener('load', getstorage)


// цитаты
function getQuotes() {
  let randomNum = Math.floor(Math.random() * (8 - 0 + 1)) + 0
  quote.textContent = e[randomNum].text
  author.textContent = e[randomNum].author
}
getQuotes();
changeQuote.addEventListener('click', getQuotes)

// аудио
const playPause = document.querySelector('.play')
const playPrevs = document.querySelector('.play-prev')
const playNexts = document.querySelector('.play-next')
const playListContainer = document.querySelector('.play-list')

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li')
  li.classList.add('play-item')
  li.textContent = playList[i].title
  playListContainer.append(li)
}
const playItem = document.querySelectorAll('.play-item')

let isPlay = false;
const audio = new Audio();
let playNum = 0
function playAudio() {
  if (!isPlay) {
    isPlay = true
    playPause.classList.add('pause')
    audio.src = playList[playNum].src
    audio.play()
    playItem[playNum].classList.add('item-active')
  } else {
    isPlay = false
    playPause.classList.remove('pause')
    audio.pause()
  }
}
function playNext() {
 playItem.forEach((ell)=>ell.classList.remove('item-active'))
  if (playNum == 3) {
    playNum = 0
  } else {
    playNum = playNum + 1
  }
  audio.src = playList[playNum].src
  playItem[playNum].classList.add('item-active')
  if(isPlay){
    audio.play()
    playPause.classList.add('pause')
  }
}
function playPrev() {
  playItem.forEach((ell)=>ell.classList.remove('item-active'))
  if (playNum == 0) {
    playNum = 3
  } else {
    playNum = playNum - 1
  }
  audio.src = playList[playNum].src
  playItem[playNum].classList.add('item-active')
  if(isPlay){
    audio.play()
    playPause.classList.add('pause')
  }
}
playPause.addEventListener('click', playAudio)
playPrevs.addEventListener('click', playPrev)
playNexts.addEventListener('click', playNext)
audio.addEventListener('ended',playNext )
import playList from './playList.js';
