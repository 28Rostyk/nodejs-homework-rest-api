const Jimp = require("jimp");

const resizeFile = async (req, res, next) => {
  const { path: tempUpload } = req.file;

  Jimp.read(tempUpload)
    .then((image) => {
      return image.resize(250, 250).write(tempUpload);
    })
    .then(() => {
      next();
    })
    .catch((error) => {
      next(error);
    });
};

// const resizeFile = async (req, res, next) => {
//   const { path: oldPathFile } = req.file;
//   // console.log(oldPathFile);
//   const image = await jimp.read(oldPathFile);

//   await image.resize(250, 250);
//   console.log(image);
//   await image.writeAsync(oldPathFile);

//   next();
// };
module.exports = resizeFile;
