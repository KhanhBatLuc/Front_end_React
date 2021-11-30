import React, { Component } from 'react';
import { connect } from 'react-redux';
import  "./Footer.scss"
class Footer extends Component {

    render() {  
       
        return (
            <div className="footer">
               <h4>Coppyright & Khanhbatluc</h4>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Footer);
