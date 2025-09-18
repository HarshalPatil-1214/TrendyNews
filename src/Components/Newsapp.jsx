import React, { useEffect, useState } from "react";
import "./Newsapp.css";
import Card from "./Card";

const Newsapp = () => {
  const [search, setSearch] = useState("india");
  const [newsData, setNewsData] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = "6ed1a74e8fdd476fb41ebdf3d38c4422";

  // ✅ Fetch news data (with query or current search)
  const getData = async (query) => {
    const topic = query || search;
    try {
      // 🚨 NewsAPI blocks frontend calls, so use a proxy/backend
      const response = await fetch(
        `https://newsapi.org/v2/everything?q=${topic}&apiKey=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const jsonData = await response.json();
      if (jsonData.articles) {
        setNewsData(jsonData.articles);
        setError(null);
      } else {
        setNewsData([]);
        setError("No articles found.");
      }
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to fetch news. Try again later.");
    }
  };

  // ✅ Run once on component mount
  useEffect(() => {
    getData();
  }, []);

  // ✅ typing in search bar
  const handleInput = (e) => {
    setSearch(e.target.value);
  };

  // ✅ category button click
  const userInput = (e) => {
    const value = e.target.value;
    setSearch(value);
    getData(value);
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
        {error && <p style={{ color: "red" }}>{error}</p>}
        {!error && !newsData && <p>Loading...</p>}
        {!error && newsData && newsData.length > 0 && <Card data={newsData} />}
        {!error && newsData && newsData.length === 0 && <p>No news available.</p>}
      </div>
    </div>
  );
};

export default Newsapp;
