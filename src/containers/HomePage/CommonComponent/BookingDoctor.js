import React, { Component } from 'react';
import { connect } from 'react-redux';
import { infoBookingDoctor } from '../../../services/userService';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import { LANGUAGES } from '../../../utils';
import "./BookingDoctor.scss"
import moment from 'moment';
import FaceBookLike from '../../SocialPlugin/FaceBookLike';
require('dotenv').config()
class BookingDoctor extends Component {
    state = {
       data:{}
    }
    async componentDidMount() {
        let data = await this.callApiBookingDoctor(this.props.id)       
        if(data.image){
          data.image = new  Buffer (data.image , 'base64').toString('binary')        
        }
        this.setState({
            data:data
        })
    }

    componentDidUpdate(preveProps, preveState, snapshot) {
        // if (preveProps.id !== this.props.id) {
        //     let data = this.showP()
        //     console.log('disupdate',data);
        // }
    }

    callApiBookingDoctor = async (id) => {
        let res = {}
        let data = await infoBookingDoctor(id)
        if (data && data.code === 1) {
            res = data.mess
        }
        return res
    }



    render() {
        const { data } = this.state
        const { language, day } = this.props
        let VN = '', EN = ''
        if (data && data.positionData) {
           VN = `${data.firstName} ${data.lastName},${data.positionData.valueVi}` 
           EN = `${data.lastName} ${data.firstName},${data.positionData.valueEn}`             
        }
        let text = []
        if (data&&data.InfoDoctor && data.InfoDoctor.nameClinic && data.InfoDoctor.addressClinic) {
            text[0] = data.InfoDoctor.nameClinic + ' ' + data.InfoDoctor.addressClinic
            
            if (data && data.InfoDoctor &&
                data.InfoDoctor.paymentData &&
                data.InfoDoctor.priceData && data.InfoDoctor.paymentData.valueVi
                  &&data.InfoDoctor.paymentData.valueEn
            ) {
                text[1] =  data.InfoDoctor.paymentData.valueVi + ' : ' + data.InfoDoctor.priceData.valueVi+' VND'
                text[2] = data.InfoDoctor.paymentData.valueEn + ' : ' + data.InfoDoctor.priceData.valueEn+' USD'
                
            }
        }
        let url =  process.env.REACT_APP_LOCALHOST === 1 ? "link web" : window.location.href
        return (
            <>
                 <Row>
                    <Col xs={3}>                            
                    <div className="img__partent">
                        <img src={data.image?data.image:''} alt="" />                                        
                    </div>
                    </Col>
                    <Col xs={6}>      
                      <div className="right___intro">
                        <div className="__name">
                        <h3>{ language === LANGUAGES.VI ? VN : EN}</h3>
                            <div className="entetaimet">
                                <p>
                                   {text[0]}
                                </p>
                                </div>
                                {
                                    day &&
                                    <>
                                        <h4>{day && moment(day.date).format('MM/DD/YYYY')}</h4>
                                <h4>{day && day.mapTime && language === LANGUAGES.VI ? day.mapTime.valueVi : day.mapTime.valueEn}</h4>
                                <span className="alert alert-info">{ language === LANGUAGES.VI ? text[1] : text[2]}</span>
                                    </>
                                }
                                
                            
                        </div>
                        </div>
                        <div className="plugin">
                            {/* <FaceBookLike
                            href={url}
                            /> */}                            
                        </div>
                    </Col>
                </Row>
          </>
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingDoctor);
