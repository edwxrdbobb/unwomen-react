"use client";

import React, { useEffect, useState } from 'react';

interface ProductImagesProps {
  images: Array<{
    productImageOne: string;
    productImageTwo: string;
    productImageThree: string;
    productImageFour: string;
    productImageFive: string;
    productImageSix: string;

  }>;

}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  const [productImages, setProductImages] = useState<string[]>([]); // Define the type as string[]

  useEffect(() => {

          setProductImages([
              `${images[0].productImageOne}`,
              `${images[0].productImageTwo}`,
              `${images[0].productImageThree}`,
              `${images[0].productImageFour}`,
              `${images[0].productImageFive}`,
              `${images[0].productImageSix}`,
          ].filter(Boolean) as string[]); // Filter out any null or undefined values
      
  }, [images]);


  console.log(`images: ${productImages}`);
  
  return (
    <div>
      {/* Main Product Image */}
      <div className="mb-4">
        <img src={productImages[0]} alt="Main Product" className="w-full h-auto rounded-lg" />
      </div>

      {/* Thumbnail Selection Below */}
      <div className="flex space-x-4">
      {productImages.map((img, idx) => (
        img === 'null' ? 
            null : 
            <img key={idx} src={img} alt={`Thumbnail2 ${idx} url ${img}`} className="w-20 h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
