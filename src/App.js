import React from 'react';
import './App.css';
import HeaderComponent from './components/header/headerComponent';
import ContentComponent from './components/content/contentComponent';

function App() {
  return (
      <div className="app">
        <HeaderComponent />
        <ContentComponent />
      </div>
  );
}

export default App;
