import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface RouteWrapperProps {
   component: React.ComponentType;
   isPrivate?: boolean;
   title?: string;
}

const RouteWrapper = ({
   component: Component,
   isPrivate = false,
   title = '',
}: RouteWrapperProps) => {
   const location = useLocation();

   const isLogged = false;

   useEffect(() => {
      if (title !== '') document.title = `${title}`;
   }, [title]);

   if (isLogged && !isPrivate) {
      return <Navigate to='/explore' state={{ from: location }} replace />;
   }

   if (!isLogged && isPrivate) {
      return <Navigate to='/' state={{ from: location }} replace />;
   }

   return <Component />;
};

export default RouteWrapper;
