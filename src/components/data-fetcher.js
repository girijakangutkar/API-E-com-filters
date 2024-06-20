// import React, { useEffect } from "react";
// import axios from "axios";
// // import Product from "../db";

// const DataFetcher = () => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch data from the API
//         const response = await axios.get("https://fakestoreapi.com/products");
//         const data = response.data;

//         // Store the fetched data in MongoDB
//         await Promise.all(
//           data.map(async (product) => {
//             const newProduct = new Product(product);
//             await newProduct.save();
//           })
//         );

//         console.log("Data fetched and stored in MongoDB");
//       } catch (error) {
//         console.error("Error fetching or storing data:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   return <div>Data fetched and stored in MongoDB.</div>;
// };

// export default DataFetcher;
