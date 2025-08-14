// import { useSelector } from 'react-redux';
// import { RootState } from '../store';
// import MainLayout from './MainLayout';
// import { Outlet, Navigate } from 'react-router-dom';

// const RoleBasedLayout = () => {
//   const user = useSelector((state: RootState) => state.auth.user);

//   // Redirect to login if not authenticated
//   if (!user) {
//     return <Navigate to="/login" replace />;
//   }

//   // In future, switch layouts based on role
//   if (user.role === 'admin') {
//     return <MainLayout><Outlet /></MainLayout>;
//   }
  
//   // Placeholder for other roles
//   return <div>Unauthorized or unknown role</div>;
// };

// export default RoleBasedLayout; 



import { useSelector } from 'react-redux';
import { RootState } from '../store';
import MainLayout from './MainLayout';
import { Outlet, Navigate } from 'react-router-dom';

const RoleBasedLayout = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Single-role app: subcontractor
  if (user.role === 'subcontractor') {
    return <MainLayout><Outlet /></MainLayout>;
  }

  // Optional: fallback for unknown roles
  return <div>Unauthorized or unknown role</div>;
};

export default RoleBasedLayout;
