// Write a function that checks whether a number is prime or not. Then create a program that prints the first 10 prime numbers.

// If a number is divisible by a number greater than its square root, then it is also divisible by a number smaller than its square root.
// For example, 100 is divisible by 10, but it is also divisible by 20.
// So, if we check if a number is divisible by any number between 2 and its square root, we are also checking
// if it is divisible by any number between its square root and itself.
// This way, we can reduce the number of iterations needed to check if a number is prime.
const isPrime = (number) => {
  for (let i = 2, s = Math.sqrt(number); i <= s; i++) {
    if (number % i === 0) return false
  }
  return number > 1
}

const primeNumbers = []
let CurrentNumber = 0

while (primeNumbers.length < 10) {
  if (isPrime(CurrentNumber)) {
    primeNumbers.push(CurrentNumber)
  }

  CurrentNumber++
}

console.log(`First 10 prime numbers are: ${primeNumbers}`)
