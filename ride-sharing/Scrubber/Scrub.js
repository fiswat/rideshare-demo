class Scrub {
    constructor() {
    }

    add_user(data) {
        if (data) {
            if(typeof data == 'string') {
                let inputs = data.split(',');
                if (inputs.length == 3) {
                    inputs[1] = inputs[1].trim();
                    if (['M', 'F'].includes(inputs[1])) {           
                        if (Number.isInteger(parseInt(inputs[2]))) {
                            return {status : true, data : inputs};
                        } else {
                            return { status : false ,error: "Age can be integer only", data : inputs };
                        }
                    } else {
                        return { status : false, error: "M and F allowed as gender", data : inputs };
                    }
                } else {
                    return { status : false,  error: "3 comma seperated data needed" };
                }
            } else {
                return { status : false, error: "Only strings allowed as input " };
            }
        } else {
            return { status : false,  error: "Data missing" };
        }
    }

    add_vehicle(data) {
        if (data) {
            if(typeof data == 'string') {
                let inputs = data.split(',');
                if (inputs.length == 3) {
                    inputs[1] = inputs[1].trim();
                    return {status : true, data : inputs};
                } else {
                    return { status : false,  error: "3 comma seperated data needed" };
                }
            } else {
                return { status : false, error: "Only strings allowed as input " };
            }
        } else {
            return { status : false,  error: "Data missing" };
        }
    }
}

let instance;
let getInstance = ()=>{ 
    if(!instance){
        console.log('New Scrubber');
        instance = new Scrub();
        Object.freeze(instance);
    }
    return instance;
}
exports.getInstance = getInstance;
//exports.Scrub = Scrub;