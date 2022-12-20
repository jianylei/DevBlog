import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import PostList from './features/posts/PostList'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<BlogLayout />}>
          <Route index element={<PostList />} />
        </Route>
      </Route>

      <Route path='*' element={<NoMatch />}/>{/* 404 */}
    </Routes>
  )
}

export default App