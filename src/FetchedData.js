import axios from "axios";
import React, { useEffect, useState } from "react";
import "./FetchedData.css";

export default function FetchedData() {
  const [records, setRecords] = useState([]);
  const [heartStates, setHeartStates] = useState({});
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [isVisible3, setIsVisible3] = useState(false);
  const [isVisible4, setIsVisible4] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  const [formattedMinPrice, setFormattedMinPrice] = useState("0");
  const [formattedMaxPrice, setFormattedMaxPrice] = useState("1000");

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
    setSelectedRatings((prevRatings) => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter((r) => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const handleMinPriceChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setMinPrice(newValue);
    setFormattedMinPrice(newValue.toFixed(2));
  };

  const handleMaxPriceChange = (event) => {
    const newValue = parseFloat(event.target.value);
    setMaxPrice(newValue);
    setFormattedMaxPrice(newValue.toFixed(2));
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

  const uniqueCategories = Array.from(
    new Set(records.map((record) => record.category))
  );
  const categoryCounts = uniqueCategories.map((category) => ({
    category,
    count: records.filter((record) => record.category === category).length,
  }));

  const filteredRecords4 = records.filter((record) => {
    const wholeRating = Math.floor(record.rating.rate);

    if (selectedCategories.length === 0 && selectedRatings.length === 0) {
      return record.price >= minPrice && record.price <= maxPrice;
    }
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(record.category)
    ) {
      return false;
    }
    if (selectedRatings.length > 0 && !selectedRatings.includes(wholeRating)) {
      return false;
    }
    return record.price >= minPrice && record.price <= maxPrice;
  });
  // const filteredRecords4 = records.filter((record) => {
  //   if (selectedCategories.length === 0 && selectedRatings.length === 0) {
  //     return record.price >= minPrice && record.price <= maxPrice;
  //   }
  //   if (
  //     selectedCategories.length > 0 &&
  //     !selectedCategories.includes(record.category)
  //   ) {
  //     return false;
  //   }
  //   if (
  //     selectedRatings.length > 0 &&
  //     !selectedRatings.includes(Math.round(record.rating.rate))
  //   ) {
  //     return false;
  //   }
  //   return record.price >= minPrice && record.price <= maxPrice;
  // });

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
                Nissan{" "}
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
        {/* range slider */}
        <div className="slider">
          <h3>Price</h3>
          <input
            type="range"
            min="0"
            max="1000"
            id="min"
            value={minPrice}
            onChange={handleMinPriceChange}
          />
          <span id="rs1">Min: {formattedMinPrice}</span>
          <br></br>
          <input
            type="range"
            min="0"
            max="1000"
            id="max"
            value={maxPrice}
            onChange={handleMaxPriceChange}
          />
          <span id="rs2">Max: {formattedMaxPrice}</span>
        </div>
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
                XL<i class="fa fa-cog float-right"></i>
              </li>
            </ul>
          )}
        </div>
        <br></br>
        {/* Rating */}
        <div class="dropdown-check-list" tabindex="100">
          <a class="anchor" onClick={toggleVisibility2}>
            Ratings
          </a>
          {isVisible2 && (
            <ul class="items" className={isVisible2 ? "visible2" : ""}>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(5)}
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
                  checked={selectedRatings.includes(4)}
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
                  checked={selectedRatings.includes(3)}
                  onChange={() => handleRatingChange(3)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(2)}
                  onChange={() => handleRatingChange(2)}
                />
                <span id="star">&#9733;</span>
                <span id="star">&#9733;</span>
              </li>
              <li>
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(1)}
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
              <h2 key={i}>{r.title}</h2>
              <div>
                {/* Render stars based on rating */}
                {Array(5)
                  .fill()
                  .map((_, index) => {
                    const isFullStar = index < Math.floor(r.rating.rate);
                    const hasHalfStar =
                      r.rating.rate % 1 !== 0 &&
                      index === Math.floor(r.rating.rate);

                    return (
                      <span
                        key={index}
                        className={`star ${isFullStar ? "filled" : ""} ${
                          hasHalfStar ? "half-filled" : ""
                        }`}
                      >
                        &#9733;
                      </span>
                    );
                  })}
                &nbsp;&nbsp;&nbsp;{r.rating.rate} &nbsp;&nbsp;&nbsp;
                {r.rating.count} Orders
              </div>
              <p>{r.description}</p>
              <h3 class="pr">$ {r.price}</h3>
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
