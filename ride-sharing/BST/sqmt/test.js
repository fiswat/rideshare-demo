/* 7 4 1
8 5 2
9 6 3 */
let ar = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9]

];


console.log(ar);
let max = 3;

let rotate = (ar) => {
    for (i = 0; i < max - 1; i++) {
        for (j = i; j < max - 1 - i; j++) {
            let swappable = ar[i][j];
            console.log(ar[i][j], ar[3 - 1 - i][i]);
            ar[i][j] = ar[max - 1 - j][i];
            ar[max - 1 - j][i] = ar[max - 1 - i][max - 1 - j];
            ar[max - 1 - i][max - 1 - j] = ar[j][max - 1 - i]; // todo i or j?
            ar[j][max - 1 - i] = swappable;    // todo i or j
        }
    }
    return ar;
}


console.log("rotated", rotate(ar));

Let’s say that you have 25 horses, and you want to pick the fastest 3 horses out of those 25. In each race, only 5 horses can run at the same time because there are only 5 tracks.What is the minimum number of races required to find the 3 fastest horses without using a stopwatch ?


group  1 - 5 
groups = 25 horses / 5 tacks = 5 = 5 races 5
winner of each races = 5 
race the winners again  1 
eliminate the last 2 horses
6+1 races

a1 = 3rd a1
b1 = e   
c1 = 1st c2, c30  
d1 = 2nd d1, d2
e1 = e

next horses 
c2, c3
d1, d2 
a1


