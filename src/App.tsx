import { Routes, Route, Navigate } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SummaryPage from './pages/SummaryPage'
import DetailPage from './pages/DetailPage'
import Middleware from './middleware'
import React from 'react'
import Navbar from './components/Navbar'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Middleware>
            <React.Fragment>
              <Navbar />
              <HomePage />
            </React.Fragment>
          </Middleware>
        } />
        <Route path='/summary' element={
          <Middleware>
            <React.Fragment>
              <Navbar />
              <SummaryPage />
            </React.Fragment>
          </Middleware>
        } />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/detail'>
          <Route path=':id' element={
            <Middleware>
              <React.Fragment>
                <Navbar />
                <DetailPage />
              </React.Fragment>
            </Middleware>
          } />
        </Route>
        <Route path='*' element={<Navigate to={'/'} replace />} />
      </Routes>
    </>
  )
}

export default App
