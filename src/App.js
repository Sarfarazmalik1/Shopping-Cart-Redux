import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/navbar';
import Cart from './components/pages/Cart';
import Product from './components/pages/Product';

function App() {
  return (
   <>
      <main id="main">
      <Navbar />
        <Routes>
          {/* <Route path="/" element={<Navbar />} /> */}
           <Route path="/cart" element={<Cart />} />
          <Route path="/product" element={<Product />} />
        </Routes>
      </main>

   </>
  );
}

export default App;
