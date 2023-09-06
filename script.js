// Global variables------------------------------------------------------------------------------------

const displayUp = document.querySelector("#display-up")
const displayDown = document.querySelector("#display-down")
const numberBtn = document.querySelectorAll("#numberBtn")
const cBtn = document.querySelector("#cBtn")
const ceBtn = document.querySelector("#ceBtn")
const operatorBtn = document.querySelectorAll("#operatorBtn")
const sqrtBtn = document.querySelector("#sqrtBtn")
const equalsBtn = document.querySelector("#equalsBtn")
const dotBtn = document.querySelector("#dotBtn")
const mathOperators = ["+", "-", "*", "/", "%", "−", "×", "÷"]
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]

let firstNumber = ""
let currentOperator = ""
let secondNumber = ""
let result = ""

// Event listeners---------------------------------------------------------------------------------------

window.addEventListener("keyup", (e) => {
    keyboadPressed(e.key)
})

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        numberButton(button.textContent)
        button.blur()
    })
})

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        operatorButton(button.textContent)
        button.blur()
    })
})

dotBtn.addEventListener("click", () => {
    dotButton()
    dotBtn.blur()
})

equalsBtn.addEventListener("click", () => {
    evaluateResult()
    equalsBtn.blur()
})

cBtn.addEventListener("click", ()=>{
    clearButton()
    cBtn.blur()
})

ceBtn.addEventListener("click", ()=>{
    clearEntryButton()
    ceBtn.blur()
})

sqrtBtn.addEventListener("click", ()=>{
    squareRootButton()
    sqrtBtn.blur()
})

// Button functions-----------------------------------------------------------------------------------------

function keyboadPressed (keyPressed) {
    
    if (numbers.includes(keyPressed)){
       numberButton(keyPressed)  
    }

    if (mathOperators.includes(keyPressed)){
        operatorButton(keyPressed)
    }

    if (keyPressed === "."){
        dotButton()
    }

    if (keyPressed === "Enter"){
        evaluateResult()
    }

    if (keyPressed === "Escape"){
        clearButton()
    }

    if (keyPressed === "Backspace"){
        clearEntryButton()
    }
}

function numberButton(button){

    if (displayDown.textContent === "Error") return clearScreen()

    if (button === "0" && secondNumber === "0") return

    if (displayDown.textContent.length === 12) return
       
    if (displayUp.textContent !== "" && displayDown.textContent === firstNumber){
        clearScreen()
        firstNumber = ""
    }

    if (displayDown.textContent === "0"){
        displayDown.textContent = ""
        firstNumber = button
        return displayDown.textContent = button
    }

    displayWrite(button)
}

function operatorButton(button){

    if (displayDown.textContent === "Error") return clearScreen()

    if (displayDown.textContent.length === 12) return
    
    if (button === "-") {button = "−"}
    if (button === "*") {button = "×"}
    if (button === "/") {button = "÷"}

    if (displayDown.textContent === ""){
        displayDown.textContent = "0"
        return
    }
    
    if (displayDown.textContent === "0"){
        firstNumber = "0"
        currentOperator = button
        secondNumber = ""
    }

    if (mathOperators.includes(displayDown.textContent.toString().slice(firstNumber.length, firstNumber.length+1))){

        if (firstNumber !== "" && secondNumber !== "" && currentOperator !== ""){
            evaluateResult()
            currentOperator = button
            displayDown.textContent = result+currentOperator
            return
        }

        displayDown.textContent = "Error"
        firstNumber = ""
        currentOperator = ""
        secondNumber = ""  
        return         
    }

    displayWrite(button)
    currentOperator = button
}

function dotButton(){
    
    if (displayDown.textContent === "Error") return clearScreen()

    if (displayDown.textContent.length === 12) return

    if (displayDown.textContent === "0" || displayDown.textContent === ""){
        displayDown.textContent = ""
        displayWrite("0.")
        return
    }

    if (firstNumber.includes(".") && secondNumber === "" ||
        firstNumber !== "" && secondNumber.includes(".")){
        return
    }

    displayWrite(".")
}

function clearButton(){
    clearScreen()
    firstNumber = ""
    secondNumber = ""
    currentOperator = ""
}

