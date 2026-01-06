const UPPERCASEVALUES = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWERCASEVALUES = "abcdefghijklmnopqrstuvwxyz";
const NUMBERS = "0123456789";
const SYMBOLS = "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~)"

const btn = document.getElementById('generate-btn');
const checkboxes = Array.from(document.querySelectorAll('.password-option > input[type="checkbox"]'));
const passwordResult = document.getElementById("password");
const strengthWrapper = document.getElementsByClassName('strength-wrapper')[0];
const strengthLabel = document.getElementById('strength_label');

const copyBtn = document.getElementById('copy-btn');
const passwordCopied = document.getElementById('password-copied');

const initSlider = () => {
    slider.setAttribute('value', 10);
    updateSliderFill();
}

const noSelectedCheckboxes = () =>
{
    let filteredCheckboxes = checkboxes.filter(checkbox => checkbox.checked);
    return filteredCheckboxes && filteredCheckboxes.length == 0;
};

const getGammaCaratteri = (filteredCheckboxes) => {
    let charset = "";
    filteredCheckboxes.forEach((checkbox) => {
        let option = checkbox.getAttribute('data-option');
        switch (option) {
            case 'uppercase':
                charset += UPPERCASEVALUES;
                break;
            
            case 'lowercase':
                charset += LOWERCASEVALUES;
                break;
                    
            case 'number':
                charset += NUMBERS;
                break;

            case 'symbol':
                charset += SYMBOLS;
                break;
                
                
        }
    });
    
   return charset;
    
}

const getRandIndex = (n) => {
    return Math.floor(Math.random() * n);
}

const renderStrenght = (pwdStrenght) => {
    let strength = Math.round(pwdStrenght);
    strengthWrapper.classList = 'strength-wrapper';
    
    let classValue = 'too-weak';
    
    
    if(strength >= 40 && strength <= 59){
        classValue = 'weak';
    }
    
    if(strength >= 60 && strength <=79){
        classValue = 'medium';
    }
    
    if(strength >= 80)
    {
        classValue = 'strong';
    }

    strengthWrapper.classList.add(classValue);
    
    if(classValue == "too-weak") classValue += '!';
    strengthLabel.textContent = classValue.replace("-", " ").toUpperCase();

}


const generate = () => {
    let filteredCheckboxes = checkboxes.filter(checkbox => checkbox.checked);
    let gammaCaratteri = getGammaCaratteri(filteredCheckboxes);
    let pwdlength = slider.value;
    let password = "";
    
    //GENERATE PASSWORD
    for (let i = 0; i < pwdlength; i++) 
    {
        password += gammaCaratteri[getRandIndex(gammaCaratteri.length)];
    }
    
    //WRITE IN DOM
    
    if(password == "")
    {
        password = "P4$5W0rD!";
        passwordResult.classList.remove('password-generated')
    }else{
        passwordResult.classList.add('password-generated');
    }
    passwordResult.textContent = password;
    
    //CALCULATE strength
    const pwdStrenght = pwdlength * Math.log2(gammaCaratteri.length)
    renderStrenght(pwdStrenght);
}

const generatePassword = (ev) => {
    
    console.log(slider.value);
    if (!slider.value || parseInt(slider.value) == 0) 
    {
        initSlider();
    }
    
    if(noSelectedCheckboxes()){
        for (let i = 0; i < checkboxes.length-1; i++){
            checkboxes[i].checked  = true;
        }
    }
    
    generate();
};

const copyToClipboard = () => {
    
    if(passwordResult && passwordResult.textContent != "P4$5W0rD!")
    {
        navigator.clipboard.writeText(passwordResult.textContent);
        passwordCopied.textContent = "COPIED";

        setTimeout(() => {
            passwordCopied.textContent = "";
        }, 2000);
    }
}

btn.addEventListener('click', generatePassword);

copyBtn.addEventListener('click', copyToClipboard);