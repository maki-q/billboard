import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [billboardData, setBillboardData] = useState({});

  useEffect(() => {
    axios.get('/top100').then((res) => {
      setBillboardData(res.data);
    });
  }, []);

  console.log(billboardData);

  return (
    <div>
      Hello World!
    </div>
  );
}

export default App;
