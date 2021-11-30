import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../../utils';
import "./Loading.scss"

class Loading extends Component {


    render() {
      
     
        return (
            <>
                 <div id="pre-loader">                    
                        <img  src="../load.gif" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Loading);
