import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfoAddress } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import "./OverLoading.scss"
import LoadingOverlay from 'react-loading-overlay';
class OverLoading extends Component {


    render() {
      
     const {active} = this.props
        return (
            <>
            <div className="over__partent">
              <LoadingOverlay
                  active={active}
                  spinner
                  text='Please Check Mail...'
                  >
              </LoadingOverlay>
             </div>
        </>
          )
    
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OverLoading);
