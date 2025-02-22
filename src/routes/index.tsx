import { ElementType, FC, lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router';
import LoadingScreen from '../components/LoadingScreen';
import TopNavBar from '../layouts/TopNavBar';

interface IRoutes {
  path: string;
  layout?: ElementType;
  component?: ElementType;
}

interface RenderRoutesProps {
  routes: IRoutes[];
}

const routesConfig = [
  {
    path: '/',
    layout: TopNavBar,
    component: lazy(() => import('../pages/Welcome')),
  },
];

const renderRoutes: FC<RenderRoutesProps> = ({ routes }) => {
  return routes ? (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {routes.map((route, i) => {
          const Layout = route.layout;
          const Component = route.component;

          return (
            <Route
              key={i}
              path={route.path}
              element={
                Layout ? (
                  <Layout>{Component && <Component />}</Layout>
                ) : (
                  <>{Component && <Component />}</>
                )
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
