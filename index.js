'use strict'

module.exports = class JobOrderer{
    
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

        for(let i=0; i < jobArray.length; i++){
            ret =  this.processStatement(ret, jobArray[i]);            
        }

        return ret;

    }

    processStatement(str, statement){

        let dep1 = statement.charAt(0);
        let dep2 = statement.charAt(4);
        let index1 = str.indexOf(dep1);
        let index2 = str.indexOf(dep2);
        
        if(this.isSingleStatement(statement)) 
            return this.resolveSingleDependency(str, index1, index2, dep1);
        else
            return this.resolveAdvencedDependency(str, index1, index2, dep1, dep2);

    }

    isSingleStatement(statement){
        if(statement.length === 4)
            return true;
        return false;
    }

    resolveSingleDependency(str, index1, index2, dep){
        if( index1 === -1)
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