function searchByName(){
    displayContainer.innerHTML = '';
   var searchinput = document.getElementById("searchByName")
    var term=searchinput.value.toLowerCase();
    for(let i=0;i<Productlist.length;i++){
let isincluded=Productlist[i].productname.toLowerCase().includes(term);
if(isincluded){
    displayContainer.innerHTML = '';

}
else{
console.log("not found")
}
    }
}