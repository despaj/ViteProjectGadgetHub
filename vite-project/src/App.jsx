import { useState } from 'react'
import RegisterForm from './components/RegisterForm'
import GadgetTable from './components/GadgetTable'

let nextId = 1

function App() {
  const [view, setView] = useState('register')
  const [items, setItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  function handleAddItem(item) {
    setItems((prev) => [...prev, { id: nextId++, ...item }])
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
            <GadgetTable
              items={items}
              selectedId={selectedItem?.id}
              onSelectRow={setSelectedItem}
            />
            {selectedItem && (
              <p className="mt-3 text-sm text-text-muted">
                Selected: <span className="text-text font-medium">{selectedItem.gadgetName}</span>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App