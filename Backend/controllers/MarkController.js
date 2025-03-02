const Mark = require('../models/Mark')
const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');


// Configure Multer for file upload
const upload = multer({ dest: 'uploads/' });

// Function to process CSV file
const processCSV = async (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
};

// Function to process Excel file
const processExcel = async (filePath) => {
  const workbook = xlsx.readFile(filePath);
  const sheetName = workbook.SheetNames[0];
  const sheetData = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
  return sheetData;
};

// Controller function for bulk upload
exports.bulkUploadMarks = async (req, res) => {
  try {
    if (!req.file) {
      console.log(req.file)
      return res.status(400).json({ message: "Please upload a file." });
    }

    const filePath = req.file.path;
    let extractedData = [];

    // Determine file type (CSV or Excel)
    if (req.file.mimetype === 'text/csv') {
      extractedData = await processCSV(filePath);
    } else if (
      req.file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
      req.file.mimetype === 'application/vnd.ms-excel'
    ) {
      extractedData = await processExcel(filePath);
    } else {
      return res.status(400).json({ message: "Unsupported file format. Upload CSV or Excel only." });
    }

    // Convert extracted data into correct format
    const formattedData = extractedData.map(row => ({
      sem_num: Number(row.sem_num),
      studentId: Number(row.studentId),
      subject: [
        {
          name: row.subject_name,
          code: row.subject_code,
          max_mark: Number(row.max_mark),
          ia_mark: Number(row.ia_mark),
          ue_mark: Number(row.ue_mark),
          total_mark: Number(row.total_mark)
        }
      ]
    }));

    // Insert into MongoDB
    const insertedRecords = await Mark.insertMany(formattedData, { ordered: false });

    // Delete file after processing
    fs.unlinkSync(filePath);

    return res.status(201).json({ message: "Bulk upload successful", data: insertedRecords });
  } catch (error) {
    console.error("Error in bulk upload:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};


// sem_num,studentId,subject_name,subject_code,max_mark,ia_mark,ue_mark,total_mark
// 1,12344,co,CSCO1,100,25,75,100
// 1,12344,tamil,CSTA1,100,20,80,100
// 1,12345,maths,CSMA1,100,30,70,100
// 1,12345,english,CSEN1,100,20,80,100





exports.addMark=async(req,res)=>{
    const {sem_num,studentId,subject}=req.body
    const alreadyIn = await Mark.findOne({"studentId":studentId,"sem_num":sem_num})
    if(alreadyIn)
    {
        return res.status(400).send({Error:"record already exit"})
    }
    try{
        const marks=new Mark({
            sem_num,studentId,subject
        })
        await marks.save()
        res.status(200).json(marks)
    }catch(err){
        res.status(500).send({error:err})
    }
}
exports.getAllMark=async(req,res)=>{
    const studentId =req.params.id
    try{
        const result=await Mark.find({studentId:studentId})
        console.log(result)
        res.status(200).json(result)
    }catch(err){
        res.status(500).send({error:err})
    }
}
// exports.getbysub=async (req, res) => {
//   const { subjectCode } = req.params;

//   try {
//     const marks = await Mark.find({
//       "subject.code": subjectCode
//     });
//     console.log(marks)
//     if (marks.length === 0) {
//       return res.status(404).json({ message: "No data found for the given subject code." });
//     }

//     // Prepare the data in the desired format (if necessary)
//     const formattedMarks = marks.map((markEntry) => {
//       const studentMarks = markEntry.subject.filter(subject => subject.code === subjectCode);
//       return {
//         studentId: markEntry.studentId,
//         sem_num: markEntry.sem_num,
//         subjects: studentMarks
//       };
//     });

//     // Return the fetched marks data
//     return res.json(formattedMarks);

//   } catch (error) {
//     console.error("Error fetching marks data:", error);
//     return res.status(500).json({ message: "Error fetching marks data." });
//   }
// }
exports.singleMark=async(req,res)=>{
    const studentId =req.params.id
    const sem_num =req.params.semid
    try{
        const result=await Mark.find({"studentId":studentId,"sem_num":sem_num})
        res.status(200).json(result)
    }catch(err){
        res.status(500).send({error:err})
    }
}