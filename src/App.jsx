import { useEffect, useState } from "react";

function App() {
  const [newsList, setNewsList] = useState([]);

  useEffect(() => {
    fetch("https://api.spaceflightnewsapi.net/v4/articles/")
      .then((response) => response.json())
      .then((data) => {
        setNewsList(data);
        console.log(data.results);
      })
      .catch((error) => console.log(error));
  });

  return (
    <div className="App">
      <h1>News Api</h1>

      <div className="news-container"></div>
    </div>
  );
}

export default App;
