let node = require('./TreeNode').TreeNode;

let nodes = [];

[1, 10, 3, 6, 8, 4, 13, 7, 14].map((val, idx, arr)=>{
    let cur_node = new node(val);
    if(!nodes.length){
        cur_node.status = 'root';
        nodes.push(cur_node);
    }else{
        let breakFree = false;
        while(!breakFree){


        }

    }
});

let insertNode = (value, node)=>{
    

}
