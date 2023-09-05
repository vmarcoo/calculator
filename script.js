const displayUp = document.querySelector("#display-up");
const displayDown = document.querySelector("#display-down");
const numberBtn = document.querySelectorAll("#numberBtn");
const cBtn = document.querySelector("#cBtn");
const ceBtn = document.querySelector("#ceBtn");
const operatorBtn = document.querySelectorAll("#operatorBtn");
const sqrtBtn = document.querySelector("#sqrtBtn");
const equalsBtn = document.querySelector("#equalsBtn");
const dotBtn = document.querySelector("#dotBtn");

let firstNumber = ""
let currentOperator = ""
let secondNumber = ""
let result = ""
let currentMode = "normal"

window.addEventListener("keydown", (e)=>{keyboadPressed(e.key)})

function keyboadPressed(keyPressed){

    if (keyPressed >= 0 && keyPressed <= 9){
        if (currentMode === "sqrt"){
            clearScreen();
            currentMode = "normal"
        }
        
        if (displayDown.textContent === "Error"){
            clearScreen()
            return
        }

        if (displayDown.textContent === "0"){
            displayDown.textContent = ""
            firstNumber = keyPressed
            return displayDown.textContent = keyPressed
        }

        displayDownWrite(keyPressed)
    }

    if (keyPressed === "+" || keyPressed === "-" || keyPressed === "*" || keyPressed === "/"){
        if (keyPressed === "-"){keyPressed = "−"}
        if (keyPressed === "*"){keyPressed = "×"}
        if (keyPressed === "/"){keyPressed = "÷"}

        if (currentMode === "sqrt"){
            currentMode = "normal"
        }

        if (displayDown.textContent === ""){
            displayDown.textContent = "0"
            return
        }

        if (displayDown.textContent === "0"){
            firstNumber = "0"
            currentOperator = keyPressed
            secondNumber = ""
        }

        if (displayDown.textContent === "Error"){
            clearScreen()
            return
        }

        if (displayDown.textContent.includes("+") || 
            displayDown.textContent.includes("−") || 
            displayDown.textContent.includes("×") || 
            displayDown.textContent.includes("÷") ||
            displayDown.textContent.includes("%")){
            
                if (firstNumber !== "" && secondNumber !== "" && currentOperator !== ""){
                    evaluateResult()
                    currentOperator = keyPressed
                    displayDown.textContent = result+currentOperator
                    return
                }

                displayDown.textContent = "Error"
                firstNumber = ""
                secondNumber = ""
                currentOperator = ""
                return
        }

        displayDownWrite(keyPressed)
        currentOperator = keyPressed 
    }

    if (keyPressed === "."){
        
        if (displayDown.textContent === "0" || displayDown.textContent === ""){
            displayDown.textContent = ""
            displayDownWrite("0.")
            return
        }
    
        if (firstNumber.includes(".") && secondNumber === "" ||
            firstNumber !== "" && secondNumber.includes(".")){
            return
        }
    
        if (currentMode === "sqrt"){
            clearScreen()
            currentMode = "normal"
            return
        }
        displayDownWrite(".")
    }

    if (keyPressed === "Enter"){

        if (displayDown.textContent === "Error"){
            clearScreen()
            return
        }

        evaluateResult()
    }

    if (keyPressed === "Backspace"){
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
}

equalsBtn.addEventListener("click", () => {

    if (displayDown.textContent === "Error"){
        equalsBtn.blur()
        clearScreen()
        return
    }

    equalsBtn.blur()
    evaluateResult()
})

numberBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentMode === "sqrt"){
            clearScreen();
            currentMode = "normal"
        }
        
        if (displayDown.textContent === "Error"){
            button.blur()
            clearScreen()
            return
        }

        if (displayDown.textContent === "0"){
            displayDown.textContent = ""
            firstNumber = button.textContent
            button.blur()
            return displayDown.textContent = button.textContent
        }

        button.blur()
        displayDownWrite(button.textContent)
    })
})

operatorBtn.forEach((button) => {
    button.addEventListener("click", () => {
        if (currentMode === "sqrt"){
            currentMode = "normal"
        }

        if (displayDown.textContent === ""){
            displayDown.textContent = "0"
            button.blur()
            return
        }

        if (displayDown.textContent === "0"){
            firstNumber = "0"
            currentOperator = button.textContent
            secondNumber = ""
        }

        if (displayDown.textContent === "Error"){
            button.blur()
            clearScreen()
            return
        }

        if (displayDown.textContent.includes("+") || 
            displayDown.textContent.includes("−") || 
            displayDown.textContent.includes("×") || 
            displayDown.textContent.includes("÷") ||
            displayDown.textContent.includes("%")){
            
                if (firstNumber !== "" && secondNumber !== "" && currentOperator !== ""){
                    evaluateResult()
                    currentOperator = button.textContent
                    displayDown.textContent = result+currentOperator
                    button.blur()
                    return
                }

                displayDown.textContent = "Error"
                firstNumber = ""
                secondNumber = ""
                currentOperator = ""
                button.blur()
                return
        }

        button.blur()
        displayDownWrite(button.textContent)
        currentOperator = button.textContent 
    })
})

dotBtn.addEventListener("click", ()=>{
    if (displayDown.textContent === "0" || displayDown.textContent === ""){
        displayDown.textContent = ""
        displayDownWrite("0.")
        dotBtn.blur()
        return
    }

    if (firstNumber.includes(".") && secondNumber === "" ||
        firstNumber !== "" && secondNumber.includes(".")){
        dotBtn.blur()
        return
    }

    if (currentMode === "sqrt"){
        clearScreen()
        currentMode = "normal"
        dotBtn.blur()
        return
    }

    dotBtn.blur()
    displayDownWrite(".")
})

cBtn.addEventListener("click", ()=>{
    currentMode = "normal"
    cBtn.blur()
    clearScreen()
    firstNumber = ""
    secondNumber = ""
    currentOperator = ""
})

ceBtn.addEventListener("click", ()=>{
    
    if (displayDown.textContent === "Error"){
        ceBtn.blur()
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
    
    if (displayDown.textContent.includes(currentOperator)){
            
            secondNumber = displayDown.textContent.toString().slice(firstNumber.length+1)
        }

    if (!displayDown.textContent.includes(currentOperator)){

            currentOperator = ""
        }

    if (firstNumber.length+currentOperator.length+secondNumber.length === firstNumber.length){
            currentOperator = ""
        }

    ceBtn.blur()
})

sqrtBtn.addEventListener("click", ()=>{

    if (displayDown.textContent === "0" || displayDown.textContent === ""){
        sqrtBtn.blur()
        return
    }

    sqrtBtn.blur()
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

function evaluateResult(){
    if (firstNumber === "" || currentOperator === "" || secondNumber === ""){return}
    
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
   let operation = parseFloat(Math.sqrt(x).toFixed(11));
   if (!operation) {return displayDown.textContent = "Error"}
   displayDown.textContent = operation
   displayUp.textContent = `√${x}`
   firstNumber = String(operation)
   secondNumber = ""
   currentMode = "sqrt"
}