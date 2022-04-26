import React from "react";
import { BrowserRouter, Switch } from 'react-router-dom';
import { 
  LandingPage,
  Login,
  Signup,
  Booking,
  MyBookings,
  CourtsPage,
  SettingsPage,
  RankingsPage,
  specificRankingPage,
  AdminLogin,
  AdminPage,
  AdminUsersPendingPage,
  AdminBookingsPage,
  AdminUsersPage,
  AdminSpecificUserPage,
  AdminCourtsPage,
  AdminSettingsPage,
  AdminRankingsPage,
  AdminSpecificRankingPage,
  AdminContactMessagePage,
  NoMatch
} from './pages/'
import PublicRoute from './hooks/PublicRoute'
import PrivateRoute from './hooks/PrivateRoute'
import AdminPublicRoute from './hooks/AdminPublicRoute'
import AdminPrivateRoute from './hooks/AdminPrivateRoute'

function AppRouter() {

  return (
    <div>
      <BrowserRouter>
          <Switch>
            <PublicRoute restricted={true} component={Login} path="/login" exact />
            <PublicRoute restricted={true} component={Signup} path="/signup" exact />
            <PublicRoute component={LandingPage} path="/" exact />            
            <PublicRoute component={CourtsPage} path="/courts" exact />
            <PrivateRoute component={Booking} path="/booking" exact />
            <PrivateRoute component={MyBookings} path="/mybookings" exact />
            <PrivateRoute component={SettingsPage} path="/settings" exact />
            <PrivateRoute component={RankingsPage} path="/rankings" exact />
            <PrivateRoute component={specificRankingPage} path="/rankings/:rankingId" exact />

            <AdminPublicRoute restricted={true} component={AdminLogin} path="/admin/login" exact/>
  
            <AdminPrivateRoute component={AdminPage} path="/admin" exact />
            <AdminPrivateRoute component={AdminUsersPendingPage} path="/admin/pendingusers" exact />
            <AdminPrivateRoute component={AdminBookingsPage} path="/admin/bookings" exact />
            <AdminPrivateRoute component={AdminUsersPage} path="/admin/users" exact  />
            <AdminPrivateRoute component={AdminSpecificUserPage} path="/admin/users/:userId" exact  />
            <AdminPrivateRoute component={AdminCourtsPage} path="/admin/courts" exact />
            <AdminPrivateRoute component={AdminSettingsPage} path="/admin/settings" exact />
            <AdminPrivateRoute component={AdminRankingsPage} path="/admin/rankings" exact />
            <AdminPrivateRoute component={AdminSpecificRankingPage} path="/admin/rankings/:rankingId" exact />
            <AdminPrivateRoute component={AdminContactMessagePage} path="/admin/contactMessages" exact />

            <PublicRoute component={NoMatch} path="*" />
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default AppRouter;
