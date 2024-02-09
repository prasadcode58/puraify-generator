const lengthSlider = document.getElementById("lengthSlider");
const lengthNumber = document.getElementById("lengthNumber");

let passwordText = document.getElementById("passwordText");
let copyMsg = document.getElementById("copyMsg");
let copyBtn = document.getElementById("copyBtn");
let uppercaseSelect = document.getElementById("uppercaseSelect");
let lowercaseSelect = document.getElementById("lowercaseSelect");
let numberSelect = document.getElementById("numberSelect");
let symbolsSelect = document.getElementById("symbolsSelect");
let indicatorColor = document.getElementById("strengthIndicator");
let generateBtn = document.getElementById("generateBtn");
let allCheckboxes = document.querySelectorAll("input[type=checkbox]");

let symbols = '~`!@#$%^&*()_-+={[}]|:;"<,>.?/';

let password = "";

let passwordLength = 10;

let checkCount = 0;

handleSlider();

function handleSlider(){

    lengthSlider.value = passwordLength;
    lengthNumber.innerText = passwordLength;
    const min = lengthSlider.min;
    const max = lengthSlider.max;
    lengthSlider.style.backgroundSize = ((passwordLength - min)*100/(max - min)) + "% 100%";

}

function setIndicator(colori){

    indicatorColor.classList.remove('bg-[#A67C87]', 'bg-lime-700', 'bg-yellow-600', 'bg-rose-900');
    indicatorColor.classList.add(colori);

}

function getRandInteger(max, min){

    return Math.floor(Math.random() * (max - min)) + min;

}

function generateRandomInteger(){
    
    return getRandInteger(0, 9);

}

function generateLowerCase(){

    return String.fromCharCode(getRandInteger(97, 123));

}

function generateUpperCase(){

    return String.fromCharCode(getRandInteger(65, 91));

}

function generateSymbols(){

    let randomNum = getRandInteger(0, symbols.length);

    return symbols.charAt(randomNum);

}

async function copyContent(){

    try{
        await navigator.clipboard.writeText(passwordText.value);
        copyMsg.innerText = "Copied!";
    }
    catch(e){
        copyMsg.innerText = "Failed!";
    }

    copyMsg.classList.add("active");

    setTimeout ( () => {
        copyMsg.classList.remove("active");
    },2000);

}

function shufflePassword(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      let str = "";
      array.forEach((el) => (str += el));
      return str;
}

function handleCheckBoxChange(){
    checkCount = 0;
    allCheckboxes.forEach((checkbox) => {
        if(checkbox.checked){
            checkCount++;
        }
    });

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
}

allCheckboxes.forEach( (checkbox) => {
    checkbox.addEventListener('change', handleCheckBoxChange);
})

lengthSlider.addEventListener('input', (e) => {
    passwordLength = e.target.value;
    handleSlider();
})

copyBtn.addEventListener('click', () => {
    if(passwordText.value){
        copyContent();
    }
})

generateBtn.addEventListener('click', () => {
    if(checkCount <= 0) 
        return;

    if(passwordLength < checkCount){
        passwordLength = checkCount;
        handleSlider();
    }

    password = "";

    let funArr = [];

    if(uppercaseSelect.checked){
        funArr.push(generateUpperCase);
    }

    if(lowercaseSelect.checked){
        funArr.push(generateLowerCase);
    }

    if(numberSelect.checked){
        funArr.push(generateRandomInteger);
    }

    if(symbolsSelect.checked){
        funArr.push(generateSymbols);
    }

    for(let i = 0; i <funArr.length; i++){
        password += funArr[i]();
    }

    for(let i = 0; i<passwordLength-funArr.length; i++){
        let randomIndex = getRandInteger(0, funArr.length);
        password += funArr[randomIndex]();
    }

    password = shufflePassword(Array.from(password));

    passwordText.value = password;

    calcStrength();
    
});

function calcStrength() {
    let hasUpper = false;
    let hasLower = false;
    let hasNum = false;
    let hasSym = false;
    if (uppercaseSelect.checked) hasUpper = true;
    if (lowercaseSelect.checked) hasLower = true;
    if (numberSelect.checked) hasNum = true;
    if (symbolsSelect.checked) hasSym = true;
  
    if (hasUpper && hasLower && (hasNum || hasSym) && passwordLength >= 8) {
        let colori = 'bg-lime-700';
        setIndicator(colori);

    } else if ((hasLower || hasUpper) && (hasNum || hasSym) && passwordLength >= 6) {
        let colori = 'bg-yellow-600';
        setIndicator(colori);
        
    } else{
        let colori = 'bg-rose-900';
        setIndicator(colori);
    }
  }
  

