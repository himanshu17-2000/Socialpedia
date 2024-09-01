import { v2 as cloudinary } from "cloudinary";

const cloudinaryConnection = () => {
  cloudinary.config({
    cloud_name: "dehbgpj5k",
    api_key: "827535572755456",
    api_secret: "oBdiMyUowzxAsBfOm1zOKQm9Axk",
  });
  console.log("Cloundinary connection estabhlished");
};

export default cloudinaryConnection;

