document.addEventListener('DOMContentLoaded', drumKit);

let boom;
let clap;
let hihat;
let kick;
let snare;
let tink;
let soundRecorder = [];
let recordButton, stopButton, playButton;
let startTime;
let recording = false;


const sounds = [
    { id: 97, name: 'boom'},
    { id: 115, name: 'clap'},
    { id: 100, name: 'hihat'},
    { id: 102, name: 'kick'},
    { id: 103, name: 'snare'},
    { id: 104, name: 'tink'},
]

function drumKit() {
    document.body.addEventListener('keypress', playSound);
    recordButton = document.querySelector('#startRecording','#startRecording1');
    stopButton = document.querySelector('#stopRecording','#stopRecording1');
    playButton = document.querySelector('#playRecording','#playRecording1');

    recordButton.addEventListener('click', () =>{
        startTime = Date.now();
        recording = true;
        soundRecorder = [];
    })
    stopButton.addEventListener('click', () =>{
        recording = false;
        let blockbtn = document.getElementById("playRecording","playRecording1").disabled = false
    })

    playButton.addEventListener('click', () => {
        soundRecorder.forEach(sound => {
            let blockbtn = document.getElementById("playRecording","playRecording1").disabled = true
            setTimeout(
                () => {
                    let soundElement = document.querySelector(`#${sound.name}`); // odtwarzaj player
                    
                    soundElement.currentTime = 0;
                    
                    soundElement.play();
                }
                , sound.time);
        })
    })
}
function Box(className){
    
    document.querySelector(`.${className}`).classList.add('light');
   
    setTimeout(() =>{
        document.querySelector(`.${className}`).classList.remove('light');
    },500)
}
function playSound(get) {
    
    
    let sound = sounds.find(getl => getl.id == get.keyCode) // wyszukaj dzwiek
    let soundElement = document.querySelector(`#${sound.name}`); 
   
    soundElement.currentTime = 0;
    soundElement.play()// odtworz dzwiek
    
    Box(sound.name)// podświetl klawisz 
    
    
    
    if (recording == true) {
        
        soundRecorder.push({
            name: sound.name,             // zapisz nagranie
            time: Date.now() - startTime
            
        })
        
    }
}


