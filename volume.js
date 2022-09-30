const volumeButton = document.querySelector('.volume-button');
const volume = document.querySelector('.volume');
const volumeSlider = document.querySelector('.volume-slider');
const selectValue = document.querySelector('.selectValue');
const icon = document.querySelector('.fa-solid');

volumeButton.addEventListener('click', function(){
    volumeSlider.classList.toggle('active');
    volumeButton.classList.toggle('active');
    selectValue.classList.toggle('active');
})

volumeSlider.addEventListener('input', setValue);
document.addEventListener("DOMContentLoaded", setValue);
document.addEventListener('click', function(e){
    const clickInside = volume.contains(e.target)
    if(!clickInside){
        volumeSlider.classList.remove('active');
        volumeButton.classList.remove('active');
        selectValue.classList.remove('active');
    }
})

function setValue(){
    const newValue = Number((volumeSlider.value - volumeSlider.min) * 100 / (volumeSlider.max - volumeSlider.min));
    const newPosition = 5 -(newValue * .95);
    selectValue.innerHTML = `<span class="volume-value">${volumeSlider.value}%</span>`;
    selectValue.style.bottom = `calc(${newValue}% + (${newPosition}px))`;
}

volume.addEventListener('wheel', function(e){
    if(e.deltaY < 0){
        volumeSlider.valueAsNumber += 10;
        drum.setVol(volumeSlider.valueAsNumber);
        setValue();
    }else{
        volumeSlider.value -= 10;
        drum.setVol(volumeSlider.valueAsNumber);
        setValue();
    }
    if(volumeSlider.valueAsNumber >= 70){
        icon.className = 'fa-solid fa-volume-high';
    }
    else if(volumeSlider.valueAsNumber >= 10 && volumeSlider.valueAsNumber < 70){
        icon.className = 'fa-solid fa-volume-low';
    }
    else if(volumeSlider.valueAsNumber === 0){
        icon.className = 'fa-solid fa-volume-off';
    }
})