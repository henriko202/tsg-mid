// Create a function that checks whether a word is a palindrome (that is, whether it reads the
// same backwards and forwards). The program must ask the user for a word and inform whether or not it is a palindrome.

import * as readline from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const readLineInterface = readline.createInterface({ input, output })

function isPalindrome(word) {
  const reversedWord = word.split('').reverse().join('')
  return word === reversedWord
}

async function main() {
  const inputWord = await readLineInterface.question('Enter a word: ')

  console.log(`The word "${inputWord}" is ${isPalindrome(inputWord) ? '' : 'not '}a palindrome!`)
}

// We want to always close the interface, even if an error occurs.
main().finally(() => readLineInterface.close())
