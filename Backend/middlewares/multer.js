const multer = require('multer');
const path = require('path');
const fs = require('fs');

const uploadDir = path.join(__dirname, 'uploads');

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); 
    },
    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname); 
        cb(null, Date.now() + ext); 
    }
});

const uploads = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024, 
    },
    fileFilter: (req, file, cb) => {
        const fileTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (fileTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPG, PNG, and JPEG are allowed.'));
        }
    },
});

module.exports = uploads;