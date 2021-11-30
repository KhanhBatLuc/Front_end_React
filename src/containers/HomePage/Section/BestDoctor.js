import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import Slider from "react-slick";
import  "./BestDoctor.scss"
import "../CommonScss.scss"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {SampleNextArrow,SamplePrevArrow} from "./Button"
import * as  actions  from '../../../store/actions';
import { LANGUAGES } from '../../../utils/constant'
import { withRouter } from 'react-router';
import Loading from '../CommonComponent/Loading';

class BestDoctor extends Component {

    state = {
        sDoctor:[]
    }
    componentDidMount = ()=>{

        this.props.showDoctorRedux()
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        if(prevProps.doctorState !== this.props.doctorState){
            this.setState({
                sDoctor:this.props.doctorState
            })
        }
    }
    handleRedirect = (id) => {      
         this.props.history.push(`/detail/${id}`)
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
          
          // props
          const {sDoctor} = this.state
          const {language} = this.props
        return (
            <div  className="div-caro doctor">         
        {sDoctor && sDoctor.length >0 ? '':<Loading/>}
        <div className="div-caro-child doctor-child">
        <div className="title-introl-doctor">
        <h2 className="name"> <FormattedMessage id='homeHeader.doctor'/></h2>
        <button className="loadmore-doctor"><FormattedMessage id='homeHeader.loadmore'/></button>
        </div>

            <Slider className="" {...settings}>        
            <div className="parent-doctor" >
                {
                    sDoctor && sDoctor.length > 0 &&
                    sDoctor.map((e,index)=>{
                        let imageBs64 = ''
                        if(e.image){
                           imageBs64 = new  Buffer (e.image , 'base64').toString('binary')
                        
                        }
                        return (
                            <div keys = {index} onClick={()=>this.handleRedirect(e.id)} className="img-doctor">
                                <div className="img-radius">
                                    <img className="img" src={imageBs64?imageBs64:''} alt="" />                       
                                </div>
                                <h3 className="name-doctor">{e.firstName} {e.lastName}</h3>
                                <h4 className="name-h4">{ language === LANGUAGES.EN ? e.positionData.valueEn : e.positionData.valueVi}</h4>
                            </div>
                        )
                    })
                }
                
                        </div>
                        
                    
          
        </Slider>
        </div>
    
        </div>
    
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        doctorState: state.admin.doctor,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showDoctorRedux: ()=> dispatch(actions.actionReduxDoctor())
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BestDoctor));
