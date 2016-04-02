import _ from 'underscore';

var Converter = require("csvtojson").Converter;
var converter = new Converter({});

var csvFileInput = document.getElementById('csv-input')

csvFileInput.addEventListener('change', handleCSV, false);

function handleCSV() {
  console.log('got file');
  var csv = this.files[0];
  console.log(csv);
}

function loadJSON(callback, jsonPath) {   

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.responseType = 'json';
    xobj.open('GET', jsonPath, true); 
    xobj.onreadystatechange = function () {
          if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            var resArray = xobj.response.map(function(obj){
              var newObj = {};
              for (var prop in obj) {
                newObj[camelize(prop).replace(/:/g, '')] = obj[prop];
              };
              return newObj;
            });
            callback(resArray);
          }
    };
    xobj.send(null);  
}



// loadJSON(console.log.bind(console), 'data/mar20-apr1.json');
loadJSON(processAttendance, 'data/mar20-apr1.json');
loadJSON(getStipends, 'data/mar20-apr1.json');

function processAttendance(attendence) {
  var result = attendence.filter(entry => {
    return 'Adams, Jamie' === entry.subjectName;
  }).map(entry => {
    return entry.totalDailyCredits
  }).reduce((sum, credits) => {
    return sum + credits;
  });
  console.log(result)
}


function getNames(attendence){
  var results = []
  attendence.forEach(entry => {
    if (results.indexOf(entry.subjectName) === -1) {
      results.push(entry.subjectName);
    };
  });
  // console.log(results);
  return results;
}

function getStipends(attendence) {
  var names = getNames(attendence);

  var totals = names.map(name => {
    return attendence.filter(entry => {
      return name === entry.subjectName;
    }).map(entry => {
      return entry.totalDailyCredits
    }).reduce((sum, credits) => {
      return sum + credits;
    },0)
  })
  // console.log(totals);

  let results = _.zip(names, totals).map(el => {
    let obj = {};
    obj[el[0]] = el[1];
    return obj;
  });
  console.log(results);
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}