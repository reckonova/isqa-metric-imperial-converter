'use strict';

const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      const input = req.query.input;
      const initNum = convertHandler.getNum(input);
      const initUnit = convertHandler.getUnit(input);
      const returnNum = convertHandler.convert(initNum, initUnit);
      const returnUnit = convertHandler.getReturnUnit(initUnit);
      const toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      switch(true) {
        case initNum === 'invalid number' && initUnit === 'invalid unit' :
          res.status(400).json({ error: 'invalid number and unit' });
          break;
        case initNum === 'invalid number' :
          res.status(400).json({ error: 'invalid number' });
          break;
        case initUnit === 'invalid unit' :
          res.status(400).json({ error: 'invalid unit' });
          break;
        default:
          res.json({ initNum, initUnit, returnNum, returnUnit, string: toString });
      }
      
    });
    
};