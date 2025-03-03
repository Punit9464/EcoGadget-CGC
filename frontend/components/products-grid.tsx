'use client'

import { motion } from 'framer-motion'
import { ProductCard } from './product-card'
import { ChangeEvent, useEffect, useState } from 'react'
import axios from 'axios';

type ProductType = {
  _id: string
  price: number
  productName: string
  image: string
  rating: number
  condition: string
  warranty: number
};


export function ProductsGrid() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchText, setSearchText] = useState("");

  const handleSearch = async () => {
    const result = await axios.get(`https://ecogadget.onrender.com/products/vectorSearch?q=${searchText}`);

    const response = result.data.products;

    setProducts(() => {
      return response;
    });
  }

  const handleChange = async(e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    setSearchText(() => {
      return e.target.value;
    });
  };


  useEffect(()=>{
   const fetchProducts = async() => {
        const productsList = await axios.get('https://ecogadget.onrender.com/products');
        setProducts(productsList.data.products);
        setLoading(false);
    }
    fetchProducts();
  }, []);
  return (
    <div className='flex flex-col'>
    
    <div className="mb-10 ml-10">
          <input
            type="search"
            name='searchText'
            value={searchText}
            onChange={handleChange}
            placeholder="Tell us how you we can help you !"
            className="px-4 py-1 w-[500px]  border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
          <button onClick={handleSearch} className="px-4 ml-1 py-[0.40rem] bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500">
            Search
          </button>
        </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5">
      {!loading && products.map((product: ProductType, index) => (
        <motion.div
          key={product._id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProductCard {...product} />
        </motion.div>
      ))}
    </div>
    </div>
  )
}

