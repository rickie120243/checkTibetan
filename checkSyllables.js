var fs=require("fs");
var content=fs.readFileSync("./phyagchen001(with pb).xml","utf8");
var letters=JSON.parse(fs.readFileSync("possible_root_letters_sort.json","utf8"));
var locationout=[];

var indexOfSorted = function (array, obj) { 
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return -1;
    return low;
}

var dosort=function(arr){
  return arr.sort(function(a,b){
    return a[0]-b[0];
  });
}

var findCoordinates=function(item){
  var location=0,x=new RegExp(item,"g");
  while(result=x.exec(content)){
    locationout.push([result.index,item.length,item]);
  }
}

var checkSyllables= function(fn){
  var wrongsyllables=[];
  fn.replace(/[\u0f20-\u0fbf]+/g,function(m){
     var index = indexOfSorted(letters,m);
      if(index==-1&&!(m.substr(m.length-2)=="འི"||m.substr(m.length-2)=="འོ")){
        if(wrongsyllables.indexOf(m)==-1) wrongsyllables.push(m);
      }
    });
  return wrongsyllables;
}

var t=new Date();
var arr=checkSyllables(content);
arr.map(findCoordinates);
console.log(dosort(locationout));
console.log(new Date()-t);
