const slider = document.getElementById('car_length_range_input');
const carLengthDisplay = document.getElementsByClassName('car_length_display');

function updateSliderFill() {
    const percent =
        ((slider.value - slider.min) / (slider.max - slider.min)) * 100;

    slider.style.backgroundSize = `${percent}% 100%`;
    
    carLengthDisplay[0].textContent = slider.value;
}

slider.addEventListener('input', updateSliderFill);
updateSliderFill();