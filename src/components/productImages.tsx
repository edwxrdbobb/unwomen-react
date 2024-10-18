import React from 'react';

interface ProductImagesProps {
  images: string[];
}

const ProductImages: React.FC<ProductImagesProps> = ({ images }) => {
  return (
    <div>
      {/* Main Product Image */}
      <div className="mb-4">
        <img src={images[0]} alt="Main Product" className="w-full h-auto rounded-lg" />
      </div>

      {/* Thumbnail Selection Below */}
      <div className="flex space-x-4">
        {images.slice(1).map((img, idx) => (
          <img key={idx} src={img} alt={`Thumbnail ${idx}`} className="w-20 h-20 rounded-lg" />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
