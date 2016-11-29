'use strict'

module.exports = class JobOrderer{

     //this.SEPARATOR = "\n";
    
    orderJobs(inStr){
        if(inStr === "")
            return "";
        
        if(!this.hasMoreThanOneLine(inStr))
            return inStr.charAt(0);

         return this.processJobs(inStr);  
    }

    hasMoreThanOneLine(str){
        if(str.indexOf("\n") === -1)
            return false;

        return true;
    }

    processJobs(str){

        let jobArray = str.split("\n"); 
        let ret = "";

        this.checkForLoops(jobArray);

        for(let i=0; i < jobArray.length; i++){
            ret =  this.processStatement(ret, jobArray[i]);   
        }

        return ret;

    }

    checkForLoops(jArray){

        for(let i=0; i < jArray.length; i++){
            if(!this.isSingleStatement(jArray[i])){
                let dep1 = jArray[i].charAt(0); 
                let dep2 = jArray[i].charAt(4);
                this.flattenStatement(jArray, i, dep1, dep2);

            }

        }
    }

    flattenStatement(jArray, index, dep1, dep2) {
        if (dep1 === dep2)
            throw new Error("Jobs can’t depend on themselves");
        for (let j = index + 1; j < jArray.length; j++) {
            if (!this.isSingleStatement(jArray[j]) && jArray[j].charAt(0) === dep2) {
                dep2 = jArray[j].charAt(4);
                if (dep1 === dep2)
                    throw new Error("Jobs can't have circular dependencies");
            }

        }

    }

    processStatement(str, statement){

        let dep1 = statement.charAt(0);
        let index1 = str.indexOf(dep1);
        
        if(this.isSingleStatement(statement)) 
            return this.resolveSingleDependency(str, index1, dep1);
        else{
            let dep2 = statement.charAt(4);
            let index2 = str.indexOf(dep2);
            return this.resolveAdvencedDependency(str, index1,index2,dep1,dep2)
        }        
    }

    isSingleStatement(statement){
        if(statement.length === 4)
            return true;
        return false;
    }

    resolveSingleDependency(str, index, dep){
        if( index === -1)
            return str + dep;
        return str;
    }

    resolveAdvencedDependency(str, index1, index2, dep1, dep2){

        if(index2 !== -1 )
            return str + dep1;
        if(index1 === -1)
            return str + dep2 + dep1;
        
        return str.substring(0, index1) + dep2 + str.substring(index1);
    }

}