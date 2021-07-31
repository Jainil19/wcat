let fs = require("fs");
let path = require("path");
// taking input
let inputArr = process.argv.slice(2);
let optionsArr = [];
let filesArr = [];
// dividing input in options and files

for (const val of inputArr) {
  if (val.charAt(0) == "-") {
    optionsArr.push(val);
  } else {
    filesArr.push(val);
  }
}
//if both -n & -b exist

if(optionsArr.includes("-n") && optionsArr.includes("-b")){
  console.log("either enter -n or -b option");
  return;
}
// 
//file exist
for (const filepath of filesArr) {
  let exist = fs.existsSync(filepath);
  if (!exist) {
    console.log(filepath, " does not exist Enter a valid Path");
    return;
  }
}

//printing file content
let content;
for (const filepath of filesArr) {
   content =  content + fs.readFileSync(filepath, "utf-8") + "\r\n";
}
let contentArr = content.split("\r\n");


// -s
if(optionsArr.includes("-s")){
let tempArr=[];
for (let i = 0; i < contentArr.length; i++) {
  if(contentArr[i]=="" && contentArr[i+1]==""){
    continue;
  }else{
    tempArr.push(contentArr[i]);
  }
}
contentArr=tempArr;
}

// -n
if(optionsArr.includes("-n")){
  for (let i=0; i<contentArr.length;i++) {
    contentArr[i] = `${i+1} ${contentArr[i]}`;
  }
}

// -b
if(optionsArr.includes("-b")){
  let count=1;
  for (let i = 0; i < contentArr.length; i++) {
    if(contentArr[i]!= ""){
      contentArr[i] = `${count} ${contentArr[i]}`;
      count++;
    }
  }
}

//output with join
console.log(contentArr.join("\n"));