function clearEntryButton(){
    
    if (displayDown.textContent === "Error") return clearScreen()

    displayDown.textContent = displayDown.textContent.toString().slice(0, -1);

    if (!mathOperators.includes(displayDown.textContent.toString().slice(firstNumber.length, firstNumber.length+1))){
        firstNumber = displayDown.textContent
    }
    
    if (displayDown.textContent.includes(currentOperator)){
        secondNumber = displayDown.textContent.toString().slice(firstNumber.length+1)
    }

    if (!displayDown.textContent.includes(currentOperator)){
        currentOperator = ""
    }

    if (firstNumber.length+currentOperator.length+secondNumber.length === firstNumber.length){
        currentOperator = ""
    }

}

function squareRootButton(){

    if (displayDown.textContent === "Error") return clearScreen()

    if (displayDown.textContent === "0" || displayDown.textContent === "") return
    
    sqrt(displayDown.textContent)
}

function clearScreen(){
    displayDown.textContent = "0"
    displayUp.textContent = ""
}

// Operation functions---------------------------------------------------------------------------------------

function displayWrite(button){

    displayDown.textContent += button

    if (!mathOperators.includes(displayDown.textContent.toString().slice(firstNumber.length, firstNumber.length+1))){

        firstNumber = displayDown.textContent
    }
    
    if (mathOperators.includes(displayDown.textContent.toString().slice(firstNumber.length, firstNumber.length+1))){

        secondNumber = displayDown.textContent.toString().slice(firstNumber.length+1)
    }
}

function evaluateResult(){
    if (displayDown.textContent === "Error" || displayDown.textContent === "0") return clearScreen()

    if (firstNumber === "" || currentOperator === "" || secondNumber === "")return
    
    if (currentOperator === "+"){
        calculateResult(firstNumber, "+", secondNumber)
    }

    if (currentOperator === "−"){
        calculateResult(firstNumber, "−", secondNumber)
    }

    if (currentOperator === "×"){
        calculateResult(firstNumber, "×", secondNumber)
    }

    if (currentOperator === "÷"){
        calculateResult(firstNumber, "÷", secondNumber)
    }

    if (currentOperator === "%"){
        calculateResult(firstNumber, "%", secondNumber)
    }
}

function calculateResult(num1, op, num2){
        
    if (op === "+"){ 
        displayUp.textContent = displayDown.textContent+"="
        displayDown.textContent = ""
        add(num1, num2)
    }

    if (op === "−"){ 
        displayUp.textContent = displayDown.textContent+"="
        displayDown.textContent = ""
        subtract(num1, num2)
    }

    if (op === "×"){ 
        displayUp.textContent = displayDown.textContent+"="
        displayDown.textContent = ""
        multiply(num1, num2)
    }

    if (op === "÷"){ 
        if (num2 === "0"){return displayDown.textContent = "Error"}
        displayUp.textContent = displayDown.textContent+"="
        displayDown.textContent = ""
        divide(num1, num2)
    }

    if (op === "%"){ 
        displayUp.textContent = displayDown.textContent+"="
        displayDown.textContent = ""
        mod(num1, num2)
    }      
}

function add (x, y){
    result = parseFloat((Number(x)+Number(y)).toFixed(11))
    firstNumber = String(result)
    currentOperator = ""
    secondNumber = ""
    displayDown.textContent = result
    return
}

function subtract (x, y){
    result = parseFloat((Number(x)-Number(y)).toFixed(11))
    firstNumber = String(result)
    currentOperator = ""
    secondNumber = ""
    displayDown.textContent = result
    return
}

function multiply (x, y){
    result = parseFloat((Number(x)*Number(y)).toFixed(11))
    firstNumber = String(result)
    currentOperator = ""
    secondNumber = ""
    displayDown.textContent = result
    return
}

function divide (x, y){
    result = parseFloat((Number(x)/Number(y)).toFixed(11))
    firstNumber = String(result)
    currentOperator = ""
    secondNumber = ""
    displayDown.textContent = result
    return
}

function mod (x, y){
    result = parseFloat((Number(x)%Number(y)).toFixed(11))
    firstNumber = String(result)
    currentOperator = ""
    secondNumber = ""
    displayDown.textContent = result
    return
}

function sqrt (x){
   let operation = parseFloat(Math.sqrt(x).toFixed(6));
   if (!operation) {return displayDown.textContent = "Error"}
   displayDown.textContent = operation
   displayUp.textContent = `√${x}`
   firstNumber = String(operation)
   secondNumber = ""
}