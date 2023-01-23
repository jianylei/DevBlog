import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import Post from './features/posts/Post'
import PostList from './features/posts/PostList'
import UserList from './features/users/UserList'
import User from './features/users/User'
import { TABS } from './constants/constants'
import NewPost from './features/posts/NewPost'
import PersistLogin from './features/auth/PersistLogin'

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>

          <Route path="/write" element={<NewPost />} />

          <Route path='/' element={<BlogLayout />}>
            <Route path='/' >
              <Route index element={<PostList />} />
              <Route path=":title" element={<Post />} />
            </Route>

            <Route path='/authors' >
              <Route index element={<UserList />} />
              <Route path=":username" element={<User />} />
            </Route>
          </Route>

          <Route path='*' element={<NoMatch tab={ TABS.Page }/>}/>{/* 404 */}
        </Route>
      </Route>
      
    </Routes>
  )
}

export default App