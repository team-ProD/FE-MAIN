import { Outlet } from 'react-router-dom';

import { Studio } from '@/features/studio';
import { Layouts } from '@/components';

export const protectedRoutes = [
  {
    path: '/',
    element: (
      <Layouts>
        <Outlet />
      </Layouts>
    ),
    children: [
      {
        path: '/',
        element: <Studio />,
      },
      {
        path: '*',
        element: <div>empty</div>,
      },
    ],
  },
];
