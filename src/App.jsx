import './App.scss';
import { ProductDetail } from './components/ProductDetail';
import { Home } from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartProvider } from './context/cart';
import { Table } from './components/Table';
function App() {

  return (
    <CartProvider>
      <BrowserRouter >
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/data' element={<Table />}></Route>
          <Route path='/products/:productId' element={<ProductDetail />}></Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App
