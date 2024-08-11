const IsDefaultImage = () => {
   if (blobURL) {
      return false;
   }
   return imageURL.includes("default.png");
}

export default IsDefaultImage;