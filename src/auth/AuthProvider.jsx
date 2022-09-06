import { useState, useMemo } from "react";
import { createContext } from "react";


export const UserContext = createContext(null)

export default function AuthProvider({ children }) {

  // const [user, setUser] = useState({ 'id': 1, 'name' : 'edwar' })
  const [user, setUser] = useState(null)  

  const contextValue = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
