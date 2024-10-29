import ImageSlider from '@/components/ImageSlider'
import BusinessCategory from '@/components/businessCategorys';
import CategoryHorizontal from '@/components/categoryHorizontal';
import ProductCard from '@/components/productCards';
import bannerOne from '@/images/banner2-unwomen.jpg'
import bannerTwo from '@/images/unwomen-banner1.jpg'

export default function HomeScreen() {
  const images = [
    bannerOne,
    bannerTwo
  ];

  return (
    <div className="min-h-screen bg-gray-50 my-4">
      {/* Slider Banner Section */}
      <ImageSlider images={images} />

      {/* Business Category Section */}
      <BusinessCategory />

      {/* Category Section */}
      <CategoryHorizontal />

      {/* Product Listing Section */}
      <section className="">
        <ProductCard />
      </section>
    </div>
  )
}
