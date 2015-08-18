var fs=require("fs");
var content=fs.readFileSync("./d1_001.xml","utf8");
var letters=JSON.parse(fs.readFileSync("possible_root_letters_sort.json","utf8"));
var locationout=[];

var indexOfSorted = function (array, obj) { 
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;  //位元右移，可視為÷2的n次分之整數部分  此時n=1
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return -1;
    return low;
}

var findCoordinates=function(item){
  var location=0,x=new RegExp(item,"g");
  while(result=x.exec(content)){
    locationout.push([result.index,item.length]);
  }
}

var deleteDuplicate=function(m){
  return m.filter(function(elem, index, self) {
    return index==self.indexOf(elem);
});
} 

var checkSyllables= function(fn){
  var wrongsyllables=[];
  fn.replace(/[\u0f20-\u0fbf]+/g,function(m){
     var index = indexOfSorted(letters,m);
      if( index == -1 &&  !(m.substr(m.length-2) == "འི" || m.substr(m.length-2) == "འོ")) {//!m.substr(m.length-2).match(/[འིའོ]/)
        wrongsyllables.push(m);
      }
    });
  return wrongsyllables;
//  fs.writeFileSync("./result/"+filename,JSON.stringify(out,""," ").replace(/\r?\n/g,"").replace(/],/g,"],\n"),"utf8");
}
var arr=checkSyllables(content);
arr=deleteDuplicate(arr);
arr.map(findCoordinates);
console.log(locationout);
