/**
 * 
 */
let js = {
		 "Adresses" : [{
			  "number" : 1,
			   "name1" : "John",
			   "name2" : "Doom"
			 },
			 {
				 "number" : 2,
				 "name1" : "William",
				 "name2" : "Little"
			 },
			 {
				 "number" : 3,
				 "name1" : "Hendry",
				 "name2" : "Clarke"
			 },
			 {
				 "number" : 4,
				 "name1" : "Tom",
				 "name2" : "Millhouse"
				 
			 },
			 {
				 "number" : 9,
				 "name1" : "Susan",
				 "name2" : "Wong"
			 }]
			}



var oNewName = { number : 5,
        name1 : "Mark",
        name2 : "Butcher" }


js.Adresses.push(oNewName);

var aArr = [];

js.Adresses.forEach(function(oObject){
	aArr.push(oObject.number);
	
})

var sInput =  5;
var sIndex = aArr.indexOf(sInput) ;

if (sIndex >= 0 ){

var foundEntry  = js.Adresses[sIndex];

console.log(foundEntry.number);
console.log(foundEntry.name1);
console.log(foundEntry.name2);

}
else
{ 
	console.log("not found ");
	}	




