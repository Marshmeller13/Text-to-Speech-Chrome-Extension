var txtInput = document.querySelector('#txtInput');
var voiceList = document.querySelector('#voiceList');
var btnSpeak = document.querySelector('#btnSpeak');
var btnStop = document.querySelector('#btnStop');
//var btnPause = document.querySelector('#btnPause');
var synth = window.speechSynthesis;
var voices = [];

PopulateVoices();
if (speechSynthesis !== undefined) {
    speechSynthesis.onvoiceschanged = PopulateVoices;
}

btnSpeak.addEventListener('click', () => { //input value is read when speak button is pressed
    var toSpeak = new SpeechSynthesisUtterance(txtInput.value);
    var selectedVoiceName = voiceList.selectedOptions[0].getAttribute('data-name');
    voices.forEach((voice) => {
        if (voice.name === selectedVoiceName) {
            toSpeak.voice = voice;
        }
    });
    synth.speak(toSpeak);
});

btnStop.addEventListener('click', () => {
    synth.cancel();
});

// btnPause.addEventListener('click', () => {
//     synth.pause();
// });

function PopulateVoices() {
    voices = synth.getVoices();
    var selectedIndex = voiceList.selectedIndex < 0 ? 0 : voiceList.selectedIndex;
    voiceList.innerHTML = '';
    voices.forEach((voice) => {
        var listItem = document.createElement('option');
        listItem.textContent = voice.name;
        listItem.setAttribute('data-lang', voice.lang);
        listItem.setAttribute('data-name', voice.name);
        voiceList.appendChild(listItem);
    });

    voiceList.selectedIndex = selectedIndex;
}