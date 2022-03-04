import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

// layouts
const OnboardingLayout = lazy(() => import('@/_layouts/Onboarding'));
const ProfilingLayout = lazy(() => import('@/_layouts/Profiling'));
const WatchingLayout = lazy(() => import('@/_layouts/Watching'));

const AddProfile = lazy(() => import('@/pages/Browse/AddProfile'));
const Browse = lazy(() => import('@/pages/Browse/Profiles'));
const EditProfile = lazy(() => import('@/pages/Browse/EditProfile'));
const Explore = lazy(() => import('@/pages/Explore'));
const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));
const Creating = lazy(() => import('@/pages/Registration/Creating'));
const Naming = lazy(() => import('@/pages/Registration/Naming'));

const Routes = () => {
   return (
      <AppRoutes>
         <Route element={<ProfilingLayout />}>
            <Route
               path='/browse'
               element={<Wrapper component={Browse} isPrivate />}
            />
            <Route
               path='/browse/addProfile'
               element={<Wrapper component={AddProfile} isPrivate />}
            />
            <Route
               path='/browse/editProfile'
               element={<Wrapper component={EditProfile} isPrivate />}
            />
         </Route>
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
