// Write a function to calculate the factorial of a number. Next, create a program that allows the
// user to enter a number and displays the corresponding factorial.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

function factorial(number, result = 1n) {
  while (number > 0) result *= BigInt(number--)
  return result
}

const readLineInterface = readline.createInterface({ input, output })

async function main() {
  const inputNumber = BigInt(await readLineInterface.question('Enter a number to calculate its factorial: '))

  console.log(`The factorial of ${inputNumber} is ${factorial(inputNumber)}`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
