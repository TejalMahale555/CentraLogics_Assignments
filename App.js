import React, { useState } from 'react';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  const quotes = [
    { content: 'The greatest glory in living lies not in never falling, but in rising every time we fall.', author: 'Nelson Mandela' },
    { content: 'The way to get started is to quit talking and begin doing.', author: 'Walt Disney' },
    { content: 'Your time is limited, so don’t waste it living someone else’s life.', author: 'Steve Jobs' },
    { content: 'If life were predictable it would cease to be life, and be without flavor.', author: 'Eleanor Roosevelt' },
    { content: 'If you look at what you have in life, you’ll always have more.', author: 'Oprah Winfrey' },
    { content: 'If you set your goals ridiculously high and it’s a failure, you will fail above everyone else’s success.', author: 'James Cameron' },
  ];

  const [currentQuote, setCurrentQuote] = useState(quotes[0]);
  const [favorites, setFavorites] = useState([]);
  const [showFavorites, setShowFavorites] = useState(false);

  const getRandomQuote = () => {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    setCurrentQuote(quotes[randomIndex]);
  };

  const addToFavorites = () => {
    if (!favorites.some(fav => fav.content === currentQuote.content && fav.author === currentQuote.author)) {
      const newFavorites = [...favorites, currentQuote];
      setFavorites(newFavorites);
      localStorage.setItem('favorites', JSON.stringify(newFavorites));
    }
  };

  const copyToClipboard = text => {
    navigator.clipboard.writeText(text);
  };

  const clearFavorites = () => {
    setFavorites([]);
    localStorage.removeItem('favorites');
  };

  const handleShowFavorites = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(storedFavorites);
    setShowFavorites(!showFavorites);
  };

  return (
    <div className="App">
      <div className="wrapper">
        <div className="container">
          <div className="button-container">
            <button onClick={addToFavorites}>
              <i className={`fa-heart ${favorites.some(fav => fav.content === currentQuote.content && fav.author === currentQuote.author) ? 'fa-solid' : 'fa-regular'}`}></i>
            </button>
            <button onClick={handleShowFavorites}>
              <i className="fa-solid fa-list"></i>
            </button>
            <button onClick={() => copyToClipboard(`${currentQuote.content} - ${currentQuote.author}`)}>
              <i className="fa-solid fa-copy"></i>
            </button>
          </div>
          <p id="quote">{currentQuote.content}</p>
          <h3 id="author">{currentQuote.author}</h3>
          <button onClick={getRandomQuote} id="btn">Generate</button>
        </div>
      </div>
      {showFavorites && (
        <div className="favorite-container">
          <h3>Favorite Quotes</h3>
          <ul id="list-of-favourite-quotes">
            {favorites.length > 0 ? (
              favorites.map((fav, index) => (
                <li key={index}>
                  {index + 1}. {fav.content} - {fav.author}
                </li>
              ))
            ) : (
              <p>You haven't added a favorite yet</p>
            )}
          </ul>
          <button onClick={clearFavorites} id="clear-button">Clear</button>
          <button onClick={() => setShowFavorites(false)} id="close-favorite">Close</button>
        </div>
      )}
    </div>
  );
};

export default App;
