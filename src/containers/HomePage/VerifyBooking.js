import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './Section/HeaderHome';
// import "./VerifyBooking.scss"
import { confirmBooking } from '../../services/userService';
import { LANGUAGES } from '../../utils/constant';
import moment from 'moment';
class VerifyBooking extends Component {
    state = {
      ok:false
    }
   async componentDidMount() {
       let url = this.getQueryParams()
       let res = await confirmBooking(url)
       if (res && res.code === 1) {
           this.setState({
               ok:!this.state.ok
           })
       }
       
    }
    componentDidUpdate(preveProps, preveState, snapshot) {
       
    }

    redirect = () => {
        this.props.history.push('/home')
    }
     getQueryParams = () => window.location.search.replace('?', '').split('&').reduce((r,e) => (r[e.split('=')[0]] = decodeURIComponent(e.split('=')[1]), r), {});

    render() {

        return (
            <>               
                <HeaderHome show={false} />
                <div className="verify" style={{
                    margin: "0 auto",
                    width: "340px",
                    height:"300px"
                    }}>
                    <h4 className="text-center mb-2 mt-4" >{ this.state.ok === true ? 'CONFIRM BOOKING SCHEDULE SUCCESS :vvv' : 'CONFIRM FAILL :))'}</h4>
                    <button className="btn btn-success" style={{
                        margin: "48px 119px",
                        outline:"none"
                     }} onClick={this.redirect}>Go Back</button>
                </div>
                
          </>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
     
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyBooking);
