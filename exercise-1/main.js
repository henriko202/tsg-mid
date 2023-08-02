// exercise 1: Create a calculator that takes two numbers and an operator (+, -, *, /) and returns the result of the operation.

// We use the readline module from node (available since node 7) to read from the console.
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

// We use an async function to be able to use the await keyword.
async function main() {
  let FirstNumber = NaN

  while (isNaN(FirstNumber)) {
    FirstNumber = Number(await readLineInterface.question('Enter the first number: '))

    if (isNaN(FirstNumber)) {
      console.log('Invalid number')
    }
  }

  let secondNumber = NaN

  while (isNaN(secondNumber)) {
    secondNumber = Number(await readLineInterface.question('Enter the second number: '))

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
    calculateResult = calculate(FirstNumber, secondNumber, operator)
  } catch (error) {
    console.log(error)
    return
  }

  if (!isFinite(calculateResult)) {
    console.log(`${FirstNumber} ${operator} ${secondNumber} = Invalid result!`)
    return
  }

  console.log(`${FirstNumber} ${operator} ${secondNumber} = ${calculateResult}`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
