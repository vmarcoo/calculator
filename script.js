// FAZER NUMERO NEGATIVO FUNCIONAR E A FUNÇÃO IGUAL

const displayUp = document.querySelector("#display-up");
const displayDown = document.querySelector("#display-down");
const numberBtn = document.querySelectorAll("#numberBtn");
const cBtn = document.querySelector("#cBtn");
const ceBtn = document.querySelector("#ceBtn");
const operatorBtn = document.querySelectorAll("#operatorBtn");
const sqrtBtn = document.querySelector("#sqrtBtn");
const equalBtn = document.querySelector("#equalBtn");
const dotBtn = document.querySelector("#dotBtn");

let firstNumber = ""
let currentOperator = ""
let secondNumber = ""
let currentMode = "normal"

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentMode === "sqrt"){
            clearScreen();
            currentMode = "normal"
        }
        
        if (displayDown.textContent === "Error"){
            clearScreen()
            return
        }

        displayDownWrite(button.textContent)
    })
})

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentMode === "sqrt"){
            currentMode = "normal"
        }

        if (displayDown.textContent === "Error"){
            clearScreen()
            return
        }

        if (displayDown.textContent === "0" || displayDown.textContent === ""){
            return
        }

        if (displayDown.textContent.includes("+") || 
            displayDown.textContent.includes("−") || 
            displayDown.textContent.includes("×") || 
            displayDown.textContent.includes("÷") ||
            displayDown.textContent.includes("%")){
            
                if (firstNumber !== "" && secondNumber !== "" && currentOperator !== ""){
                    calculateResult()
                }

                displayDown.textContent = "Error"
                firstNumber = ""
                secondNumber = ""
                currentOperator = ""
                return
        }

        displayDownWrite(button.textContent)
        currentOperator = button.textContent 
    })
})

dotBtn.addEventListener("click", ()=>{
    if (displayDown.textContent === "0"){
        displayDownWrite("0.")
        return
    }

    if (displayDown.textContent.includes(".")){
        return
    }

    if (currentMode === "sqrt"){
        clearScreen()
        currentMode = "normal"
        return
    }
    displayDownWrite(".")
})

cBtn.addEventListener("click", ()=>{
    currentMode = "normal"
    clearScreen()
    firstNumber = ""
    secondNumber = ""
})

ceBtn.addEventListener("click", ()=>{
    
    if (displayDown.textContent === "Error"){
        clearScreen()
        return
    }

    displayDown.textContent = displayDown.textContent.toString().slice(0, -1);

    if (!displayDown.textContent.includes("+") && 
        !displayDown.textContent.includes("−") && 
        !displayDown.textContent.includes("×") && 
        !displayDown.textContent.includes("÷") &&
        !displayDown.textContent.includes("%")){

            firstNumber = displayDown.textContent
        }
    
    if (displayDown.textContent.includes("+") || 
        displayDown.textContent.includes("−") || 
        displayDown.textContent.includes("×") || 
        displayDown.textContent.includes("÷") ||
        displayDown.textContent.includes("%")){
            
            secondNumber = displayDown.textContent.toString().slice(firstNumber.length+1)
        }
})

sqrtBtn.addEventListener("click", ()=>{

    if (displayDown.textContent === "0" || displayDown.textContent === ""){
        return
    }

    if (firstNumber !== "" && secondNumber !== "" && currentOperator !== ""){
        calculateResult()
    }

    sqrt(displayDown.textContent)
})

function clearScreen(){
    displayDown.textContent = "0"
    displayUp.textContent = ""
}

function resetScreen(){
    displayDown.textContent = ""
    displayUp.textContent = ""
}

function displayDownWrite(button){
    if (displayDown.textContent === "0") {resetScreen()}
    displayDown.textContent += button

    if (!displayDown.textContent.includes("+") && 
        !displayDown.textContent.includes("−") && 
        !displayDown.textContent.includes("×") && 
        !displayDown.textContent.includes("÷") &&
        !displayDown.textContent.includes("%")){

            firstNumber = displayDown.textContent
        }
    
    if (displayDown.textContent.includes("+") || 
        displayDown.textContent.includes("−") || 
        displayDown.textContent.includes("×") || 
        displayDown.textContent.includes("÷") ||
        displayDown.textContent.includes("%")){
            
            secondNumber = displayDown.textContent.toString().slice(firstNumber.length+1)
        }
}

function add (x, y){
    return x+y
}

function subtract (x, y){
    return x-y
}

function multiply (x, y){
    return x*y
}

function divide (x, y){
    return x/y
}

function mod (x, y){
    return x%y
}

function sqrt (x){
   let operation = parseFloat(Math.sqrt(x).toFixed(8));
   if (!operation) {return displayDown.textContent = "Error"}
   displayDown.textContent = operation
   firstNumber = String(operation)
   secondNumber = ""
   currentMode = "sqrt"
}