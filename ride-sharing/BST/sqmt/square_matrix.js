/* Given a square matrix, turn it by 90 degrees in clockwise direction without using any extra space.
Examples:
Input:
   00  01 02
00  1  2  3
01  4  5  6
02  7  8  9
Output: 
 7  4  1
 8  5  2
 9  6  3 

 00 01 02
 10 11 12
 20 21 22

 00 - > 02

 00 -> 20
20 -> 22

22 -> 02 

*/

let ar = [[1, 2, 3],
[4, 5, 6],
[7, 8, 9]

];
let max = 4;

let rotate = (ar)=>{
    for (i = 0; i < max / 2; i++) {
        for (j = i; j < max - 1 - i; j++) {
            let swappable = ar[i][j];
            ar[i][j] = ar[max - 1 - i][i];
            ar[max - 1 - i][i] = ar[max - 1 - i][max - 1 - i];
            ar[max - 1 - i][max - 1 - i] = ar[i][max - 1 - i]; // todo i or j?
            ar[i][max - 1 - i] = swappable;    // todo i or j
        }
    }
    return ar
}


ar.




