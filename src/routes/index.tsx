import { lazy } from 'react';
import { Routes as AppRoutes, Route } from 'react-router-dom';

// check if route is private or not
import Wrapper from './RouteWrapper';

const NotFound = lazy(() => import('@/pages/NotFound'));
const Signin = lazy(() => import('@/pages/Signin'));
const Signup = lazy(() => import('@/pages/Signup'));

const profilingRoutes = () => {
   const ProfilingLayout = lazy(() => import('@/_layouts/Profiling'));

   const AddProfile = lazy(() => import('@/pages/Browse/AddProfile'));
   const Browse = lazy(() => import('@/pages/Browse/Profiles'));
   const EditProfile = lazy(() => import('@/pages/Browse/EditProfile'));

   return (
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
   );
};

const registrationRoutes = () => {
   const OnboardingLayout = lazy(() => import('@/_layouts/Onboarding'));

   const Creating = lazy(() => import('@/pages/Registration/Creating'));
   const Naming = lazy(() => import('@/pages/Registration/Naming'));

   return (
      <Route path='signup' element={<OnboardingLayout />}>
         <Route
            path='registration'
            element={<Wrapper component={Creating} />}
         />
         <Route path='naming' element={<Wrapper component={Naming} />} />
      </Route>
   );
};

const watchingRoutes = () => {
   const WatchingLayout = lazy(() => import('@/_layouts/Watching'));

   const Explore = lazy(() => import('@/pages/Explore'));
   const Title = lazy(() => import('@/pages/Title'));

   return (
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
         <Route
            path='title/:titleId'
            element={<Wrapper component={Title} isPrivate />}
         />
      </Route>
   );
};

const Routes = () => {
   return (
      <AppRoutes>
         <Route path='/signin' element={<Wrapper component={Signin} />} />
         <Route path='/' element={<Wrapper component={Signup} />} />
         <Route path='*' element={<NotFound />} />
         {profilingRoutes()}
         {registrationRoutes()}
         {watchingRoutes()}
      </AppRoutes>
   );
};

export default Routes;
