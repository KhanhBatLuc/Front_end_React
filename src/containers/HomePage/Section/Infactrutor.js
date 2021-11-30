import React, { Component } from 'react';
import { connect } from 'react-redux';
import Slider from "react-slick";
import  "./Infactrutor.scss"
import "../CommonScss.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FormattedMessage } from 'react-intl';
import {SampleNextArrow,SamplePrevArrow} from "./Button"
class Infactructor extends Component {

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

       <div  className="div-caro infastructor">       
        <div className="div-caro-child infastructor-child">
        <h2 className="div-title-head title-infac"> <FormattedMessage id='homeHeader.infactructor'/></h2>
        <button className="loadmore"> <FormattedMessage id='homeHeader.loadmore'/></button>
            <Slider className="" {...settings}>
            <div className="parent-infacstructor" >
                <div className="img-infacstructor">
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w500/2020/04/13/114446-anh-bia-bvk.jpg" alt="" />
                    <h3 className="title-infacstructor">Benh vien 1</h3>
                </div>
                <div className="img-infacstructor">
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w500/2020/05/29/112414-pk-dhyd1.jpg" alt="" />
                    <h3 className="title-infacstructor">Benh vien 2</h3>
                </div>
                <div className="img-infacstructor">
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w500/2021/09/14/095119-benh-vien-cho-ray-h1.jpg" alt="" />
                    <h3 className="title-infacstructor">Benh vien 3</h3>
                </div>
                <div className="img-infacstructor">
                    <img className="img-child" src="https://cdn.bookingcare.vn/fr/w500/2020/06/03/114348-bv-viet-duc.jpg" alt="" />
                    <h3 className="title-infacstructor">Benh vien 4</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Infactructor);
