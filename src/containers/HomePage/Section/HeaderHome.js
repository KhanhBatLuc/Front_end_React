import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import {LANGUAGES} from "../../../utils/constant"
import { setLanguages } from '../../../store/actions';
import { path } from '../../../utils'
import { withRouter } from 'react-router';
import './HeaderHome.scss'
class HeaderHome extends Component {

    handleChangeLanguage = (lang)=>{
        this.props.changeLanguageHeader(lang)
    }

    transRedirect = () => {
        this.props.history.push(path.HOME_PAGE)
    }
    render() { 
          
        const {lang,show} = this.props  
        return (
        <React.Fragment>
              <div className="home-container">
              <div className="header-left">
                <i className="fas fa-bars"></i>
                <img className="img-header" onClick={this.transRedirect} src="https://bookingcare.vn/assets/icon/bookingcare-2020.svg" alt="" />
              </div>
              <div className="header-center">
                <ul className="center-intro">
                    <li className="center-intro-child">
                        <a href="">
                            <span className="line-one"><FormattedMessage id="homeHeader.tranSpecitalist"/></span>
                            <span className="detail-hearder"><FormattedMessage id="homeHeader.search-doctor"/></span>
                        </a>
                    </li>
                    <li className="center-intro-child">
                        <a href="">
                            <span className="line-one"><FormattedMessage id="homeHeader.doctor"/></span>
                            <span className="detail-hearder"><FormattedMessage id="homeHeader.choose-doctor"/></span>
                        </a>
                    </li>
                    <li className="center-intro-child">
                        <a href="">
                            <span className="line-one"><FormattedMessage id="homeHeader.infrastructure"/></span>
                            <span className="detail-hearder"><FormattedMessage id="homeHeader.choose-hospital"/></span>
                        </a>
                    </li>
                    <li className="center-intro-child">
                        <a href="">
                            <span className="line-one"><FormattedMessage id="homeHeader.check-general"/></span>
                            <span className="detail-hearder"><FormattedMessage id="homeHeader.choose-general"/></span>
                        </a>
                    </li>
                </ul>
              </div>
              <div className="header-right">
                    <div className="question">
                    <i className="far fa-question-circle"></i>
                        <span className="support"><FormattedMessage id="homeHeader.support"/></span>
                    </div>
                    <div className="language">
                        <span className={lang && lang === "vi" ? 'active' :''} onClick={()=>this.handleChangeLanguage(LANGUAGES.VI)}>Vn</span>
                        <span className={lang && lang === "en" ? 'active' :''} onClick={()=>this.handleChangeLanguage(LANGUAGES.EN)}>En</span>
                    </div>
              </div>
                </div>
                {
                    show === true ?
                
             <div className="home-banner">
                 <div className="search-info">
                     <div className="introl">
                         <h1 className="text-introl">
                         <FormattedMessage id="banner.text-center"/> <br/>
                         <b>
                         <FormattedMessage id="banner.text-center2"/>
                         </b>
                         </h1>
                     </div>
                     <div className="ipnut-search">
                        <div className="search-now">
                        <i className="fas fa-search"></i>
                        <input type="text" className="input-search-text" placeholder="Search now" />
                        </div>
                     </div>
                 </div>
                 <div className="section-doctor">
                    <ul className="section-partent">
                        <li className="section-chilsd">
                            
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/kham_chuyenkhoa.png" alt="" />
                                </div>
                                 <FormattedMessage id="banner.specialist"/>
                                <br/> 
                                <FormattedMessage id="banner.specialist-examination"/>
                           
                        </li>
                        <li className="section-chilsd">
                           
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/kham_tuxa.png" alt="" />
                                </div>
                                 <FormattedMessage id="banner.specialist"/>
                                <br/>
                                <FormattedMessage id="banner.specialist-remote"/>
                           
                        </li>
                        <li className="section-chilsd">
                           
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/kham_tongquat.png" alt="" />
                                </div>
                                 <FormattedMessage id="banner.specialist"/>
                                <br/>
                                <FormattedMessage id="banner.specialist-generate"/>
                           
                        </li>
                        <li className="section-chilsd">
                           
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/dichvu_xetnghiem.png" alt="" />
                                </div>
                                <FormattedMessage id="banner.medical-test"/>
                               <br/>
                               <FormattedMessage id="banner.medical-test2"/>
                           
                        </li>
                        <li className="section-chilsd">
                           
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/suckhoe_tinhthan.png" alt="" />
                                </div>
                                <FormattedMessage id="banner.mental-health"/>
                                <br/>
                                <FormattedMessage id="banner.mental-health2"/>
                           
                        </li>
                        <li className="section-chilsd">
                           
                                <div className="show-icon">
                                    <img src="https://bookingcare.vn/assets/anh/kham_nhakhoa.png" alt="" />
                                </div>
                                 <FormattedMessage id="banner.specialist"/>
                                <br/>
                                <FormattedMessage id="banner.dentistry"/>
                          
                        </li>
                    </ul>
                 </div>
             </div>:''
            }
        </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageHeader: (lang)=> dispatch(setLanguages(lang))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HeaderHome));
