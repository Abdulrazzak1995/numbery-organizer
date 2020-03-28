const object = {
  numberyStrings: [],
  NaNyStrings: [],
  isNumberyString: function (param) {
 
    return (typeof param !==  'string') ? false :((isNaN(param)) ? false : true);
  },
  addString: function (param) {
  if(typeof param === "string"){
  if(isNaN(param)){
    this.NaNyStrings.push(param);
    return true;
  }else{
    this.NaNyStrings.push(param);
    return true;
  }
}else{
    return false;
  }
  },
  allStrings: function () {
return [...this.numberyStrings, ...this.NaNyStrings];
  },
  evenStrings: function () {
return this.numberyStrings.filter(number => number % 2 ==0);
  },
  oddStrings: function () {
return this.numberyStrings.filter(number => number %2 == 1 || number %2 == -1);
  },
  negativeStrings: function () {
return this.numberyStrings.filter(number => number<0);
  },
  positiveStrings: function () {
    return this.numberyStrings.filter(number => number >= 0);

  },
  zeroStrings: function () {
    return this.numberyStrings.filter(number => number== 0);

  },
  numberyAsNumbers: function () {
    return this.numberyStrings.map(Number);
  },
  NaNyAsNumbers: function () {
return this.NaNyStrings.map(Number);
  },
  // question !
  sumOfNumbery: function () {

  },
  sumOfNaNy: function () {

  },
};


