const Student = require("../models/Studentmodels");
const csv = require("csv-parser");
const multer = require("multer");
const fs = require("fs");

const uploads = multer({ dest: "uploads/" });


const bulkUpload = async (req, res) => {
  if (!req.file) return res.status(400).json({ message: "File is required" });
  console.log(req.file)
  const students = [];
  const filePath = req.file.path;

  fs.createReadStream(filePath)
    .pipe(csv())
    .on("data", (row) => {
      students.push({
        department: { dep_id: row.dep_id, dep_name: row.dep_name },
        student_num: {
          aadhaar_number: row.aadhaar_number,
          umis_number: row.umis_number,
          em_number: row.emis_number,
          community_id: row.community_id,
          income_id: row.income_id,
          first_graduate_id: row.first_graduate_id
        },
        parents: { father_name: row.father_name, mother_name: row.mother_name, annualIncome: row.annualIncome },
        info: { religion: row.religion, community: row.community },
        contact: { email: row.email, phone1: row.phone1, phone2: row.phone2 },
        address: { street: row.street, city: row.city, zipcode: row.zipcode },
        name: row.name,
        batch: row.batch,
        dob: row.dob,
        _id: row.regno,
        image: row.image
      });
    })
    .on("end", async () => {
      try {
        await Student.insertMany(students);
        console.log(students)
        fs.unlinkSync(filePath); 
        res.status(201).json({ message: "Bulk upload successful" });
      } catch (error) {
        res.status(500).json({ message: "Error saving students", error });
      }
    })
    .on("error", (err) => {
      res.status(500).json({ message: "File processing error", error: err });
    });
};
module.exports = { bulkUpload, uploads };




// dep_id,dep_name,aadhaar_number,umis_number,emis_number,community_id,income_id,first_graduate_id,father_name,mother_name,annualIncome,religion,community,email,phone1,phone2,street,city,zipcode,name,batch,dob,regno,image
// 01CS,Computer Science,121345377,939745865,1214565,TN-23453351424,TN-23453551424,TN-23433351424,Sakamo,Unknown,72000,Hatakae,Hatakae-shinobe,Hataka@example.com,9848425463,8556878343,123 Hokaga Street,Leaf village,233563,Kakashi,2024-27,15-09-2003,


{/*

const StudentMark = require('../models/StudentMark');
const multer = require('multer');
const csv = require('csv-parser');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// Configure Multer for file upload
// const upload = multer({ dest: 'uploads/' });

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
const bulkUploadMarks = async (req, res) => {
  try {
    if (!req.file) {
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
    const insertedRecords = await StudentMark.insertMany(formattedData, { ordered: false });

    // Delete file after processing
    fs.unlinkSync(filePath);

    return res.status(201).json({ message: "Bulk upload successful", data: insertedRecords });
  } catch (error) {
    console.error("Error in bulk upload:", error);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { bulkUploadMarks, upload };

// sem_num,studentId,subject_name,subject_code,max_mark,ia_mark,ue_mark,total_mark
// 1,12344,co,CSCO1,100,25,75,100
// 1,12344,tamil,CSTA1,100,20,80,100
// 1,12345,maths,CSMA1,100,30,70,100
// 1,12345,english,CSEN1,100,20,80,100
 */}