
const CategoryHorizontal = () => {

    return(
        <div>
            <section className="py-8 px-4">
                    <h3 className="text-2xl font-semibold mb-6">Search by category</h3>
                    <div className="flex flex-wrap gap-4">
                    <button className="bg-yellow-400 px-4 py-2 rounded-full">All</button>
                    {/* Add more category buttons like the one below */}
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-black">Food & Agriculture</button>
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-black">Clothing & Fashion</button>
                    <button className="bg-gray-200 px-4 py-2 rounded-full text-black">Health & Beauty</button>
                    {/* Add the rest as needed */}
                    </div>
            </section>
        </div>
    )
}

export default CategoryHorizontal;