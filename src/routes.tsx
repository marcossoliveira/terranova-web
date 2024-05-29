import { createBrowserRouter } from 'react-router-dom';
import Home from './pages/Home/Home.tsx';
import Wiki from './pages/Wiki/Wiki.tsx';

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
    path: '/aaaaa',
    element: <div />,
  },
]);

export { router };
