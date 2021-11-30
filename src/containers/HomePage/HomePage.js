import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import HeaderHome from './Section/HeaderHome';
import Carosel from './Section/Carosel';
import Infactrutor from './Section/Infactrutor';
import BestDoctor from './Section/BestDoctor';
import  Media  from './Section/Media';
import Footer from './Section/Footer';

class HomePage extends Component {

    render() {       
        return (
          <div>
                <HeaderHome
                    show = {true}
                />
              <Carosel/>
                <Infactrutor/>
                <BestDoctor/>
                <Media/>
                <Footer/>
             
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
