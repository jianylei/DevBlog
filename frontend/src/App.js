import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<BlogLayout />}></Route>
      </Route>

      <Route path='*' element={<NoMatch />}/>{/* 404 */}
    </Routes>
  )
}

export default App