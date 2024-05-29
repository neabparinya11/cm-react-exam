import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SummaryPage from './pages/SummaryPage'
import DetailPage from './pages/DetailPage'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <HomePage />
        } />
        <Route path='/summary' element={<SummaryPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/detail'>
          <Route path=':id' element={<DetailPage />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
