const bcrypt = require('bcrypt');
const  cle= async ()=>{
const password = 'teenu';
const hashedPassword = '$2b$10$8AtrNdxrTn4R86VmXgW6TOqz/xoaexQhbtgSD6yZykXim8PMHVWoK'
const isMatch = await bcrypt.compare(password, hashedPassword);

console.log('Hashed Password:', hashedPassword);
console.log('Password match:', isMatch);
}
cle();