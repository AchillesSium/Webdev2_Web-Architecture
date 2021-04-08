import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalStyle } from './globalStyles';
import Products from './components/Products';
import { productData, productDataTwo } from './components/Products/data';

function App() {
  return (
    <Router>
      <GlobalStyle />
      <Products heading=" Vegabond's Sandwich"  data={productData} />
    </Router>
  );
}

export default App;
