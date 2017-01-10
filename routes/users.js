var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  var Connection = require('tedious').Connection;
  var config = {
    userName: 'ssssssss',
    password: 'temp!GG4D',
    server: '2016web2-13.database.windows.net',
    options: {encrypt: true, database: '2016web2-13'}
  };
  var connection=new Connection(config);
  connection.on('connect',function(err) {
    if(err){
      res.render('index', {title:"はじめてのDB", message:err});
    }else{
      console.log("Connected");
      executeStatement();
    }
  });
  
  var Request = require('tedious').Request;
  var TYPES = require('tedious').TYPES;
  
  function executeStatement() {
    request=new Request("SERECT TOP(10) CompanyName FROM SalesLT.Customer;", function(err) {
      if(err) {
        console.log(err);}
    });
    
    var result='<table>';
    
    request.on('row',function(columns){
      result += '<tr>';
      columns.forEach(function(column) {
        if(column.value === null) {
          console.log('NULL');
        }else{
          result+='<td>' + column.value + '</td>';
        }
        result += '</tr>';
      });
    });
    
    request.on('doneProc', function(rowCount, more, returnStatus,rows) {
      result += "</table>";
      res.render('index', {title:"はじめてのDB", message:result});
    });
    
    connection.execSql(request);
  }
});

module.exports=router;
