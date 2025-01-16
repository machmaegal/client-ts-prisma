import { Routes, Route } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Layout from './components/Layout'
import About from './pages/About'
import PickAndChoose from './pages/PickAndChoose'
import Error404 from './pages/Error404'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Anonymus from './components/Anonymus'
import Protected from './components/Protected'
import RecipeList from './components/RecipeList'
import Profile from './pages/Profile'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/about' element={<Layout><About /></Layout>} />
        <Route path='/notFound' element={<Layout><Error404 /></Layout>} />

        <Route path='/signup' element={<Anonymus><Layout><Signup /></Layout></Anonymus>} />
        <Route path='/login' element={<Anonymus><Layout><Login /></Layout></Anonymus>} />

        <Route path='/pickAndChoose' element={<Protected><Layout><PickAndChoose /></Layout></Protected>} />
        <Route path='/recipes' element={<Protected><Layout><RecipeList /></Layout></Protected>} />
        <Route path='/profile' element={<Protected><Layout><Profile /></Layout></Protected>} />
      </Routes>
    </>
  )
}
