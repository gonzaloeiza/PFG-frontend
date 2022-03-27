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
  // AdminPage,
  AdminUsersPendingPage,
  AdminBookingsPage,
  NoMatch
} from './pages/'
import PublicRoute from './hooks/PublicRoute'
import PrivateRoute from './hooks/PrivateRoute'
import AdminRoute from './hooks/AdminRoute'

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
            <PublicRoute restricted={true} component={AdminLogin} path="/admin/login" exact/>
            <PublicRoute component={LandingPage} path="/" exact />            

            <PrivateRoute component={Booking} path="/booking" exact />
            <PrivateRoute component={MyBookings} path="/mybookings" exact />

            <AdminRoute component={AdminUsersPendingPage} path="/admin/pendingusers" exact />
            <AdminRoute component={AdminBookingsPage} path="/admin/bookings" exact />
            {/* <AdminRoute component={AdminPage} path="" exact /> */}
            {/* <AdminRoute component={AdminPage} path="/admin/courts" exact /> */}
            {/* <AdminRoute component={AdminPage} path="/admin/bookings" exact /> */}

            <PublicRoute component={NoMatch} path="*" />
          </Switch>
        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
