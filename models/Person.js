
// Create a person having this prototype:
const mongoose=require('mongoose')
const Schema = mongoose.Schema
const Person = new Schema({
  name: {
    type: String,
  
  },
  age: {
    type:Number,
    
},
  favoriteFoods: [String],

}); 
module.exports=mongoose.model("Person",Person);



