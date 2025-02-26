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

// Array com as rotas da aplicação
// Uma rota pode ter um layout, um componente, um guard e rotas filhas
// O layout é o componente que será renderizado em volta do componente da rota
// O guard é um componente que pode ser utilizado para proteger a rota
// O componente é o componente que será renderizado na rota
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
    // Suspense é utilizado para exibir um componente de carregamento enquanto o componente da rota é carregado
    // Routes é o componente que renderiza as rotas
    // Route é o componente que define uma rota
    // Guard é o componente que protege a rota
    // Layout é o componente que renderiza o layout da rota
    // Component é o componente que renderiza o conteúdo da rota
    // routes é um array com as rotas filhas
    // O componente é renderizado dentro do layout
    // Se a rota tiver rotas filhas, elas são renderizadas dentro do componente da rota
    // Se a rota tiver um layout, o componente da rota é renderizado dentro do layout
    // Se a rota tiver um guard, o componente da rota é renderizado dentro do guard
    // Se a rota tiver um componente, o componente é renderizado
    // Se a rota não tiver um componente, as rotas filhas são renderizadas
    // Se a rota não tiver rotas filhas, o componente da rota é renderizado
    // Se a rota não tiver um layout, o componente da rota é renderizado
    // Se a rota não tiver um guard, o componente da rota é renderizado
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

// Componente que renderiza as rotas da aplicação
// Recebe um array com as rotas
const AppRoutes: FC = () => {
  return renderRoutes({
    routes: routesConfig,
  });
};

export default AppRoutes;
