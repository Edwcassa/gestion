
import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LoginPage from '../pages/LoginPage'
import MainRouter from './MainRouter'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path='/login' element={<LoginPage />} />
        <Route path='/*' element={<MainRouter />} />

      </Routes>
    </BrowserRouter>
  )
}