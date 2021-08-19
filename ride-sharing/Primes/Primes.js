

let makeInitiList = (max) => {
    let arr = [];
    for (let val = 2; val <= 50; val++) {
        arr = [...arr, val];
    }
    return arr;
}

console.log(makeInitiList(50));

let getPrimes = (numbers) => {
    let x = numbers.filter((cur, idx, arr) => {
        return cur * 2
    });
    console.log(x);

}

getPrimes(makeInitiList(50));

let printPrime = (max) => {



}








