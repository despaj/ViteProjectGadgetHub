import RegisterForm from './components/RegisterForm'

function App() {
  function handleAddItem(item) {
    console.log('Submitted item:', item)
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-xl">
        <h1 className="text-lg font-semibold tracking-tight mb-6 text-center">
          Gadget Hub
        </h1>
        <RegisterForm onSubmit={handleAddItem} />
      </div>
    </div>
  )
}

export default App