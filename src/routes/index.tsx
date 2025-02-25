import { ElementType, FC, Fragment, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';

import { AuthRoute, LoadingScreen } from '@/components';

import TopNavBar from '../layouts/TopNavBar';

interface IRoutes {
  path: string;
  layout?: ElementType;
  component?: ElementType;
  guard?: ElementType;
  routes?: IRoutes[];
}

interface RenderRoutesProps {
  routes: IRoutes[];
}

const routesConfig = [
  {
    path: '/',
    layout: TopNavBar,
    component: lazy(() => import('../pages/Welcome')),
    guard: AuthRoute,
  },
  {
    path: '/services',
    layout: TopNavBar,
    component: lazy(() => import('../pages/Welcome')),
    guard: AuthRoute,
  },
  {
    path: '/about',
    layout: TopNavBar,
    component: lazy(() => import('../pages/Welcome')),
    guard: AuthRoute,
  },
  {
    path: '/contact',
    layout: TopNavBar,
    component: lazy(() => import('../pages/Welcome')),
    guard: AuthRoute,
  },
];

const renderRoutes: FC<RenderRoutesProps> = ({ routes }) => {
  return routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route, i) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              element={
                <Guard>
                  {Layout ? (
                    <Layout>
                      {route.routes
                        ? renderRoutes({
                            routes: route.routes,
                          })
                        : Component && <Component />}
                    </Layout>
                  ) : route.routes ? (
                    renderRoutes({
                      routes: route.routes,
                    })
                  ) : (
                    Component && <Component />
                  )}
                </Guard>
              }
            />
          );
        })}
      </Routes>
    </Suspense>
  ) : null;
};

const AppRoutes: FC = () => {
  return renderRoutes({
    routes: routesConfig,
  });
};

export default AppRoutes;
