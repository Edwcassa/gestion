import Navbar from './Navbar'
import Sidebar from './Sidebar'
import './dash.css'

export default function Dashboard({ children }) {


  return (
    <>
      <div className="flex">
        <Sidebar />
        <div className="contenedor">
          <Navbar />
          <div className="content">
            {children}
          </div>
        </div>
      </div>
    </>
  )
}