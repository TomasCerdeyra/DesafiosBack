function randomNumbers(query = 1000000) {
    let numbers = [];
    for (let i = 0; i < query; i++) {
        numbers[i] = Math.floor(Math.random() * 1000) + 1;
    }
    return numbers;
}

export default randomNumbers

