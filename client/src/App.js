import React from 'react';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import './App.css';
import Alert from './components/layout/Alert';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import { useEffect } from 'react';
import setAuthToken from './utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import PrivateRoute from './components/routing/PrivateRoute';

// This will only run when the user loads the application for the first time
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

const App = () => {

  // this will run everytime app.js component mounts
  useEffect(() => {
    store.dispatch(loadUser());
  }, [])

  return (
		<Provider store={store}>
			<Router>
				<>
					<Navbar />
					<Route path='/' exact component={Landing} />
					<section className='container'>
            <Alert/>
						<Switch>
							<Route exact path='/register' component={Register} />
							<Route exact path='/login' component={Login} />
							<PrivateRoute exact path='/dashboard' component={Dashboard}/>
						</Switch>
					</section>
				</>
			</Router>
		</Provider>
	);
}

export default App;
