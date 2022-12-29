import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import Post from './features/posts/Post'
import PostList from './features/posts/PostList'
import UserList from './features/users/UserList'
import User from './features/users/User'
import { TABS } from './config/constants'
import NewPost from './features/posts/NewPost'
import Login from './features/auth/Login'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path='/' element={<BlogLayout />}>
          <Route path='/' >
            <Route index element={<PostList />} />
            <Route path=":title" element={<Post />} />
            <Route path="/new" element={<NewPost />} />
          </Route>

          <Route path='/authors' >
            <Route index element={<UserList />} />
            <Route path=":user" element={<User />} />
          </Route>
        </Route>

        <Route path='/login' element={<Login />}></Route>

        <Route path='*' element={<NoMatch tab={ TABS.Page }/>}/>{/* 404 */}
      </Route>

      
    </Routes>
  )
}

export default App