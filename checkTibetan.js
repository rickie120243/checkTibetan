var fs=require("fs");
var glob=require("glob");
var letters=JSON.parse(fs.readFileSync("possible_root_letters_sort.json","utf8"));

var indexOfSorted = function (array, obj) { //binary search
    var low = 0,
    high = array.length-1;
    while (low < high) {
      var mid = (low + high) >> 1;  //位元右移，可視為÷2的n次分之整數部分  此時n=1
      array[mid] < obj ? low = mid + 1 : high = mid;
    }
    if(array[low] != obj) return -1;
    return low;
}

var processBampo= function(fn){
  var taggedcontent=[];
	var bampo = fs.readFileSync(fn,"utf8");
  var pageContent = bampo.replace(/<pb id="/g,'#<pb id="').split("#");//[text,pb,text,pb, ...]
  var filename = fn.split("/")[3].substr(0,10);
  for(var i=0; i<pageContent.length; i+=1){
    pageContent[i]=pageContent[i].replace(/[\u0f20-\u0fbf]+/g,function(m){
     var index = indexOfSorted(letters,m);
      if( index == -1 &&  !(m.substr(m.length-2) == "འི" || m.substr(m.length-2) == "འོ")) {//!m.substr(m.length-2).match(/[འིའོ]/)
      return '<w id="mispell">'+m+'</w>';
      }
      return m;
    });
    taggedcontent.push(pageContent[i]);
  }

  fs.writeFileSync("./result/"+filename+".xml",taggedcontent.join(""),"utf8");
//  console.log(taggedcontent.join(""));
}

glob("../derge_kangyur/001/*.xml",function(err,files){
  files.map(processBampo);
});
