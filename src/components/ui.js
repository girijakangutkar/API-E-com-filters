import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FetchedData.css";
// import { FaHeart } from "react-icons/fa";
// {
/* <FaHeart /> */
// }

// ranger
// const accordions = document.getElementsByClassName("accordion");

// for (let i = 0; i < accordions.length; i++) {
//   accordions[i].onclick = function () {
//     this.classList.toggle("is-open");

//     var content = this.nextElementSibling;
//     if (content.style.maxHeight) {
//       content.style.maxHeight = null;
//     } else {
//       content.style.maxHeight = content.scrollHeight + "px";
//     }
//   };
// }

// const minPriceOutput = document.getElementById("min-price-output");
// const maxPriceOutput = document.getElementById("max-price-output");

// const minpInput = document.getElementById("min-price-value");
// const maxpInput = document.getElementById("max-price-value");

// minpInput.oninput = function () {
//   if (parseInt(minpInput.value) > parseInt(maxpInput.value)) {
//     maxpInput.value = parseInt(minpInput.value) + 1;
//   }
//   minPriceOutput.innerHTML = minpInput.value;
//   maxPriceOutput.innerHTML = maxpInput.value;
// };
// maxpInput.oninput = function () {
//   if (parseInt(minpInput.value) > parseInt(maxpInput.value)) {
//     minpInput.value = parseInt(maxpInput.value) - 1;
//   }
//   minPriceOutput.innerHTML = minpInput.value;
//   maxPriceOutput.innerHTML = maxpInput.value;
// };

