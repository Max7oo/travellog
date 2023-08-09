import { useState } from "react";

import "./searchbar.css";

function SearchBar({ setResults }) {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch(`${process.env.REACT_APP_API_LINK}/users`)
      .then((res) => res.json())
      .then((data) => {
        const results = data.filter((user) => {
          return (
            value &&
            user &&
            user.firstName &&
            user.firstName.toLowerCase().includes(value)
          );
        });
        setResults(results);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value.toLowerCase());
  };

  return (
    <>
      <div className="input-wrapper">
        <input
          placeholder="Search user..."
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
      </div>
    </>
  );
}

export default SearchBar;
