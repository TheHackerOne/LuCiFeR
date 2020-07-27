import React, { useState } from 'react';
import { Link, Redirect } from "react-router-dom";
import {connect} from 'react-redux';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';

import PropTypes from 'prop-types'

 
const Register = ({ setAlert, register, isAuthenticated }) =>  {

  const [formData, setFormdata] = useState({
    name: '',
    email: "",
    password: "",
    password2: ""
  });

  const { name, email, password, password2 } = formData;

  const onChange = e => setFormdata({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    if(password !== password2){
      setAlert("passwords do not match", 'danger')
    } else {
      register({ name, email, password })
    }
	}
	
	if(isAuthenticated){
		return <Redirect to='/dashboard' />
	}

  return (
		<>
			<h1 className='large text-primary'>Sign Up</h1>
			<p className='lead'>
				<i className='fa fa-user'></i> Create Your Account
			</p>
			<form className='form' onSubmit={(e) => onSubmit(e)}>
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='text'
						placeholder='Name'
						name='name'
						value={name}
					/>
				</div>
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='email'
						placeholder='Email Address'
						name='email'
						value={email}
					/>
					<small className='form-text'>
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='password'
						placeholder='Password'
						name='password'
						value={password}
					/>
				</div>
				<div className='form-group'>
					<input
						onChange={(e) => onChange(e)}
						type='password'
						placeholder='Confirm Password'
						name='password2'
						value={password2}
					/>
				</div>
				<input type='submit' className='btn btn-primary' value='Register' />
			</form>
			<p className='my-1'>
				Already have an account?
				<Link to='/login'>Login</Link>
			</p>
		</>
	);
}

Register.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired,
	isAuthenticated: PropTypes.bool,
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
