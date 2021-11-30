import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getInfoAddress } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import "./InfoDoctor.scss"

class InfoDoctor extends Component {
    state = {
        isToggle: true,
        dataInfo:{}
    }
    async componentDidMount() {
        const {id} = this.props
        const data = await getInfoAddress(id)
        if (data && data.code === 1) {
            this.setState({
                dataInfo:data.mess
            })
        } 
    }

    componentDidUpdate(prevProps , prevState , snapshot ) {
        
    }
    // toggle hidden visible
    handleToggle = () => {
        this.setState({
            isToggle: !this.state.isToggle
        })
    }
    // --------------------
    render() {
        
        const { isToggle, dataInfo } = this.state
        const { language } = this.props     
        return (
          <>
             <div className="check__price">
                        <div className="address_public">
                            <h4>Dia chi phong kham</h4>
                        <p><span className="span_name">{dataInfo&&dataInfo.nameClinic}<br/>
                        { language === LANGUAGES.EN ?
                        dataInfo && dataInfo.provinceData && dataInfo.provinceData.valueEn :
                        dataInfo && dataInfo.provinceData && dataInfo.provinceData.valueVi}
                        </span><br />
                        {dataInfo&&dataInfo.addressClinic}</p>
                        </div>
                        <div className="price">
                            <h3>gia kham</h3>
                            <div className={isToggle ?"detail__prices toggle":" detail__prices "}>
                                <div className="lay__up">
                                    <h4 className="title__price">
                                    Giá khám
                                    </h4>
                                    <h4 className="right__price">
                                    {
                                        
                                        language === LANGUAGES.EN ?
                                            dataInfo && dataInfo.priceData && dataInfo.priceData.valueEn+" $" :
                                            dataInfo && dataInfo.priceData && dataInfo.priceData.valueVi+" VND"
                                    }
                                    </h4>                                            
                                    <p className="detail__title">
                                    {dataInfo&&dataInfo.note}
                                    </p>
                                    
                                </div>
                                <div className="lay__down">
                                <p className="detail__title">Người bệnh có thể thanh toán chi phí bằng hình thức {
                                 language === LANGUAGES.EN ?
                                 dataInfo && dataInfo.paymentData && dataInfo.paymentData.valueEn :
                                 dataInfo && dataInfo.paymentData && dataInfo.paymentData.valueVi
                                }</p>
                                </div>
                            </div>
                            <button className="toggle__click" onClick={this.handleToggle}>
                                Click toggle
                            </button>
                        </div>
                </div>
                
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

export default connect(mapStateToProps, mapDispatchToProps)(InfoDoctor);
