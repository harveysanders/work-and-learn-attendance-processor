import _ from 'underscore';
import Papa from 'papaparse';

let parseConfig = {
    header: true,
    error: (error, file) => {
      console.error('error: ', error);
    },
    complete: (results, file) => {
      console.log('parsed:', results);
      getStipends(cleanEtoData(results.data));
    }
}

let csvFileInput = document.getElementById('csv-input');
csvFileInput.addEventListener('change', handleCSVInput, false);


function handleCSVInput() {
  Papa.parse(this.files[0], parseConfig);
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

// loadJSON(getStipends, 'data/mar20-apr1.json');

function getNames(attendence){
  var names = []
  attendence.forEach(entry => {
    if (names.indexOf(entry.subjectName) === -1) {
      names.push(entry.subjectName);
    };
  });
  return names;
}

function getStipends(attendence) {
  var names = getNames(attendence);

  var totals = names.map(name => {
    return attendence.filter(entry => {
      return name === entry.subjectName;
    }).map(entry => {
      return Number(entry.totalDailyCredits);
    }).reduce((sum, credits) => {
      return sum + credits;
    },0)
  });

  let results = _.zip(names, totals).map(el => {
    let obj = {};
    obj[el[0]] = el[1];
    return obj;
  });
  console.log(results);
}

//ETO data formatting helpers

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

function cleanEtoData(etoData) {
  return etoData.map(function(obj){
    var newObj = {};
    for (var prop in obj) {
      newObj[camelize(prop).replace(/:/g, '')] = obj[prop];
    };
    return newObj;
  });
}