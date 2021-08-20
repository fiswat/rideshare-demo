

let makeInitiList = (max) => {
    let arr = [];
    for (let val = 2; val <= 50; val++) {
        arr = [...arr, val];
    }
    return arr;
}

console.log(makeInitiList(50));

let getPrimes = (numbers) => {
    for(i =0 ;i++; i<=numbers.indexOf(Math.sqrt(numbers[numbers.length-1]))){


    }
    let x = numbers.filter((cur, idx, arr) => {
        return cur * 2
    });
    console.log(x);

}

getPrimes(makeInitiList(50));

let printPrime = (max) => {



}








