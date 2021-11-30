import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './Section/HeaderHome';
import "./DetailDoctor.scss"
import * as  actions from '../../store/actions';
import { LANGUAGES } from '../../utils/constant';
import moment from 'moment';
import InfoDoctor from './CommonComponent/InfoDoctor';
import ModalBooking from './Section/ModalBooking';
import FaceBookLike from '../SocialPlugin/FaceBookLike';
import FaceBookComment from '../SocialPlugin/FaceBookComment';
require('dotenv').config()
class DetailDoctor extends Component {
    state = {
        showSD: '',
        days: [],
        timebut: [],
        isModal: false,
        statesend:{}
    }
   async componentDidMount() {
    await  this.props.getDoc(this.props.match.params.id)
    await   this.createDate(this.props.language)
    //    ***************************F
        if (this.state.days && this.state.days.length > 0) {        
        await this.props.getTime({
                id: this.props.match.params.id,
                date:this.state.days[0].value
            })
        }
       
    }
    componentDidUpdate(preveProps, preveState, snapshot) {
        if (preveProps.showDetail !== this.props.showDetail) {
            
                this.setState({
                    showSD: this.props.showDetail
                })
           
        }
        if (preveProps.language !== this.props.language) {
            this.createDate(this.props.language)
        }
        if (preveProps.buttontime !== this.props.buttontime) {
            this.setState({
                timebut: this.props.buttontime
            })
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

    handleChangeDay = (e) => {
     this.props.getTime({
                    id: this.props.match.params.id,
                    date:e.target.value
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
        const { showSD, days, timebut } = this.state
        const { language } = this.props    
        let VN = '', EN = ''
        if (showSD && showSD.positionData) {
           VN = `${showSD.firstName} ${showSD.lastName},${showSD.positionData.valueVi}` 
           EN = `${showSD.lastName} ${showSD.firstName},${showSD.positionData.valueEn}`             
        }
        let img = this.state.showSD.image
        let imageBs64 = ''        
        if (img) {
            imageBs64 = new  Buffer (img , 'base64').toString('binary')
        }
     
        // let d = moment(1636563600000).format('YYYY/MM/DD')
        // console.log(new Date(d).getTime());
        // console.log( moment(new Date()).add(1,'days').locale('en').weekdays());

        let url =  process.env.REACT_APP_LOCALHOST === 1 ? "link web" : window.location.href
        return (
            <>
                {/* modal booking */}
                <ModalBooking
                    show={this.state.isModal}
                    toggleModal={this.toggleModal}
                    id={this.props.match.params.id}
                    day = {this.state.statesend}
                />
                {/* end modal booking */}
                <HeaderHome show={false} />                
                <div className="box">
                    <div className="detail__doctor_partent">
                        <div className="header__doctor_schedule">
                            <div className="header__position">
                                <div className="header__left">
                                    <div className="img__box">
                                    <img src={imageBs64?imageBs64:''} alt="" />
                                    </div>
                                </div>
                                <div className="header__right">
                                    <h1 className="position__doctor">
                                    { language === LANGUAGES.EN ? EN : VN}
                                    </h1>
                                    <h6 className="descrip__doctor">
                                        {
                                           showSD&&showSD.Markdown&&showSD.Markdown.description
                                        }
                                    </h6>

                                    {/* plugin */}
                                    <div className="pluging">
                                    <FaceBookLike href = {url}/>                                    
                                   </div>
                                    
                                </div>
                            </div>
                            <div className="header__schedule">
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
                                {/* infodoctor */}
                                <InfoDoctor
                                id={this.props.match.params.id}
                                />
                                {/* end info doctor */}
                            </div>
                        </div>
                        <div className="troduce__exprience">
                        
                                
                                <div className="troduce" dangerouslySetInnerHTML={{ __html: showSD && showSD.Markdown &&showSD.Markdown.contentHtml }} />
                         
                        </div>
                        <FaceBookComment
                            href={url}
                            width="100%"
                            numberPost={6}
                        />
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
        showDetail: state.admin.detailDoctor,
        buttontime: state.admin.time
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getDoc: (id) => dispatch(actions.getDetail(id)),
        getTime: (data)=>dispatch(actions.calltimeschedule(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
