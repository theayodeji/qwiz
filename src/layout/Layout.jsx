import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/Home'
import QuizPage from '../pages/Quiz'

const Layout = () => {
  return (
    <Routes>
        <Route element={<Home />} path='/'/>
        <Route element={<QuizPage />} path='/quiz'/>
    </Routes>
  )
}

export default Layout