import { useState, useEffect, useCallback } from 'react'
import { useLocalStorage } from './hooks/useLocalStorage'
import Navbar from './components/Navbar'
import Toast from './components/Toast'
import SectionArrows from './components/SectionArrows'
import Products from './pages/Products'
import Orders from './pages/Orders'

export default function App() {
  const [products, setProducts] = useLocalStorage('products', [])
  const [orders, setOrders] = useLocalStorage('orders', [])
  const [page, setPage] = useState(() => (location.hash === '#orders' ? 'orders' : 'products'))
  const [toast, setToast] = useState(null)
  const notify = useCallback(msg => setToast({ msg, id: Date.now() }), [])

  useEffect(() => { history.replaceState(null, '', '#' + page) }, [page])

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} />
      <main className="main">
        <SectionArrows page={page} setPage={setPage} />
        {page === 'products'
          ? <Products products={products} setProducts={setProducts} notify={notify} />
          : <Orders products={products} orders={orders} setOrders={setOrders} notify={notify} goProducts={() => setPage('products')} />}
      </main>
      <Toast toast={toast} />
    </div>
  )
}
