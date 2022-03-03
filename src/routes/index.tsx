import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

// layouts
const OnboardingLayout = lazy(() => import('@/_layouts/Onboarding'));
const WatchingLayout = lazy(() => import('@/_layouts/Watching'));

const Explore = lazy(() => import('@/pages/Explore'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));
const Creating = lazy(() => import('@/pages/Registration/Creating'));
const Naming = lazy(() => import('@/pages/Registration/Naming'));

const Routes = () => {
   return (
      <AppRoutes>
         <Route path='/signin' element={<Wrapper component={Signin} />} />
         <Route path='/' element={<Wrapper component={Signup} />} />
         <Route path='signup' element={<OnboardingLayout />}>
            <Route
               path='registration'
               element={<Wrapper component={Creating} />}
            />
            <Route path='naming' element={<Wrapper component={Naming} />} />
         </Route>
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
         <Route path='*' element={<NotFound />} />
      </AppRoutes>
   );
};

export default Routes;
