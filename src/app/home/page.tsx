import ImageSlider from '@/components/ImageSlider'
import CategoryHorizontal from '@/components/categoryHorizontal';
import Footer from '@/components/footer';
import ProductCard from '@/components/productCards';

export default function HomeScreen() {

  const images = [
    "https://cached.imagescaler.hbpl.co.uk/resize/scaleHeight/815/cached.offlinehbpl.hbpl.co.uk/news/OMC/5women.jpg",
    "https://africaexpo2020dubai.au.int/sites/default/files/styles/default/public/images/2021-03/african-woman.jpg?itok=84ORFocB",
    "https://i2.wp.com/commonwealthbc.com/wp-content/uploads/2021/03/iStock-1151111572.jpg?fit=1360%2C770",
  ];


  return (
    <div className="min-h-screen bg-gray-50 my-4">
      {/* Slider Banner Section */}
        <ImageSlider images={images} />

      {/* Category Section */}
        <CategoryHorizontal />

      {/* Product Listing Section */}
      <section className="">
        <ProductCard />
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  )
}
