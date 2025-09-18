import React, { useEffect, useState } from "react";
import './Newsapp.css';
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const API_KEY = "6ed1a74e8fdd476fb41ebdf3d38c4422";

  // ✅ getData accepts an optional query
  const getData = async (query) => {
    const topic = query || search;  // if no query passed, use search state
    try {
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`
      );
      const jsonData = await response.json();
      setNewsData(jsonData.articles || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // ✅ fetch default news on first render
  useEffect(() => {
    getData();
  }, []);

  // ✅ typing in search box
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // ✅ category buttons
  const userInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    getData(value);   // fetch directly with value
  };

  return (
    <div>
      <nav>
        <div className="navhead">
          <h1>Trendy News</h1>
        </div>

        <div className="SearchBar">
          <input
            type="text"
            placeholder="Search News"
            value={search}
            onChange={handleInput}
          />
          <button onClick={() => getData()}>Search</button>
        </div>
      </nav>

      <div>
        <p className="head">Stay updated with TrendyNews</p>
      </div>

      <div className="categoryBtn">
        <button onClick={userInput} value="sports">Sports</button>
        <button onClick={userInput} value="politics">Politics</button>
        <button onClick={userInput} value="entertainment">Entertainment</button>
        <button onClick={userInput} value="health">Health</button>
        <button onClick={userInput} value="fitness">Fitness</button>
      </div>

      <div>
        {newsData ? <Card data={newsData} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Newsapp;
