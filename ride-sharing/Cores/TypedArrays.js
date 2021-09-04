//let int8Arr = new Int8Array(16);
//let uInt8Arr = new Uint8Array(16);
//let calmped = new Uint8ClampedArray (16);
let arrbuff = new ArrayBuffer(4);
let sharedArrBuff = new SharedArrayBuffer(16);
console.log(sharedArrBuff);
console.group("a");
console.log("b")
console.log("b")
console.log("b")
console.log("b")
console.groupEnd();

//calmped[0] = 12;
//calmped[15] = -1;
//calmped[16] = 1200;

let dataView = new DataView(arrbuff);

//uInt8Arr[0] = 12;
//uInt8Arr[15] = 200;
//uInt8Arr[14] = -256*2+1;
//int8Arr[0] = 12;
//int8Arr[3] = 120;
//int8Arr[4] = 'a';

//console.log("int8",int8Arr, int8Arr.length);
//console.log("uint8",uInt8Arr, uInt8Arr.length);
//console.log("calmped",calmped, calmped.length);
//dataView.setInt8(0, 10);
//dataView.setInt16(1, 500);

dataView.setInt16(0, 200);
dataView.setInt32(0, 500);
//dataView.setInt8(2, 21);
console.table([{"arrbuff": arrbuff, "dataview" : dataView}]);
console.log(arrbuff);
console.log(dataView.byteLength);
console.log(dataView.getInt8(0));
console.log(dataView.getInt32(0));
console.log(dataView.getInt16(0));
//console.log(dataView.getInt32(1));
console.log(dataView.getInt8(3));
console.log(dataView.getInt8(4));





//let int16Arr = new Int16Array(16);
//console.log("int8",int16Arr, int16Arr.length);