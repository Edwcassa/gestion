import { useState, useMemo } from "react";
import { createContext } from "react";
import { getUser } from "../utils/user";


export const UserContext = createContext(null)

export default function AuthProvider({ children }) {

  // const [user, setUser] = useState({ 'id': 1, 'name' : 'edwar' })
  const [user, setUser] = useState(getUser)  

  const contextValue = useMemo(() => ({user, setUser}), [user, setUser])

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}
