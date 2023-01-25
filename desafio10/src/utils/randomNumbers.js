const randomNumbers = (quantity) => {

    const numbers = [];

    for (let i = 0; i < quantity; i++) {
        numbers.push(Math.floor(Math.random() * 1001));
    }

    const quantityOfEvenNumbers = {}

    numbers.forEach(number => {
        quantityOfEvenNumbers[number] = (quantityOfEvenNumbers[number] || 0) + 1
    })

    return quantityOfEvenNumbers;
}

process.on('message', (message) => {
    let { cantidad } = message
    const countArrayNumbersObj = randomNumbers(cantidad)
    process.send(countArrayNumbersObj)
})