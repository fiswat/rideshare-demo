//const { pipe } = require('./Pipe').Pipe;
class FibonacciSeries {
    static #getPureIndex(number) {
        return 2.078087 * Math.log(number) + 1.672276;
    }

    static #getClosestIndexOf(number) {
        let index = this.#getPureIndex(number);
        if (this.isFibonacci(number)) {
            return Math.round(index);
        } else {
            return Math.floor(index);
        }
    }

    static #isPerfectSquare(number) {
        return Number.isInteger(Math.sqrt(number));
    }

    static upToLength(length, seriesOptional) {
        let series = seriesOptional ? seriesOptional.series : [];
        if (length <= 2) {
            for (let i = 0; i < length; i++) {
                series.push(i);
            }
        } else {
            let startIndex;
            !seriesOptional && (series = [0, 1]);
            startIndex = series.length;
            for (let i = startIndex; i < length; i++) {
                series.push(series[i - 1] + series[i - 2]);
            }
        }
        return series;
    }

    static upToValue(value) {
        if (value < 0) {
            return [];
        } else if (value >= 0 && value < 1) {
            return [0];
        } else {
            let length = this.#getClosestIndexOf(value) + 1;
            return this.upToLength(length);
        }
    }

    static withinIndexRange(startIndex, offset) {
        if (offset >= 0 && startIndex >= 0) {
            let series = [];
            let length = offset + startIndex;
            if (length >= 0 && length <= 2) {
                for (let i = startIndex; i < length; i++) {
                    series.push(FibonacciSeries.getValueOf(i));
                }
            } else {
                series = [FibonacciSeries.getValueOf(startIndex), FibonacciSeries.getValueOf(startIndex + 1)];
                series = FibonacciSeries.upToLength(offset, { series });
            }
            return series;
        } else {
            return [];
        }
    }

    static withinValueRange(start_index, end_index) {


    }

    static getIndexOf = (number) => {
        return this.isFibonacci(number) ?
            this.#getClosestIndexOf(number) : -1;
    }

    static getValueOf(index) {
        //const base = 10;
        const indice = (index - 1.672276) / 2.078087;
        return Math.round(Math.pow(Math.E, indice));
    }

    static isFibonacci = (number) => {
        return this.#isPerfectSquare(5 * Math.pow(number, 2) + 4) || this.#isPerfectSquare(5 * Math.pow(number, 2) - 4);
    }

    static isFibonacciSeries = (...numbers) => {
        let status = true;
        //console.log(numbers);
        for (let number of numbers) {
            if (!this.isFibonacci(number)) {
                status = false;
                break;
            }
        }
        return status;
    }
}
exports.FibonacciSeries = FibonacciSeries;

//console.log(FibonacciSeries.upToLength(12));
//console.log(FibonacciSeries.isFibonacciSeries(13,21))


console.log(FibonacciSeries.upToLength(60))
//console.log(FibonacciSeries.getValueOf(0))
//console.log(FibonacciSeries.getValueOf(1))
console.log(FibonacciSeries.withinIndexRange(0, 10))
console.log(FibonacciSeries.withinIndexRange(10, 10))
console.log(FibonacciSeries.withinIndexRange(21, 15))
/* console.log(FibonacciSeries.upToLength(30))
console.log(FibonacciSeries.getValueOf(-1))
console.log(FibonacciSeries.getValueOf(14))
console.log(FibonacciSeries.getValueOf(16))
console.log(FibonacciSeries.getValueOf(21))
console.log(FibonacciSeries.getValueOf(4))
console.log(FibonacciSeries.getValueOf(5))
console.log(FibonacciSeries.getValueOf(6)) */