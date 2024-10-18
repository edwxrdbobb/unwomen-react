import Sidebar from "@/components/filterSideBar";
import ProductCard from "@/components/productCard";
import {Product} from '@/types/products';

const products: Product[] = [
  {
    image: '/macbook-pro.jpg',
    name: 'MacBook Pro 2022 M2',
    description: 'Latest M2 MacBook with sleek design.',
    price: 23000, // Change this to a number
  },
  {
    image: '/macbook-pro-2019.jpg',
    name: 'MacBook Pro 2019 13"',
    description: 'MacBook with 13" Retina display.',
    price: 18000, // Change this to a number
  },
  // Add more product data as needed
];

export default function Shop() {
  return (
    <div>
      <div className="flex mt-8 px-8">
        <Sidebar />
        <div className="flex-1 grid grid-cols-3 gap-6">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
