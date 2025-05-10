import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import {Provider} from 'react-redux'
import store from "./store/store.js"
import Home from './pages/Home.jsx'
import Login from './pages/LoginPage.jsx'
import SignUp from './pages/SignUpPage.jsx'
import MyPosts from './pages/MyPosts.jsx'
import AddPosts from './pages/AddPosts.jsx'
import EditPosts from './pages/EditPosts.jsx'
import Post from './pages/Post.jsx'
import AuthLayout from './components/AuthLayout.jsx'





const router= createBrowserRouter([
  {
    path:"/",
    element: <App/>,
    children: [
      {
        path:"/",
        element:<Home/>
      },

      {
        path:"/login",
        element:(
         <AuthLayout authentication={false}>
          <Login/>
         </AuthLayout>
        )
      },

      {
        path:"/signup",
        element:(
         <AuthLayout authentication={false}>
          <SignUp/>
         </AuthLayout>
        )
      },

      {
        path:"/my-posts",
        element:(
         <AuthLayout authentication={true}>
          <MyPosts/>
         </AuthLayout>
        )
      },

      {
        path:"/add-post",
        element:(
         <AuthLayout authentication={true}>
          <AddPosts/>
         </AuthLayout>
        )
      },

      {
        path:"/post/:slug",
        element:(
         <AuthLayout authentication={true}>
          <Post/>
         </AuthLayout>
        )
      },

      {
        path:"/edit-post/:slug",
        element:(
         <AuthLayout authentication={true}>
          <EditPosts/>
         </AuthLayout>
        )
      }

]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    </Provider>

  </StrictMode>,
)
