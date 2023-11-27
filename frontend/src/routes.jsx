import { Test } from './pages/Test.jsx'
import { LogIn } from './pages/LogIn.jsx'
import { SignUp } from './pages/SignUp.jsx'
import { WapIndex } from './pages/WapIndex.jsx'
import { WapDetails } from './pages/WapDetails.jsx'
import { WapEdit } from './pages/WapEdit.jsx'
import { HomePage } from './pages/HomePage.jsx'
import { Dashboard } from './pages/Dashboard.jsx'

const routes = [
  {
    path: '/',
    component: <HomePage />,
  },
  {
    path: 'wap',
    component: <WapIndex />,
  },
  {
    path: 'login',
    component: <LogIn />,
  },
  {
    path: 'signup',
    component: <SignUp />,
  },
  {
    path: 'edit',
    component: <WapEdit />,
  },
  {
    path: 'edit/:wapId',
    component: <WapEdit />,
  },
  {
    path: '/preview/:wapId',
    component: <WapDetails />,
  },
  {
    path: '/dashboard/:userId',
    component: <Dashboard />,
  },
  {
    path: '/test',
    component: <Test />,
  },
  {
    path: '/:wapUrl',
    component: <WapDetails />,
  },
]

export default routes
