class TreeNode {
    
    constructor(value){
        this.node = value;
        this.left = null;
        this.right = null;
        this.status = null;
    }

    get left(){
        return this.left;
    }

    get right(){
        return this.right;
    }
    
    get node(){
        return this.node;
    }

    get status(){
        return this.status;
    }

    set left(value){
        return this.left = value;
    }

    set right(value){
        return this.right = value;
    }

    set node(value){
        return this.node = value;
    }

    set status(value){
        return this.status = value;
    }

}
exports.TreeNode = TreeNode;
