import { createClient } from '@supabase/supabase-js'
import { Routes, Route } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

// Page Imports
import Landing from './pages/Landing'
import Login from './pages/Login'
import Signup from './pages/Signup'

/* Font Imports */
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

function App() {
  const navigate = useNavigate()
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing navigate={navigate}/>} />
        <Route path="/login" element={<Login navigate={navigate}/>} />
        <Route path="/signup" element={<Signup navigate={navigate}/>} />
        {/* <Route path="/hobbies" element={<Hobbies />} />
        <Route path="/hobbies/:id" element={<Hobby />} />
        <Route path="/hobbies/:id/edit" element={<EditHobby />} /> */}
      </Routes>

    </>
  )
}

export default App
