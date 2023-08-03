// exercise 1: Create a calculator that takes two numbers and an operator (+, -, *, /) and returns the result of the operation.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

function calculate(firstNumber, secondNumber, operator) {
  switch (operator) {
    case '+':
      return firstNumber + secondNumber
    case '-':
      return firstNumber - secondNumber
    case '*':
      return firstNumber * secondNumber
    case '/':
      return firstNumber / secondNumber
    default:
      throw 'Invalid operator'
  }
}

const readLineInterface = readline.createInterface({ input, output })

async function main() {
  let firstNumber = NaN

  while (isNaN(firstNumber) || firstNumber === '') {
    firstNumber = await readLineInterface.question('Enter the first number: ')

    if (isNaN(firstNumber)) {
      console.log('Invalid number')
    }
  }

  let secondNumber = NaN

  while (isNaN(secondNumber) || secondNumber === '') {
    secondNumber = await readLineInterface.question('Enter the second number: ')

    if (isNaN(secondNumber)) {
      console.log('Invalid number')
    }
  }

  let operator = ''

  // First we check if the operator has a valid length to avoid checking if it is included in the array.
  // Thus, lowering just a little tiny bit of the overall complexity.
  // Even if we didn't do this, the complexity would still be O(1) since the array is always the same size.
  while (operator.length !== 1 || !['+', '-', '*', '/'].includes(operator)) {
    operator = await readLineInterface.question('Enter the operator (+, -, *, /): ')

    if (operator.length !== 1 || !['+', '-', '*', '/'].includes(operator)) {
      console.log('Invalid operator')
    }
  }

  let calculateResult = 0

  try {
    calculateResult = calculate(firstNumber, secondNumber, operator)
  } catch (error) {
    console.log(error)
    return
  }

  if (!isFinite(calculateResult)) {
    console.log(`${firstNumber} ${operator} ${secondNumber} = Invalid result!`)
    return
  }

  console.log(`${firstNumber} ${operator} ${secondNumber} = ${calculateResult}`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
