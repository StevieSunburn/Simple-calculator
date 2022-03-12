
//makes this calculator solve more than one problem at once
//show calculation history
//add ()


class Calculator {
  constructor(previousOperandTextElement, currentOperandTextElement) { //makes previous and current operands changeable 
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear() //everytime this class is called clears previous meanings of previous and current operands
  }

  clear() { // clears numbers and operations fully
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = undefined
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1) // turning the number into a string and then chooping the last part off
    // slice function works by saving all of the numbers up to the last one
  }

  appendNumber(number) { // there is a (number) parameter so everytime you can use different value, like for example (.innerText)
    if (number === '.' && this.currentOperand.includes('.')) return // allows only one period to be added to the display section. If there is already a period it just returns (stops the function)
    this.currentOperand = this.currentOperand.toString() + number.toString() //You have to change number to strings if you dont want them to add up
  }

  chooseOperation(operation) {// function for setting an operation
    if (this.currentOperand === '') return //if there is no current openrand the function witll return (stop)
    if (this.previousOperand !== '') { //if the previous operand is not empty, then the function computes existing equation
      this.compute()
    }
    this.operation = operation  //putting operation parameter into work
    this.previousOperand = this.currentOperand //place the current operand into upper part of the calculator (previous operand)
    this.currentOperand = '' //in the meantime clearing the current operand
  }

  compute() { //counting function
    let computation //variable
    const prev = parseFloat(this.previousOperand) //giving a variable for previous operand
    const current = parseFloat(this.currentOperand) //giving a variable for current operand
    if (isNaN(prev) || isNaN(current)) return //if there are no current and previous values this will cancel the function
    switch (this.operation) { //bunch of if statments
      case '+': //if operation is +
        computation = prev + current
        break //not follow other case statments
      case '-': // if -
        computation = prev - current
        break
      case '*': // if *
        computation = prev * current
        break
      case '÷': // if /
        computation = prev / current
        break
      default: // none of the operations are set so the computation is invalid thus retunr is used
        return
    }
    this.currentOperand = computation // show the result of the computation
    this.operation = undefined // after counting makes the operation undefined
    this.previousOperand = '' // deletes whole equation
  } 

  getDisplayNumber(number) { // gives a display number (example instead of 1000 --> it gives 1,000)
    const stringNumber = number.toString() // changin number to string
    const integerDigits = parseFloat(stringNumber.split('.')[0]) 
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay
    if (isNaN(integerDigits)) {
      integerDisplay = ''
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }
    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`
    } else {
      return integerDisplay
    }
  }

  updateDisplay() {
    this.currentOperandTextElement.innerText =
      this.getDisplayNumber(this.currentOperand)
    if (this.operation != null) { //if we have an operation then we  display operand and operation in the previous operand tab
      this.previousOperandTextElement.innerText =
        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      this.previousOperandTextElement.innerText = '' // if operation is undefined then we dont do anything to previous operand
    }
  }
}

// Setting the data to variables
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
// Setting the class to variable
const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {  // This assigns a function for each button
  button.addEventListener('click', () => { // If you click the buttong that is a data-number furhter code happens
    calculator.appendNumber(button.innerText) // From class calculator activates number function with the number that is on the button
    calculator.updateDisplay() // From class calculator activates display function
  })
})

operationButtons.forEach(button => { //assuigns a function to each operation button
  button.addEventListener('click', () => { 
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})
// all of these basically activate functions from the calculator class
equalsButton.addEventListener('click', button => {
  calculator.compute()
  calculator.updateDisplay()
})

allClearButton.addEventListener('click', button => {
  calculator.clear()
  calculator.updateDisplay()
})

deleteButton.addEventListener('click', button => {
  calculator.delete()
  calculator.updateDisplay()
})








