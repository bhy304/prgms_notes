import { Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import LoginPage from '@/pages/Login'
import JoinPage from '@/pages/Join'

function App() {
  return (
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path='/login' element={<LoginPage />} />
      <Route path='/join' element={<JoinPage />} />
    </Routes>
  )
}

export default App
