// import React, { useEffect, useState } from "react";
// // import Product from "../db";

// const DataDisplay = () => {
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from MongoDB
//         const fetchedProducts = await Product.find({});
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Error fetching data from MongoDB:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <div>
//       <h2>Products from MongoDB</h2>
//       {products.map((product) => (
//         <div key={product._id}>
//           <h3>{product.title}</h3>
//           <p>Price: ${product.price}</p>
//           <p>Category: {product.category}</p>
//           <p>
//             Rating: {product.rating.rate} ({product.rating.count} reviews)
//           </p>
//           <img src={product.image} alt={product.title} />
//           <p>{product.description}</p>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default DataDisplay;
