import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Wiki from './pages/Wiki/Wiki.tsx';
import Login from './pages/Panel/Login/Login.tsx';
import { Dashboard } from './pages/Panel/Dashboard/Dashboard.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/wiki',
    element: <Wiki />,
  },
  {
    path: '/painel/login',
    element: <Login />,
  },
  {
    path: '/painel/dashboard',
    element: <Dashboard />,
  },
]);

export { router };
