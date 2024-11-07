// src/App.js

import React from 'react';
import MapComponent from './components/MapComponent';

function App() {
  return (
    <div className='App flex flex-col items-center p-4'>
      <h1 className='text-3xl font-bold text-blue-600 mb-4'>
        Earthquake Visualizer
      </h1>
      <div className='w-full h-[80vh]'>
        <MapComponent />
      </div>
    </div>
  );
}

export default App;
