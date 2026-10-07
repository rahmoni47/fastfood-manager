const items = [['products', '🍟', 'Products'], ['orders', '🧾', 'Orders']]

export default function Navbar({ page, setPage }) {
  return (
    <nav className="nav">
      <div className="brand"><span>🍔</span><b>FastFood Manager</b></div>
      <div className="nav-links">
        {items.map(([id, icon, label]) => (
          <button key={id} className={page === id ? 'active' : ''} onClick={() => setPage(id)}>
            <span className="ico">{icon}</span>{label}
          </button>
        ))}
      </div>
    </nav>
  )
}
