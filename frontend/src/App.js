import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import Post from './features/posts/Post'
import PostList from './features/posts/PostList'
import UserList from './features/users/UserList'
import { TABS } from './config/constants'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<BlogLayout />}>
          <Route path='/' >
            <Route index element={<PostList />} />
            <Route path=":title" element={<Post />} />
          </Route>

          <Route path='/authors' >
            <Route index element={<UserList />} />
          </Route>
        </Route>

        <Route path='*' element={<NoMatch tab={ TABS.Page }/>}/>{/* 404 */}
      </Route>

      
    </Routes>
  )
}

export default App