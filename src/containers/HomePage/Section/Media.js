import React, { Component } from 'react';
import { connect } from 'react-redux';
import  "./Media.scss"
class Media extends Component {

    render() {  
       
        return (
            <div className="media">
                <div className="media-child">
                <div className="left-media">
                <iframe 
                    width="100%" 
                    height="361" 
                    src="https://www.youtube.com/embed/CE6W2C_VjrY" 
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                    allowFullscreen></iframe>
                </div>
                <div className="right-media">
                    <h4>
                        Đây là bản test Demo 
                        các tính năng chưa được hoàn thiện.
                        Vui lòng đợi update chân thành và cảm ơn :))
                    </h4>
                </div>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Media);
