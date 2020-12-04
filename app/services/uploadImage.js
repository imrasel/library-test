const fs = require("fs");
const mongoose = require('mongoose');

module.exports.uploadImage = (file, dir) => {
  let url = '';
  const base64Data = new Buffer.from(
    file.replace(/^data:image\/\w+;base64,/, ''),
    'base64'
  );
  const type = file.split(';')[0].split('/')[1];
  url = mongoose.mongo.ObjectId() + Date.now().toString() + '.' + type;
  
  let fullDir = './uploads' + dir;
  if (!fs.existsSync(fullDir)) {
    fs.mkdirSync(fullDir, { recursive: true });
  }
  fs.writeFile( fullDir + '/' + url, base64Data, 'base64', function(err) {
    console.log(err);
  });

  return dir + '/' + url;
};