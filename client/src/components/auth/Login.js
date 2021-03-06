import React, { useState } from "react";
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';

const Login = ({ login, isAuthenticated }) => {
	const [formData, setFormdata] = useState({
		email: "",
		password: "",
	});

	const { email, password} = formData;

	const onChange = (e) =>
		setFormdata({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = async (e) => {
		e.preventDefault();
		login(email, password);
	};

	// Redirect if logged in
	if(isAuthenticated){
		return < Redirect to="/dashboard"/>
	}

	return (
		<>
			<h1 className='large text-primary'>Sign In</h1>
			<p className='lead'>
				<i className='fa fa-user'></i> Sign Into Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
					/>
					
				</div>
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='password'
						placeholder='Password'
						name='password'
						minLength='6'
						value={password}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Login' />
			</form>
			<p className='my-1'>
				Don't have an account? <Link to='/register'>Register</Link>
			</p>
		</>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
	isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
