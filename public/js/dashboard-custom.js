function getFile(){
 document.getElementById("upfile").click();
}
function sub(obj){
  var file = obj.value;
  var fileName = file.split("\\");
  document.getElementById("profilePhoto").innerHTML = fileName[fileName.length-1];
  event.preventDefault();
}
$(function() {

});