export default function FetchedData() {
  const [records, setRecords] = useState([]);
  const [heartStates, setHeartStates] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [selectedRating, setSelectedRating] = useState(0);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setRecords(res.data);
        const initialHeartStates = res.data.reduce((acc, record) => {
          acc[record.id] = false;
          return acc;
        }, {});
        setHeartStates(initialHeartStates);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  const toggleVisibility2 = () => {
    setIsVisible2(!isVisible2);
  };

  const toggleVisibility3 = () => {
    setIsVisible3(!isVisible3);
  };

  const toggleVisibility4 = () => {
    setIsVisible4(!isVisible4);
  };

  const handleRatingChange = (rating) => {
    setSelectedRating(rating);
  };

  const handleMinPriceChange = (event) => {
    setMinPrice(parseFloat(event.target.value));
  };

  const handleMaxPriceChange = (event) => {
    setMaxPrice(parseFloat(event.target.value));
  };

  const toggleHeart = (id) => {
    setHeartStates((prevState) => ({
      ...prevState,
      [id]: !prevState[id],
    }));
  };

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter((cat) => cat !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const filteredRecords = records.filter((record) => {
    if (selectedCategories.length === 0 && selectedRating === 0) {
      return true;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(record.category)
    ) {
      return false;
    }
    if (
      selectedRating > 0 &&
      Math.round(record.rating.rate) !== selectedRating
    ) {
      return false;
    }
    return true;
  });

  const filteredRecords1 = records.filter((record) => {
    if (selectedCategories.length === 0) {
      return true;
    }
    return selectedCategories.includes(record.category);
  });

  const filteredRecords3 = records.filter((record) => {
    if (selectedCategories.length === 0 && selectedRating === 0) {
      return record.price >= minPrice && record.price <= maxPrice;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(record.category)
    ) {
      return false;
    }
    if (
      selectedRating > 0 &&
      Math.round(record.rating.rate) !== selectedRating
    ) {
      return false;
    }
    return record.price >= minPrice && record.price <= maxPrice;
  });

  const uniqueCategories = Array.from(
    new Set(records.map((record) => record.category))
  );
  const categoryCounts = uniqueCategories.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));

  const filteredRecords4 = records.filter((record) => {
    if (selectedCategories.length === 0 && selectedRating === 0) {
      return record.price >= minPrice && record.price <= maxPrice;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(record.category)
    ) {
      return false;
    }
    if (
      selectedRating > 0 &&
      Math.round(record.rating.rate) !== selectedRating
    ) {
      return false;
    }
    return record.price >= minPrice && record.price <= maxPrice;
  });

  return (
    <div>
      <div class="sidebar">
        {/* related items */}
        <div class="dropdown-check-list" tabindex="100">
          <a class="anchor" onClick={toggleVisibility3}>
            Related Items
          </a>
          {isVisible3 && (
            <ul class="animate" className={isVisible3 ? "visible3" : ""}>
              {categoryCounts.map(({ category, count }) => (
                <li key={category}>
                  <input
                    type="checkbox"
                    value={category}
                    onChange={(e) => handleCategoryChange(e.target.value)}
                  />
                  {category} ({count})
                </li>
              ))}
            </ul>
          )}
        </div>
        <br></br>
        {/* brand */}
        <div class="dropdown-check-list" tabindex="100">
          <a class="anchor" onClick={toggleVisibility}>
            Brand
          </a>
          {isVisible && (
            <ul class="items" className={isVisible ? "visible" : ""}>
              <li>
                <input type="checkbox" />
                Mercedes{" "}
              </li>
              <li>
                <input type="checkbox" />
                Honda
              </li>
              <li>
                <input type="checkbox" />
                Tata{" "}
              </li>
              <li>
                <input type="checkbox" />
                Suzuki{" "}
              </li>
              <li>
                <input type="checkbox" />
                Maruti{" "}
              </li>
              <li>
                <input type="checkbox" />
                Toyota{" "}
              </li>
              <li>
                <input type="checkbox" />
                BMW
              </li>
            </ul>
          )}
        </div>
        <br></br>
        {/* slider */}
        <div class="container">
          <div class="slider">
            <p>Min Price</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={minPrice}
              onChange={handleMinPriceChange}
            />
            <p>Max Price</p>
            <input
              type="range"
              min="0"
              max="1000"
              value={maxPrice}
              onChange={handleMaxPriceChange}
            />
          </div>
          {/* <div>
           
            {filteredRecords4.map((r, i) => (
              <div id="details" key={i}>
                <h6>{r.title}</h6>
                <h6>{r.price}</h6>
               
              </div>
            ))}
          </div> */}
        </div>
        {/* price */}
        {/* <div class="pwyw-container">
          <label id="pwyw-label">Your Price: ${price}</label>
          <input
            id="pwyw-input"
            type="number"
            value={price}
            onChange={handlePriceChange}
            step="0.1"
            min="0"
          />
        </div> */}
        <br></br>
        {/* size */}
        <div class="dropdown-check-list" tabindex="100">
          <a class="anchor" onClick={toggleVisibility4}>
            Size
          </a>
          {isVisible4 && (
            <ul class="animate" className={isVisible4 ? "visible4" : ""}>
              <li class="animate" type="checkbox">
                <input type="checkbox" />
                XS<i class="fa fa-code float-right"></i>
              </li>
              <li class="animate">
                <input type="checkbox" />L
                <i class="fa fa-arrows-alt float-right"></i>
              </li>
              <li class="animate">
                <input type="checkbox" />
                xl<i class="fa fa-cog float-right"></i>
              </li>
            </ul>
          )}
        </div>
        <br></br>
        {/* Rating */}
        <div id="list1" class="dropdown-check-list" tabindex="100">
          <a class="anchor" onClick={toggleVisibility2}>
            Ratings
          </a>
          {isVisible2 && (
            <ul class="items" className={isVisible2 ? "visible2" : ""}>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRating === 5}
                  onChange={() => handleRatingChange(5)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRating === 4}
                  onChange={() => handleRatingChange(4)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRating === 3}
                  onChange={() => handleRatingChange(3)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRating === 2}
                  onChange={() => handleRatingChange(2)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRating === 1}
                  onChange={() => handleRatingChange(1)}
                />
                <span id="star">&#9733;</span>
              </li>
            </ul>
          )}
        </div>
        {/* end */}
      </div>

      {filteredRecords4.map((r, i) => (
        <div id="details">
          <div class="row">
            <img src={r.image} alt="not found"></img>
            <div id="mid">
              <h3 key={i}>{r.title}</h3>
              <p>
                {Array(4)
                  .fill()
                  .map((_, index) => {
                    const fullStars = Math.floor(r.rating.rate);
                    const hasHalfStar =
                      r.rating.rate % 1 !== 0 &&
                      index === Math.floor(r.rating.rate);
                    const isFullStar = index < fullStars;

                    return (
                      <span
                        key={index}
                        className={`star ${isFullStar ? "filled" : ""} ${
                          hasHalfStar ? "half-filled" : ""
                        }`}
                        dangerouslySetInnerHTML={{
                          __html: hasHalfStar ? "&#9733;&#9734;" : "&#9733;",
                        }}
                      />
                    );
                  })}
                {r.rating.rate}&nbsp;&nbsp;&nbsp; {r.rating.count} Orders
              </p>

              <p>{r.description}</p>
              <h3 class="pr">
                price<br></br>$ {r.price}
              </h3>
              <button id="btn">Buy this</button>
              <button id="hrt" onClick={() => toggleHeart(r.id)}>
                {heartStates[r.id] ? (
                  <span className="heart-filled">&#9829;</span>
                ) : (
                  <span className="heart-empty">&#9825;</span>
                )}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// {
/* <table>
<thead>
  <tr>
    <th>Id</th>
    <th>title</th>
  </tr>
</thead>
<tbody>
  <tr key={i}>
    <td>{r.id}</td>
    <td>{r.title}</td>
  </tr>
</tbody>
</table> */
// }
