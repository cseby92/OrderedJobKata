'use strict'

const expect = require('chai').expect;
const JobOrderer = require("./index.js");

describe('OrderedJobKata', function(){

    let jOrderer;
    beforeEach(function() {
        jOrderer = new JobOrderer();
    });

    it('it should return an empty string for empty string', function() {
        expect(jOrderer.orderJobs("")).to.eql("");
    });

    it('it should return a for "a =>" string', function() {
        expect(jOrderer.orderJobs("a =>")).to.eql("a");
    });

    it('it should contain a,b,c for "a =>\nb =>\nc =>\n" string', function() {
       
        let jobs = jOrderer.orderJobs("a =>\nb =>\nc =>\n");
        
        expect(jobs).to.have.lengthOf(3);
        expect(jobs).to.contain('a');
        expect(jobs).to.contain('b');
        expect(jobs).to.contain('c');

    });

    it('it should contain a,cb for "a =>\nb =>c\nc =>\n" string', function() {
       
        let jobs = jOrderer.orderJobs("a =>\nb =>c\nc =>\n");
        
        expect(jobs).to.have.lengthOf(3);
        expect(jobs).to.contain('a');
        expect(jobs).to.contain('cb');

    });

    it('it shoud contain a,c before b, f before c, a before d, b before e, f  "a=>\nb =>c\nc =>f\nd =>a\ne =>b\nf =>', function(){
        
        let jobs = jOrderer.orderJobs("a =>\nb =>c\nc =>f\nd =>a\ne =>b\nf =>");
        
        expect(jobs).to.have.lengthOf(6);
        expect(jobs).to.contain('a');
        expect(jobs).to.contain('f');
        expect(jobs.indexOf('c') < jobs.indexOf('b')).to.eql(true);
        expect(jobs.indexOf('f') < jobs.indexOf('c')).to.eql(true);
        expect(jobs.indexOf('a') < jobs.indexOf('d')).to.eql(true);
        expect(jobs.indexOf('b') < jobs.indexOf('e')).to.eql(true);
            
    });

    

});