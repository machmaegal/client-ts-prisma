import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import About from './pages/About'
//import { IUser } from './types'

export default function App() {
  return (
    <>

      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/about' element={<Layout><About /></Layout>} />
      </Routes>

    </>
  )
}
