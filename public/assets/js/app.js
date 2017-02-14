console.clear();

const currentText = new SpeechSynthesisUtterance();
let voices = [];
const voicesDropdown = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');
const resetButton = document.querySelector('#reset');
currentText.text = document.querySelector('[name="text"]').value;

function populateVoices() {
  voices = this.getVoices();
  voicesDropdown.innerHTML = voices
  .map(voice => `<option value="${voice.name}">${voice.name} (${voice.lang})</option>`)
  .join('');
}

function setVoice() {
  currentText.voice = voices.find(voice => voice.name === this.value);
  toggle();
}

function toggle(startOver = true) {
  speechSynthesis.cancel();
  if (startOver) {
    speechSynthesis.speak(currentText);
  }
}

function setOption() {
  currentText[this.name] = this.value;
  toggle();
}

function resetApp() {
  options.forEach((option) => {

    if (option.type === 'range') {
      option.value = 1;
    } else {
      option.textContent = 'Thank you for visiting me 👍';
    }

    const event = new Event('change');
    option.dispatchEvent(event);
  });
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesDropdown.addEventListener('change', setVoice);
options.forEach(option => option.addEventListener('change', setOption));
speakButton.addEventListener('click', toggle);
stopButton.addEventListener('click', toggle);
resetButton.addEventListener('click', resetApp);
