import Sidebar from "@/components/filterSideBar";
import ProductCard from "@/components/productCards";
import ProductCardBusinessCategory from "@/components/productCardsBusinessCategory";
import ProductCardCategory from "@/components/ProductCardsCategory";

interface ShopProps {
  action: string; // Add action prop if needed
  category: string | string[]; // Ensure category can be string or string[]
  size: number;
}

export default function Shop({ action, category }: ShopProps) {
  const filterOptions = (action: string) => { // Explicitly define the type of action
    switch (action) {
      case 'category':
        return <ProductCardCategory category={category} size={3} />;
      case 'business':
        return <ProductCardBusinessCategory category={category} size={3} />;
      
      default:
        return <ProductCard size={3} />;
    }
  }

  console.log(`Category:  ${category}`);
  
  return (
    <div>
      <div className="flex mt-8 px-8">
        <Sidebar currentCategory={category} />
        <div className="ml-4">
          {
              filterOptions(action)
          }
        </div>
      </div>
    </div>
  );
}
