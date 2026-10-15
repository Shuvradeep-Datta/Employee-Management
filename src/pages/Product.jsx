import { memo } from "react";

const Product = memo(function Product({ name, price, image, category }) {
    console.log("Product Rendered...");
    
    return (
        <div className="max-w-sm rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
            {/* Product Image */}
            <div className="relative h-48 overflow-hidden bg-gray-100">
                <img 
                    src={image || "https://via.placeholder.com/300"} 
                    alt={name} 
                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-300"
                />
                {category && (
                    <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs font-semibold px-2.5 py-1 rounded-full shadow">
                        {category}
                    </span>
                )}
            </div>

            {/* Product Info */}
            <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 truncate mb-1" title={name}>
                    {name}
                </h2>
                <div className="flex items-center justify-between mt-4">
                    <div>
                        <span className="text-xs text-gray-400 block">Price</span>
                        <p className="text-2xl font-black text-gray-900">₹{price}</p>
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-xl transition-colors duration-200 shadow-md hover:shadow-lg active:scale-95">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
});

export default Product;