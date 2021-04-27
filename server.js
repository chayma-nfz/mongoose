const express = require('express');
const { Model } = require('mongoose');
const app =express();
const connectDb =require('./config/connectDb')
//connect the database 
connectDb();
//  Create the Schema
const Person = require('./models/Person');
//Body Parser
app.use(express.json());

/*******Start the crud *************/
//get person
app.get("/api/person", (req,res) => {
    Person.find()
 .then((person)=> res.send({msg :"get person",person}))
 .catch((err)=> res.send({msg :" get error", err}))
 });

//   Create and Save a Record of a Model:
app.post("/api/person", (req, res) => {
    const {name,age,favoriteFoods } = req.body;
    const person = new Person({ name,age,favoriteFoods });
    person
      .save()
      .then((newPerson) => res.send({ msg: "Person added with succes", newPerson}))
      .catch((err) => res.send({ msg: "Add error", err }));
  });

//Create Many Records with model.create()
//***************************************/

app.post("/api/person/create", (req, res) => {
    let arrayOfPeople = req.body;
    Model.create(arrayOfPeople, function (err, data) {
    
        if (data) {
            res.send({ msg: "New person added!", result });
          } else {
            res.send({ msg: "Adding new person failed!", err });
          }
        });
      });
//Use model.find() to Search Your Database

app.get("/api/person", (req, res) => {
    Person.find()
      .then((person) => res.send({ msg: "Get person", person }))
      .catch((err) => res.send({ msg: "Cannot get person", err }));
  });

//  Use model.findOne() to Return a Single Matching Document from Your Database
app.get("/api/person/:food", (req, res) => {
       Person.findOne({favoriteFoods:req.params.food} )
      .then((person) => res.send({ msg: "Person is found", person }))
      .catch((err) => res.status(400).send({ msg: "Person is not found", err }));
  });


// Use the function argument 'personId' as search key.

app.get("/api/person/:id", (req, res,done) => {
    const id = req.params.personId;
     Person.findById({_id: id}, function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    })
});
//Perform Classic Updates by Running Find, Edit, then Save

app.put("/api/person/:personId", (req, res,done) => {
  const itemToAdd = 'hamburger'
  const person = person.findById({_id: personId}, function(err, data){
    if (err) {
      return done(err)
    }
    data.favoriteFoods.push(itemToAdd)
    data.save(function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    });
  });
});
// Delete One Document Using model.findByIdAndRemove
app.delete("/api/person/:id", (req, res,done) => {
    const id = req.params.userId;
    person.findByIdAndRemove({id},
         function(err, data){
      if (err) {
        return done(err)
      }
      else {
        return done(null, data)
      }
    });
});
//Perform New Updates on a Document Using model.findOneAndUpdate()
app.put("/api/person/:personName", (req, res,done) => {
const elemitem=req.params.personName;
const person = Person.findOneAndUpdate({name: elemitem}, {age: 20}, {new: true}, function(err, data){
  if (err) {
    return done(err)
  }
  else {
    return done(null, data)
  }
})
});
//MongoDB and Mongoose - Delete Many Documents with model.remove()
app.delete("/api/person/:nameToRemove", (req, res) => {

        User.deleteMany({ name: "Mary" })
          .then(() => res.send({ msg: "Users with the name of Mary were deleted" }))
          .catch((err) => res.send({ msg: "Remove error", err }));
      });

//Chain Search Query Helpers to Narrow Search Results
app.get("/api/person/:foodToSearch", (req, res, done) => {
  var foodToSearch = "pizza";
  const person = person.find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, data){
    if (err) {
      done(err)
    }
    else {
      done(null, data)
    }
  })
});





//connect the server
app.listen(4000, (err)=>{
    if (err) console.log("Server is not running");
    else console.log("Server is running on port 4000");
});