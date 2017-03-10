const s3 = require('./s3');
const multer = require('multer');
const multerS3 = require('multer-s3');
const uuid = require('uuid'); //creates long key for file name of photo

module.exports = multer({
  storage: multerS3({
    s3,
    bucket: 'wdilondonbucket',
    key(req, file, next) {
      const ext = file.mimetype.replace('image/', ''); // take file mime ttype and replace 'image/' with nothing o we can now use the extention.
      const filename = `${uuid.v4()}.${ext}`;  //function that creaes a random file name using uuid app.
      next(null, filename);   //pass in an error if we have one then, pass in the filename
    },
    contentType: multerS3.AUTO_CONTENT_TYPE //content type is how we store it online,  multer s3 is saying that we should actually use the 'AUTO_CONTENT_TYPE' instead of the default.
  }),

  fileFilter(req, file, next) {
    const whitelist = ['image/png', 'image/jpeg', 'image/gif'];
    next(null, whitelist.includes(file.mimetype));
  },
  limits: {
    fileSize: 1024 * 1024 * 2 //=2mb, ie 1024bytes*1024bytes = 1024kb = 1mb
  }

  //a white list array is something that allows things throw, a black list allows nothing except some things.  so we ant to allow pictures of a certain size.

  //pass in the call back fuction, error is none, boolean value as true, we let it in, so if it is in the white list then we will let it in.
});


//key with amazon means file
//ext = extension

//all files have 'mime type', tells brownser what type of file it is and how to open it and convert it back to an image.  form of: image/jpeg, png, gif, mp3, html,eetc
