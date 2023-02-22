import React, { Suspense } from 'react'
import ReactDOM, { createRoot } from 'react-dom/client'

import Chat from './page/chatpage';
import './index.css'
import { createBrowserRouter } from 'react-router-dom';
import Login from './page/login';
import { RouterProvider } from 'react-router';
import { Navigate } from 'react-router-dom';
import { CurrUser } from './util/currUser';
import Protected, { Guest } from './component/protected';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Guest currUser={CurrUser.getInstance()} children={ <Login/>} />,
  },
  {
    path: '/chat',
    element: 
      <Protected currUser={CurrUser.getInstance()} children={<Chat/>}/>
    ,
  }
])

createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router}/>
)

// ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
//   <React.StrictMode>
//     <Chat/>
//   </React.StrictMode>,
// )
