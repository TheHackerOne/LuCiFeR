import React from 'react'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Alert = ({ alerts }) => alerts !== null && alerts.length > 0 && alerts.map(alert => (
<div key={alert.id} className={`alert alert-${alert.alertType}`}>{alert.msg}</div>
))

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
}

const mapStateToProps = state => ({
  alerts: state.alert
  // state.(alert) here alert is the name of the reducer from which we want to grab the state
})

export default connect(mapStateToProps)(Alert)
