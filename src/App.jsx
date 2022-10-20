import axios from 'axios'
import './App.css'
import AuthProvider from './auth/AuthProvider'
import AppRouter from './routes/AppRouter'

axios.defaults.baseURL = "https://gestion-backend-631b.onrender.com/api/"

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
