import React, { useState, useMemo } from "react";
import { UserContext } from "./hooks/UserContext";
import { BrowserRouter, Switch } from 'react-router-dom';
import { 
  LandingPage,
  Login,
  Signup,
  Booking,
  MyBookings,
  AdminLogin,
  AdminPage,
  AdminUsersPendingPage,
  AdminBookingsPage,
  AdminUsersPage,
  AdminSpecificUserPage,
  AdminCourtsPage,
  AdminSettingsPage,
  NoMatch
} from './pages/'
import PublicRoute from './hooks/PublicRoute'
import PrivateRoute from './hooks/PrivateRoute'
import AdminPublicRoute from './hooks/AdminPublicRoute'
import AdminPrivateRoute from './hooks/AdminPrivateRoute'

function AppRouter() {
  const [user, setUser] = useState(null);

  const value = useMemo(() => ({ user, setUser }), [user, setUser]);

  return (
    <div>
      <BrowserRouter>
        <UserContext.Provider value={value}>
          <Switch>
            <PublicRoute restricted={true} component={Login} path="/login" exact />
            <PublicRoute restricted={true} component={Signup} path="/signup" exact />
            <PublicRoute component={LandingPage} path="/" exact />            

            <PrivateRoute component={Booking} path="/booking" exact />
            <PrivateRoute component={MyBookings} path="/mybookings" exact />
  

            <AdminPublicRoute restricted={true} component={AdminLogin} path="/admin/login" exact/>
  
            <AdminPrivateRoute component={AdminPage} path="/admin" exact />
            <AdminPrivateRoute component={AdminUsersPendingPage} path="/admin/pendingusers" exact />
            <AdminPrivateRoute component={AdminBookingsPage} path="/admin/bookings" exact />
            <AdminPrivateRoute component={AdminUsersPage} path="/admin/users" exact  />
            <AdminPrivateRoute component={AdminSpecificUserPage} path="/admin/users/:userId" exact  />
            <AdminPrivateRoute component={AdminCourtsPage} path="/admin/courts" exact />
            <AdminPrivateRoute component={AdminSettingsPage} path="/admin/settings" exact />


            <PublicRoute component={NoMatch} path="*" />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
