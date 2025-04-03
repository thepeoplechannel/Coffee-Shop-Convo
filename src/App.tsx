import { useState } from 'react'
import { PersonList } from './components/PersonList'
import { PersonForm } from './components/PersonForm'
import { Person } from './types/Person'
import './App.css'

function App() {
  const [persons, setPersons] = useState<Person[]>([])
  const [showForm, setShowForm] = useState(false)

  const handleAddPerson = (personData: Omit<Person, 'id' | 'dateAdded'>) => {
    const newPerson: Person = {
      ...personData,
      id: crypto.randomUUID(),
      dateAdded: new Date().toISOString(),
    }
    setPersons([...persons, newPerson])
    setShowForm(false)
  }

  const handleClearAll = () => {
    setPersons([])
  }

  return (
    <div className="app">
      <PersonList 
        persons={persons} 
        onAddPerson={() => setShowForm(true)} 
        onClearAll={handleClearAll}
      />
      {showForm && (
        <PersonForm
          onSubmit={handleAddPerson}
          onClose={() => setShowForm(false)}
        />
      )}
    </div>
  )
}

export default App
