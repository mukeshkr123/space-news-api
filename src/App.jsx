import { useEffect, useState } from "react";

function App() {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchNews = async () => {
      try {
        const response = await fetch(
          "https://api.spaceflightnewsapi.net/v4/articles/"
        );
        if (!isMounted) {
          return;
        }
        if (response.ok) {
          const data = await response.json();
          setNewsList(data.results);
        } else {
          throw new Error("Failed to fetch news data");
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className="App">
      <h1>News API</h1>

      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="news-container">
          {newsList.map((val, index) => (
            <div
              onClick={() => (window.location.href = val.url)}
              key={index}
              className="news"
            >
              <h3>{val.title}</h3>
              <img src={val.image_url} alt="" />
              <p>{val.summary}</p>
              <h3>{val.published_at}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
