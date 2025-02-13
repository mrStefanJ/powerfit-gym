import { useState } from "react";

const useImageUpload = () => {
  const [image, setImage] = useState<string | null>(null);
  const [errorImage, setErrorImage] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const maxSize = 2 * 1024 * 1024;

      if (file.size > maxSize) {
        setErrorImage("File size exceeds 2MB. Please upload a smaller file.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");
          if(ctx) {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img,0,0);
            const imagePng= canvas.toDataURL("image/png");
            setImage(imagePng);
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  return { image, errorImage, handleImageChange };
};

export default useImageUpload;
