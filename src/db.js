import React from "react";
import { useState } from "react";
import { useEffect } from "react";

function FetchData() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .them((response) => response.json())
      .then((data) => setRecords(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div>
      <table>
        <ul>
          {records.map((list, index) => (
            <li key={index}>
              {list.id} | {list.title}
            </li>
          ))}
        </ul>
      </table>
    </div>
  );
}

export default FetchData;
