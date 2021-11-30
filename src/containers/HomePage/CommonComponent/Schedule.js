import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfoAddress } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import * as  actions from '../../../store/actions';
import "./Schedule.scss"
import moment from 'moment';
import ModalBooking from '../Section/ModalBooking';


class Schedule extends Component {
    state = {
        showSD: '',
        days: [],
        timebut: [],
        isModal: false,
        statesend:{}
    }
    async componentDidMount() {
         await this.props.getDoc(this.props.idprops)
        await   this.createDate(this.props.language)
        //    ***************************F
        if (this.state.days && this.state.days.length > 0) {

            await this.props.getTime({
                    id: this.props.idprops,
                    date:this.state.days[0].value
            })
            await this.setState({
                        timebut: this.props.buttontime
                    })    
            }
           
        }
        async componentDidUpdate(preveProps, preveState, snapshot) {         
            if (preveProps.language !== this.props.language) {
                this.createDate(this.props.language)
            }
            if (preveProps.buttontime !== this.props.buttontime) {
               
             }
    
    }

    createDate = (language) => {
        let array = []
        // modify day
        moment.updateLocale('vn', {
            weekdays : [
                "Chủ Nhật", "Thứ hai", "Thứ ba", "Thứ tư", "Thứ năm", "Thứ sáu", "Thứ bảy"
            ]
        });
        for (let i = 0; i < 7; i++) {
            let obj={}
            if (LANGUAGES.VI === this.props.language) {
            obj.lable = moment(new Date()).add(i,'days').locale('vn').format('dddd DD/MM')
            } else {
            obj.lable = moment(new Date()).add(i,'days').locale('en').format('dddd DD/MM')
            }
            obj.value = moment(new Date()).add(i,'days').startOf('day').valueOf()
            
            array.push(obj)
        }       
            this.setState({
                days : array
            })
    }
    

     handleChangeDay = async(e) => {
       await this.props.getTime({
                       id: this.props.idprops,
                       date:e.target.value
       })
         this.setState({
             timebut:this.props.buttontime
         })
    }
    
    handleBooking = (item) => {
        this.setState({
            isModal: !this.state.isModal,
            statesend:item
        })
    }
    toggleModal = () => {
        this.setState({
            isModal: !this.state.isModal
        })
    }
   
    render() {
        const {  days, timebut } = this.state
        const { language } = this.props
        return (
            <>
            <ModalBooking
            show={this.state.isModal}
            toggleModal={this.toggleModal}
            id={this.props.idprops}
            day = {this.state.statesend}
        /> 

                 <div className="book__schedule">
                                    <div className="form__select">
                                        <select onChange={(e)=>this.handleChangeDay(e)} id="select__time">
                                            {days && days.length > 0 &&
                                                days.map((e,index) => (
                                                    <option keys={index} value={e.value}>{ e.lable }</option>
                                                ))
                                            }
                                        </select>
                                    </div>
                                    <div className="schedule">
                                        <div className="font__schedule">
                                        <span className="span__head"><i class="fas fa-calendar-alt"></i>&nbsp;CHOOSE SCHEDULE</span>
                                       </div>
                                        <div className="box__button">
                                            {
                                                timebut && timebut.length > 0 ?
                                                timebut.map((item, index) => (
                                                    
                                                    <button onClick={()=>this.handleBooking(item)} keys={index}><span className="button__text">
                                                        {language === LANGUAGES.VI ? item.mapTime.valueVi : item.mapTime.valueEn}
                                                    </span></button>

                                                )) :
                                                    <h3>The Doctor haven't schedule </h3>
                                            }
                                            
                                        </div>
                                       
                                        <div className="font__schedule">
                                        <span> <i class="far fa-hand-point-up"></i>&nbsp;Click </span>
                                       </div>
                                    </div>
                </div>
                </>

        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        buttontime: state.admin.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoc: (id) => dispatch(actions.getDetail(id)),
        getTime: (data)=>dispatch(actions.calltimeschedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);
