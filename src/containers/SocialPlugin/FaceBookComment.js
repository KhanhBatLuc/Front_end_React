import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { LANGUAGES } from '../../utils/constant';
require('dotenv').config()
class FaceBookComment extends Component {

   
    initFacebookSDK() {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        let { language } = this.props;
        let locale = language === LANGUAGES.VI ? 'vi_VN' : 'en_US'
        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                cookie: true,  // enable cookies to allow the server to access
                // the session
                xfbml: true,  // parse social plugins on this page
                version: 'v2.5' // use version 2.1
            });
        };
        // Load the SDK asynchronously
        (function (d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = `https://connect.facebook.net/${locale}/sdk.js`;
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
    componentDidMount() {
        this.initFacebookSDK()
    }
   
    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if (prevProps.language !== this.props.language) {
            this.initFacebookSDK()
        }
    }


     
    render() {
        const {href,width,numberPost} = this.props
        return (
            <div class="fb-comments"
                
                data-href="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0&appId=961006038095820&autoLogAppEvents=1"
                data-width={width}
                data-numposts={numberPost ? numberPost : 5}>
                
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FaceBookComment);