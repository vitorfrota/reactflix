import { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/auth';

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

   const { isLogged } = useAuth();

   useEffect(() => {
      if (title !== '') document.title = `Reactflix ${title}`;
   }, [title]);

   if (isLogged && !isPrivate) {
      return <Navigate to='/explore' state={{ from: location }} replace />;
   }

   if (!isLogged && isPrivate) {
      return <Navigate to='/signin' state={{ from: location }} replace />;
   }

   return <Component />;
};

export default RouteWrapper;
