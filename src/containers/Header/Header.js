import React, { Component } from 'react';
import { connect } from 'react-redux';
import {LANGUAGES} from "../../utils/constant"
import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { setLanguages } from '../../store/actions';
import { adminMenu , doctorMenu } from './menuApp';
import { ROLE } from '../../utils';
import './Header.scss';
class Header extends Component {

    state={
        menu:[]
    }
    handleChangeLanguage = (lang)=>{
        this.props.changeLanguageHeader(lang)
    }

    componentDidMount =()=>{
        const { info} = this.props
        if(info.roleId === ROLE.ADMIN)
        {
            this.setState({
                menu:adminMenu
            })
        }
        if(info.roleId === ROLE.DOCTOR)
        {
            this.setState({
                menu:doctorMenu
            })
        }
    }

    render() {
        
        const { processLogout, lang } = this.props;      
        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={this.state.menu} />
                </div>
                <div className="header-right">
                <div className="changeLanguage">
                    <span 
                    className={lang && lang === LANGUAGES.EN ?'active':''}
                    onClick={()=>this.handleChangeLanguage(LANGUAGES.EN)}
                    >EN</span>
                    <span 
                    className={lang && lang === LANGUAGES.VI ?'active':''}
                    onClick={()=>this.handleChangeLanguage(LANGUAGES.VI)}
                    >VI</span>
                </div>
                {/* nút logout */}
                <div className="btn btn-logout" onClick={processLogout}>
                    <i className="fas fa-sign-out-alt"></i>
                </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        lang: state.app.language,
        info : state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageHeader: (lang)=> dispatch(setLanguages(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
