import { Routes, Route } from 'react-router-dom'
import './App.css'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SummaryPage from './pages/SummaryPage'
import DetailPage from './pages/DetailPage'
import { Provider } from 'react-redux'
import store from './store/Store'

function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  )
}

export default App
