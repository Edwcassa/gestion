import axios from 'axios'
import './App.css'
import AuthProvider from './auth/AuthProvider'
import AppRouter from './routes/AppRouter'

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL

function App() {

  return (
    <div className="App">
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </div>
  )
}

export default App  
