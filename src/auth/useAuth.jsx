import React from 'react'
import { useContext } from 'react'
import { UserContext } from './AuthProvider'

export default function UseAuth() {

  const contextValue = useContext(UserContext)
  return contextValue
}
