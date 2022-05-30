import { Outlet } from 'react-router-dom';

import { StudioMain } from '@/features/studio';
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
        element: <StudioMain />,
      },
      {
        path: '*',
        element: <div>empty</div>,
      },
    ],
  },
];
