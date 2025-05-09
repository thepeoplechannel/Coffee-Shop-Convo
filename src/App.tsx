import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react'
import { PersonList } from './components/PersonList'
import { PersonForm } from './components/PersonForm'
import { Garden } from './components/Garden'
import { Login } from './components/Auth/Login'
import { SignUp } from './components/Auth/SignUp'
import { Navbar } from './components/Navbar'
import { Person } from './types/Person'
import { AuthProvider, useAuth } from './context/AuthContext'
import './styles/main.css'
import './App.css'

function AppContent() {
  const [people, setPeople] = useState<Person[]>([])
  const { isAuthenticated } = useAuth()

  const handleAddPerson = (person: Person) => {
    setPeople([...people, person])
  }

  const handleClearAll = () => {
    setPeople([])
  }

  // Protected Route component
  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" />
    }
    return <>{children}</>
  }

  return (
    <>
      <div className="sky-overlay"></div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <>
                <Navbar />
                <div className="app-container">
                  <PersonList 
                    people={people} 
                    onAddPerson={handleAddPerson} 
                    onClearAll={handleClearAll}
                  />
                  <Garden people={people} />
                </div>
              </>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
