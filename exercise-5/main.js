// Create a program that receives a number from the user and displays the table of that number, from 1 to 10.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

function table(number) {
  for (let i = 1; i <= 10; i++) {
    console.log(`${number} x ${i} = ${number * i}`)
  }
}

const readLineInterface = readline.createInterface({ input, output })

async function main() {
  let inputNumber = NaN

  while (isNaN(inputNumber)) {
    inputNumber = Number(await readLineInterface.question('Enter the number to display the table of: '))

    if (isNaN(inputNumber)) {
      console.log('The input is not a number.')
    }
  }

  table(inputNumber)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
