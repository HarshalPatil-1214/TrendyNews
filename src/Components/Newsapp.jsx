import React, { useEffect, useState } from "react";
import './Newsapp.css'
import Card from "./Card";

const Newsapp=()=>{
    const [search,setSearch]=useState("india");
    const [newsData,setNewsData]=useState(null);
    const API_KEY="6ed1a74e8fdd476fb41ebdf3d38c4422";

    const getData= async()=>{
        const response = await fetch(`https://newsapi.org/v2/everything?q=${search}&apiKey=${API_KEY}`)

        const jsonData= await response.json();
        setNewsData(jsonData.articles);
    }

    useEffect(()=>{
        getData();
    },[])
 
    const handleInput =(e)=>{
        console.log(e.target.value);
        setSearch(e.target.value);
            
    }

    const userInput=(e)=>{

    const value = e.target.value;
  setSearch(value);   // updates state
  getData(value);  
    }

    return(
        <div>
            <nav>
                <div className="navhead">
                    <h1>Trendy News</h1>
                </div>
           
                <div className="SearchBar">
                    <input type='text' placeholder="Search News" value={search} onChange={handleInput}/>
                    <button onClick={getData}>Search</button>
                </div>
            </nav>
            <div>
                <p className="head">Stay update with TrendyNews</p>
            </div>
            <div className="categoryBtn">

                <button onClick={userInput} value="sports">Sport</button>
                <button onClick={userInput} value="politics">Politics</button>
                <button onClick={userInput} value="entertainment">Entertaninment</button>
                <button onClick={userInput} value="health">Health</button>
                <button onClick={userInput} value="fitness">Fitness</button>
            </div>
            <div>
               {newsData?<Card data={newsData}/>:null}
                
            </div>
        </div>
    )
}
export default Newsapp