import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import  "./Carosel.scss"
import "../CommonScss.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SampleNextArrow, SamplePrevArrow } from "./Button"
import { path } from '../../../utils'
class Carosel extends Component {

    redirect = (id) => {
        this.props.history.push(`/specialty/${id}`)
        console.log('redirect');
    }

    render() {  
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow/>,
            prevArrow: <SamplePrevArrow />
          };     
        return (

       <div  className="caro div-caro">       
        <div className="caro-child div-caro-child">
        <h2  className="title-head div-title-head"><FormattedMessage id='homeHeader.populate-specialty'/></h2>
            <Slider className="caro-cpn" {...settings}>
            <div className="parent-carosel" >
                <div className="img-carosel"onClick={()=>this.redirect(12)}>
                    <img className="img-child"  src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120331-co-xuong-khop.jpg" alt="" />
                    <h3 className="title-carosel"><FormattedMessage id='homeHeader.neurology'/></h3>
                </div>
                <div className="img-carosel" onClick={()=>this.redirect(12)}>
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120741-tim-mach.jpg" alt="" />
                    <h3 className="title-carosel"><FormattedMessage id='homeHeader.orthopedic-department'/></h3>
                </div>
                <div className="img-carosel" onClick={()=>this.redirect(12)}>
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/120933-tieu-hoa.jpg" alt="" />
                    <h3 className="title-carosel"><FormattedMessage id='homeHeader.reha'/></h3>
                </div>
                <div className="img-carosel" onClick={()=>this.redirect(12)}>
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w300/2019/12/13/121042-than-kinh.jpg" alt="" />
                    <h3 className="title-carosel"><FormattedMessage id='homeHeader.department'/></h3>
                </div>
                
            </div>
           
        </Slider>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Carosel));
