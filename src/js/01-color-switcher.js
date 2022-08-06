const getRandomHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    
const isChangingColor = () => refs.body.style.backgroundColor = getRandomHexColor();

const refs = {
    start: document.querySelector('[data-start]'),
    stop: document.querySelector('[data-stop]'),
    body: document.querySelector('body'),

}

let intervalId = null;
let isActive = false;
refs.stop.setAttribute("disabled", "true");

const startChangingColor = () => {
    if (isActive) {
        return
    }

    isActive = true;
    refs.start.setAttribute("disabled", "true");
    refs.stop.removeAttribute("disabled");
    refs.start.style.cursor = "not-allowed";
    refs.stop.style.cursor = "pointer";
    intervalId = setInterval(isChangingColor, 1000);
    
}
const stopChangingColor = () => { 
    clearInterval(intervalId);
    isActive = false;
    refs.start.removeAttribute("disabled");
    refs.start.style.cursor = "pointer";
    refs.stop.style.cursor = "not-allowed";
    refs.stop.setAttribute("disabled", "true");
}

refs.start.addEventListener("click", startChangingColor);
refs.stop.addEventListener('click', stopChangingColor);
