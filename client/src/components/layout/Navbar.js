import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {logout} from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth: { isAuthenticated, loading }, logout}) => {

  const authLinks = (
		<ul>
			<li>
				<a onClick={logout} href='#!'>
					<i className='fa fa-sign-out-alt'></i>
					<span className='hide-sm'>Logout</span>
				</a>
			</li>
		</ul>
	);

  const guestLinks = (
    <ul>
        <li><a href="#!">Developers</a></li>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  )

  return (
    <nav className="navbar bg-dark">
      <h1>
        <Link to="/"><i className="fa fa-code"></i> DevConnector</Link>
      </h1>
      {!loading && (<>{isAuthenticated ? authLinks : guestLinks}</>)}
      
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps, { logout })(Navbar);