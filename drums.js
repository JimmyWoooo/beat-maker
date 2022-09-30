class Drums {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.playButton = document.querySelector(".play");
    this.selects = document.querySelectorAll("select");
    this.muteButton = document.querySelectorAll(".mute");
    this.tempoSlider = document.querySelector(".tempo-slider");
    this.volume = document.querySelector('.volume-slider');
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
  }

  repeat() {
    let step = this.index % 8;
    const activePads = document.querySelectorAll(`.beat-${step}`);
    activePads.forEach((pad) => {
      pad.style.animation = `playTrack 0.3s alternate ease-in-out 2`;
      if (pad.classList.contains("active")) {
        if (pad.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (pad.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (pad.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }

  start() {
    const interval = (60 / this.bpm) * 1000;
    if (!this.isPlaying) {
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }

  activePad() {
    this.classList.toggle("active");
  }

  updateButton() {
    const playIcon = document.querySelector('.play > i')
    if (!this.isPlaying) {
      this.playButton.classList.add('active')
      playIcon.className = ('fa-solid fa-pause') 
    } else {
      this.playButton.classList.remove('active')
      playIcon.className = ('fa-solid fa-play') 
    }
  }

  changeSound(e) {
    const selectionName = e.target.name;
    const selectionValue = e.target.value;
    switch (selectionName) {
      case "kick-select":
        this.kickAudio.src = selectionValue;
        break;
      case "snare-select":
        this.snareAudio.src = selectionValue;
        break;
      case "hihat-select":
        this.hihatAudio.src = selectionValue;
        break;
    }
  }

  mute(e) {
    const muteIndex = e.target.getAttribute("data-track");
    e.target.classList.toggle("active");
    if (e.target.classList.contains("active")) {
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = 0;
          break;
        case "1":
          this.snareAudio.volume = 0;
          break;
        case "2":
          this.hihatAudio.volume = 0;
          break;
      }
    } else {
      const vol = this.volume.valueAsNumber / 100;
      switch (muteIndex) {
        case "0":
          this.kickAudio.volume = vol;
          break;
        case "1":
          this.snareAudio.volume = vol;
          break;
        case "2":
          this.hihatAudio.volume = vol;
          break;
      }
    }
  }

  changeVolume(){
    const vol = this.volume.valueAsNumber / 100;
    this.kickAudio.volume = vol;
    this.snareAudio.volume = vol;
    this.hihatAudio.volume = vol;
  }

  changeTempo(e){
    const tempoText = document.querySelector('.tempo-num');
    tempoText.innerText = e.target.value;
  }

  updateTempo(e){
    this.bpm = e.target.value;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    if(this.playButton.classList.contains('active')){
        this.start();
    }
  }

  setVol(vol){
    this.volume.value = vol;
    this.changeVolume();
  }
}

const drum = new Drums();

drum.pads.forEach((pad) => {
  pad.addEventListener("click", drum.activePad);
  pad.addEventListener("animationend", function () {
    this.style.animation = "";
  });
});

drum.playButton.addEventListener("click", function () {
  drum.updateButton();
  drum.start();
});

drum.selects.forEach((select) => {
  select.addEventListener("change", function (e) {
    drum.changeSound(e);
  });
});

drum.muteButton.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    drum.mute(e);
  });
});

drum.tempoSlider.addEventListener('input', function(e){
    drum.changeTempo(e);
})

drum.tempoSlider.addEventListener('change', function(e){
    drum.updateTempo(e);
})

drum.volume.addEventListener('input', function(){
  drum.changeVolume();
})