let utils = {};

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
    return index == 0 ? letter.toLowerCase() : letter.toUpperCase();
  }).replace(/\s+/g, '');
}

utils.roundDownToHalf = num => {
  const absNum = Math.abs(num)
  let result = absNum * 10 % 10 >= 5 
    ? Math.floor(absNum) + 0.5
    : Math.floor(absNum);
  return num < 0 ? result * -1 : result;
}

utils.cleanEtoData = etoData => {
  return etoData.map(function(obj){
    var newObj = {};
    for (var prop in obj) {
      newObj[camelize(prop).replace(/[&]?[:]?/g, '')] = obj[prop];
    };
    return newObj;
  });
}
export default utils;
