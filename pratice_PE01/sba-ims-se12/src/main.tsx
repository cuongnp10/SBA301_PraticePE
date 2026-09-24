import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.tsx'
import Create from './pages/Create.tsx'
import Login from './pages/Login.tsx'
import List from './pages/List.tsx'
import Detail from './pages/Detail.tsx'
import AddNew from './pages/AddNew.tsx'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/create" element={<Create />} />
        <Route path="/login" element={<Login />} />
          <Route path="/list" element={<List />} />
          <Route path="/Detail" element={<Detail />} />
          <Route path="/AddNew" element={<AddNew />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
