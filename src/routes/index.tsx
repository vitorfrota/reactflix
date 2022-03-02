import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

// layouts
const WatchingLayout = lazy(() => import('@/_layouts/Watching'));

const Explore = lazy(() => import('@/pages/Explore'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));

const Routes = () => {
   return (
      <AppRoutes>
         <Route element={<WatchingLayout />}>
            <Route
               path='explore'
               element={
                  <Wrapper
                     component={Explore}
                     title='Explore os filmes e séries'
                     isPrivate
                  />
               }
            />
         </Route>
         <Route path='/' element={<Wrapper component={Signin} />} />
         <Route path='*' element={<NotFound />} />
      </AppRoutes>
   );
};

export default Routes;
