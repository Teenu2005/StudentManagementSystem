const mongoose = require('mongoose');

const MarkSchema = new mongoose.Schema({
    sem_num:{
     type:Number,
     required:true
    },   
    studentId:{
        type:Number,
        ref:"student",
        required:true,
        trim:true
    },
    subject: [
      {
        name: {
            type:String,
            required:true,
            trim:true
        },
        code: {
            type:String,
            required:true,
            trim:true
        },
        max_mark: {
            type:Number,
            required:true,
            trim:true
        },
        ia_mark: {
            type:Number,
            required:true,
            trim:true
        },
        ue_mark: {
            type:Number,
            required:true,
            trim:true
        },
        total_mark: {
            type:Number,
            required:true,
            trim:true
        },
        _id:false
      },
    ],
  });


module.exports = mongoose.model('Mark', MarkSchema);
