'use strict';

function ConvertHandler() {
  
  this.getNum = (input) => {
    let convertedNumber;
    let match = input.match(/[a-zA-Z]/);
    if(match) {
      if (match.index === 0) convertedNumber = 1; //No number, 1 as default
      let strNumbers = input.substring(0, match.index).split('/'); 
      if(strNumbers.length > 2) convertedNumber = 'Error'; //Doble or higher division
      convertedNumber = strNumbers.length == 1? 
        parseFloat(strNumbers[0]): 
        parseFloat(strNumbers[0]) / parseFloat(strNumbers[1]);
    }
    else if(input.match(/^\d+\.{0,1}\d*$/)) //There is a number
            convertedNumber = parseFloat(input);
    else convertedNumber = 'Error';
    return convertedNumber;
  };
  
  this.getUnit = (input) => {
    input = input.toLowerCase();
    //match any of this unit if there is not other word before and nothing after
    let match = input.match(/(?<![a-zA-Z])(gal|lbs|mi|l|kg|km)$/);
    if(match) 
      return input.substring(match.index);
    else return 'Error';
  };
  
  this.getReturnUnit = (initUnit) => {
    initUnit = initUnit.toLowerCase();
    let res = {
      'gal': 'l',
      'lbs' : 'kg',
      'mi' : 'km',
      'l': 'gal',
      'kg': 'lbs',
      'km': 'mi' 
    };
    return res[initUnit]? res[initUnit]: 'Error';
  };

  this.spellOutUnit = (unit) => {
    let res = {
      'gal': 'gallons',
      'lbs' : 'pounds',
      'mi' : 'miles',
      'l': 'liters',
      'kg': 'kilograms',
      'km': 'kilometers' 
    };
     unit = unit.toLowerCase();
    return res[unit]? res[unit]: 'Error';
  };
  
  this.convert = (initNum, initUnit) => {
    let res = {
      'gal': x => x * 3.78541,
      'lbs' : x => x * 0.453592,
      'mi' : x => x * 1.60934,
      'l': x => x / 3.78541,
      'kg': x => x / 0.453592,
      'km': x => x / 1.60934
    };
    return Number(Math.round(res[initUnit](initNum)+'e'+5)+'e-'+5);
    //return parseFloat(res[initUnit](initNum).toFixed(5));
  };
  
  this.getString = (initNum, initUnit, returnNum, returnUnit) => {
    initUnit = initUnit.toLowerCase();
    returnUnit = returnUnit.toLowerCase();
    let res = {
      'gal': 'gallons',
      'lbs' : 'pounds',
      'mi' : 'miles',
      'l': 'liters',
      'kg': 'kilograms',
      'km': 'kilometers' 
    };
    return initNum + ' ' + res[initUnit] + ' converts to ' + returnNum + ' ' + res[returnUnit];
  }
}

module.exports = ConvertHandler;
