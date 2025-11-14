import { Route, Router, Switch } from 'wouter';
import { useHashLocation } from 'wouter/use-hash-location';
import { Toaster } from '@ui';

import { ProtectedRoute } from '@/components/app';
import LoginPage from '@/pages/login-page';
import MainPage from '@/pages/main-page';

const App = () => {
  return (
    <>
      <Router hook={useHashLocation}>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/">
            <ProtectedRoute>
              <MainPage />
            </ProtectedRoute>
          </Route>
        </Switch>
      </Router>
      <Toaster />
    </>
  );
};

export default App;
