import { Routes, Route } from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Layout from './components/Layout'
import NoMatch from './components/NoMatch'
import Post from './features/posts/components/Post'
import PostList from './features/posts/components/PostList'
import UserList from './features/users/components/UserList'
import User from './features/users/components/User'
import { TABS } from './constants/constants'
import NewPost from './features/posts/components/NewPost'
import PersistLogin from './features/auth/components/PersistLogin'
import EditPost from './features/posts/components/EditPost'
import Following from './features/posts/components/Following'

function App() {
  return (
    <Routes>
      <Route element={<PersistLogin />}>
        <Route path="/" element={<Layout />}>

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

          <Route path="/write">
            <Route index element={<NewPost />} />
            <Route path=':title' element={<EditPost />}/>
          </Route>

          <Route path='/following' element={<Following />} />

          <Route path='*' element={<NoMatch tab={ TABS.PAGE }/>}/>{/* 404 */}
        </Route>
      </Route>
      
    </Routes>
  )
}

export default App