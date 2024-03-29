/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useState, useEffect } from "react";
import axios from 'axios';
import Image from "next/image";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatPrice = (price) => {
    // Utiliser la méthode toLocaleString sans le style currency
    return price.toLocaleString('fr-FR', { 
      // minimumFractionDigits: 2, 
      // maximumFractionDigits: 2, 
      useGrouping: true, // Activer le séparateur de milliers
    });
  };
  

  useEffect(() => {
    axios.get('/api/products').then(res => {
      setProducts(res.data);
      setLoading(false);
    })
  }, []);

  return (
    <>
      <header>
        <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <div className="text-2xl font-bold text-gray-900 sm:text-4xl">
                Welcome Back,{" "}
                <span className="text-green-700">All Products</span>!
              </div>

              <p className="mt-1.5 text-md text-gray-500 max-w-lg">
                Let&rsquo;s create a new product! 🎉
              </p>
            </div>

            <div className="mt-4 flex flex-col gap-4 sm:mt-0 sm:flex-row sm:items-center">
              <Link
                className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-green-700 px-5 py-3 text-green-700 transition hover:bg-green-50 hover:text-green-700 focus:outline-none focus:ring"
                href="/products/new"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>

                <span className="text-md font-medium"> Add Product </span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <hr className="my-1 h-px border-0 bg-gray-300" />

      <div className="mx-auto max-w-screen-2xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8 text-center">
        {
          products.length === 0 ? (<p>No product found</p>) : 
          (<>

      <div className="">
        <table className="w-full border-collapse bg-white text-left text-sm text-gray-500">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Image</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Name</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Description</th>
              <th scope="col" className="px-6 py-4 font-medium text-gray-900">Price</th>              
              <th scope="col" className="px-6 py-4 font-medium text-gray-900"></th>
            </tr>
          </thead>
          {products.map((product, index) =>(
          <tbody className="divide-y divide-gray-100 border-t border-gray-100" key={product._id}>
            <tr>
              <th className="px-6 py-4 font-medium text-gray-900">{index+1}</th>
              <td className="px-6 py-4">
                <div class="relative h-10 w-10">
                <img class="h-full w-full rounded-full object-cover object-center"  src={product.images[0]} alt="frfr" />
                </div>
              </td>
              <td className="px-6 py-4">{product.title}</td>
              <td className="px-6 py-4 truncate max-w-xs">{product.description}</td>
              <td className="px-6 py-4">{formatPrice(product.price)}</td>
              <td className="flex justify-end gap-4 px-6 py-4 font-medium">
                <Link href={'/products/delete/' + product._id} className="text-red-700">Delete</Link>
                <Link href={'/products/edit/' + product._id} className="text-green-700">Edit</Link>
              </td>
            </tr>
              
          </tbody>

          )
          )}
          </table>
        </div>

          </>)
        }
      </div>

    </>
  );
};

export default Products;
