class Calc {
    constructor(prevOperTextElement, currOperTextElement)   {
        this.prevOperTextElement = prevOperTextElement
        this.currOperTextElement = currOperTextElement
        this.clear()
    }

    clear() {
        this.currOper = ''
        this.prevOper = ''
        this.operation = undefined
    }
   
    delete() {
        this.currOper = this.currOper.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currOper.includes('.')) return
        this.currOper = this.currOper.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currOper === '') return
        if (this.prevOper !== '') {
            this.compute()
        }
        this.operation = operation
        this.prevOper = this.currOper
        this.currOper = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.prevOper)
        const curr = parseFloat(this.currOper)
        if (isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                computation = prev + curr
                break
            case '-':
                computation = prev - curr
                break
            case '*':
                computation = prev * curr
                break
            case '/':
                computation = prev / curr
                break
            default:
                return
        }
        this.currOper = computation
        this.operation = undefined
        this.prevOper = ''
    }
    
    getDisplayNumber(number) {
        const stringNumber = number.toString()
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
        this.currentOperandTextElement.innerHTML =
          this.getDisplayNumber(this.currentOperand)
        if (this.operation != null) {
          this.previousOperandTextElement.innerHTML =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
          this.previousOperandTextElement.innerHTML = ''}
    }
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevOperTextElement = document.querySelector('[data-prev-oper]')
const currOperTextElement = document.querySelector('[data-curr-oper]')

const calc = new Calc(prevOperTextElement, currOperTextElement)

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.appendNumber(button.innerHTML)
        calc.updateDisplay()
    })
})

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calc.chooseOperation(button.innerHTML)
        calc.updateDisplay()
    })
})

equalsButton.addEventListener('click', button => {
    calc.compute()
    calc.updateDisplay()
})

allClearButton.addEventListener('click', button => {
    calc.clear()
    calc.updateDisplay()
})

deleteButton.addEventListener('click', button => {
    calc.delete()
    calc.updateDisplay()
})