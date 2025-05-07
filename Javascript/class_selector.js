class Selector{
    constructor(subSelector){ 
        this.subSelector = subSelector;
    }

    id(style=null){ //set the default value to null
        if (style !==null){ 
            //in order to be more flexible using setAttribute()
            return document.getElementById(this.subSelector).setAttribute('style',style);
        }
        else{
            return document.getElementById(this.subSelector);
        }
    }

    query(style=null){
        if (style !==null){
            return document.querySelector(this.subSelector).setAttribute('style',style);
        }
        else{
            return document.querySelector(this.subSelector);
        }
    }

    queryAll(){
        return document.querySelectorAll(this.subSelector);
    }
}