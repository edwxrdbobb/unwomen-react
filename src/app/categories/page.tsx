import BusinessCategory from "@/components/businessCategorys";
import CategoryHorizontal from "@/components/categoryHorizontal";


export default function Categories(){


    return(
        <>
            <div className="my-8 mx-4 p-8">
                <BusinessCategory />
            </div>

            <div className="my-8 mx-4 p-8">
                <CategoryHorizontal />
            </div>
        </>
    )
}