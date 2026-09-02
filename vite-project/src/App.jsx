import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import GadgetTable from './components/GadgetTable'
import ItemDetailCard from './components/ItemDetailCard'

function App() {
  const [view, setView] = useState('register')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)
  const [categoryFilter, setCategoryFilter] = useState('All')

  const filteredItems =
    categoryFilter === 'All' ? items : items.filter((i) => i.category === categoryFilter)

  function handleAddItem(item) {
    setItems((prev) => [...prev, { id: crypto.randomUUID(), ...item }])
    setView('registry')
  }

  return (
    <div className="min-h-screen p-6 pt-16">
      <div className="w-full max-w-xl mx-auto">
         <div className="flex items-center justify-between mb-6">
          <h1 className="text-lg font-semibold tracking-tight">Gadget Hub</h1>
           <nav className="flex gap-1 bg-surface rounded-md p-1 border border-border">
            <button
              onClick={() => setView('register')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                view === 'register'
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              Register item
            </button>
            <button
              onClick={() => setView('registry')}
              className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
                view === 'registry'
                  ? 'bg-accent text-white'
                  : 'text-text-muted hover:text-text'
              }`}
            >
              Registry ({items.length})
            </button>
          </nav>
        </div>

        {view === 'register' && (
          <div className="flex justify-center">
            <RegisterForm onSubmit={handleAddItem} />
          </div>
        )}

        {view === 'registry' && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-sm text-text-muted">Filter:</span>
              {['All', 'Smartphone', 'Laptop', 'Wearable', 'Audio'].map((c) => (
                <button
                  key={c}
                  onClick={() => setCategoryFilter(c)}
                  className={`rounded-md px-2.5 py-1 text-xs font-medium border transition-colors ${
                    categoryFilter === c
                      ? 'bg-accent text-white border-accent'
                      : 'border-border text-text-muted hover:text-text'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>

            <GadgetTable
              items={filteredItems}
              selectedId={selectedItem?.id}
              onSelectRow={(item) =>
                setSelectedItem((prev) => (prev?.id === item.id ? null : item))
              }
            />

            <div className="mt-4">
              <ItemDetailCard selectedItem={selectedItem} />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default App