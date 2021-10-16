require("dotenv").config();
//libraries
import express from "express";
import AWS from "aws-sdk";
import multer from "multer";

//database model
import { ImageModel } from "../../database/allmodels";

//utilites
import { s3Upload } from "../../Utilities/AWS/s3";

const Router = express.Router();

//Multer config
const storage = multer.memoryStorage(); //allow multer to upload all images on your server's RAM
const upload = multer({ storage }); //now upload images from RAM of the server to AWS

/*
Route           /
Description     Uploading given image to S3 bucket, and then saving the file to mongodb
Params          None
Access          Public  
Method          POST
*/
//upload.single("file")->I want to upload an image
Router.post("/", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;
    //S3 bucket options
    const bucketOptions = {
      Bucket: "fullstack-zomato-clone",
      Key: file.originalname,
      Body: file.buffer, //body of request contains like url,the file passed
      ContentType: file.mimetype, //.jpeg, .png, .jpg
      ACL: "public-read", //access control list
    };

    const uploadImage = await s3Upload(bucketOptions);
    return res.status(200).json({ uploadImage });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

export default Router;
//we upload images to our server's RAM and from there the images is being uploaded to AWS and from AWS we fetch back the image
