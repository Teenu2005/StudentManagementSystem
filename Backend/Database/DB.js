const mongoose=require('mongoose')



mongoose.set('strictQuery', false);


const connectDB = async ()=>  {
    try{
      await mongoose.connect(process.env.DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
      
      console.log("db connected ")
    }
    catch(err){
      console.error('vankam da mapala db la irruinthu',err)
    }
  }
module.exports= connectDB;