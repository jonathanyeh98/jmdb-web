import React from 'react';
import './App.css';
import MovieApp from './components/movieApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div id="logo">JMDB</div>
      </header>
      <MovieApp/>
      <footer>
        @Jonathan Yeh 2020
      </footer>
    </div>
  );
}

export default App;
