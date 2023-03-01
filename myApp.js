require('dotenv').config();
//first challenge
let mongoose= require('mongoose')
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

//second challenge
let personSchema= new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: {
    type: Array,
    default: '*'
  }
});

//thirth challenge
let Person= mongoose.model('Person', personSchema);


//forth challenge
const createAndSavePerson = (done) => {
  let joel=new Person({name:"joel", age:25, favoriteFoods: ["comida","comida2"]});

  joel.save((err,data)=>{
    if(err) return console.error(err)
    done(err,data);
  })
};


//fivth challenge
const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople,(err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  })
};

//sixth challenge
const findPeopleByName = (personName, done) => {
  Person.find({"name": personName},(err,data)=>{
    if(err) return console.error(err)
    done(err,data);
  })
};

//seventh challenge
const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods:food},(err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  })
};

//eigth challenge
const findPersonById = (personId, done) => {
  Person.findById({_id:personId}, (err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  })
};

//nineth challenge
const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";
  Person.findById({_id:personId},(err,data)=>{

    data.favoriteFoods.push(foodToAdd)
    data.save((err,data)=>{
      if (err) {
        done(err)
      }else{
        done(err,data)
      }
    });    
  });
};

//eleventh challenge
const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name:personName},{age:ageToSet},{new:true},(err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  });
};

//twelveth challenge 
const removeById = (personId, done) => {
  Person.findByIdAndRemove({_id:personId},(err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  })

};

//thirteenth challenge
const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name:nameToRemove},(err,data)=>{
    if(err) console.error(err)
    done(err,data)
  })
};

//forteenth challenge
const queryChain = (done) => {
  const foodToSearch = "burrito";

  Person.find({favoriteFoods : foodToSearch}).sort({name:"asc"}).limit(2).select("-age").exec((err,data)=>{
    if(err) return console.error(err)
    done(err,data)
  })

};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
