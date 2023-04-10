import { useEffect, useState } from "react";

function App() {
  const [items, setItems] = useState([]);

  const [searchCountry, setSearchCountry] = useState("");

  const [filterParam, setFilterParam] = useState(["All"]);

  const fetchCountriesData = () => {
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setItems(data);
      });
  };

  useEffect(() => {
    fetchCountriesData();
  }, []);

  function handleChange(event) {
    setSearchCountry(event.target.value);
  }

  function handleFilter(event) {
    setFilterParam(event.target.value);
    setSearchCountry("");
  }

  function search(items) {
    return items.filter((item) => {
      if (item.region === filterParam) {
        if (
          item.name.official.toLowerCase().includes(searchCountry.toLowerCase())
        ) {
          return item;
        }
      } else if (filterParam === "All") {
        if (
          item.name.official.toLowerCase().includes(searchCountry.toLowerCase())
        ) {
          return item;
        }
      }
      //
    });
  }

  return (
    <>
      <h1>Countries app</h1>
      <div className="search">
        <input
          placeholder="Search for a country..."
          onChange={handleChange}
          value={searchCountry}
        ></input>

        <select onChange={handleFilter}>
          <option value="All">Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">America</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>

      <div>
        {items.length > 0 && (
          <ul>
            {search(items).map((item) => (
              <li key={item.cca2}>{item.name.official}</li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

export default App;
