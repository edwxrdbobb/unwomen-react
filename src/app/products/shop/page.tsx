"use client";

import Sidebar from "@/components/filterSideBar";
import ProductCard from "@/components/productCards";
import ProductCardBusinessCategory from "@/components/productCardsBusinessCategory";
import ProductCardCategory from "@/components/ProductCardsCategory";

// Define allowed action types
type Action = "category" | "business" | "default";

// Define the props for the Shop component
interface ShopProps {
  action: Action;
  category: string | string[];
  size?: number;
}

// Define a simpler structure for ShopProps during type validation
type ValidatedShopProps = {
  [x: string]: never; // Ensure no additional properties
};

export default function Shop(props: ValidatedShopProps & ShopProps) {
  const { action, category, size = 3 } = props;

  // Filter options based on the action type
  const filterOptions = (action: Action) => {
    switch (action) {
      case "category":
        return <ProductCardCategory category={category} size={size} />;
      case "business":
        return <ProductCardBusinessCategory category={Array.isArray(category) ? category[0] : category} size={2} />; // Ensure category is a string
      default:
        return <ProductCard category={Array.isArray(category) ? category[0] : category} size={size} />; // Ensure category is a string
    }
  };

  // Convert category to a string if it's an array
  const categoryString = Array.isArray(category) ? category.join(", ") : category;

  console.log(`Category: ${categoryString}`);

  return (
    <div>
      <div className="flex mt-8 px-8">
        {/* Sidebar with the current category */}
        <Sidebar currentCategory={category} />
        <div className="ml-4">
          {/* Render filter options based on the action */}
          {filterOptions(action)}
        </div>
      </div>
    </div>
  );
}
