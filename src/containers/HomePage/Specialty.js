import React, { Component } from 'react';
import { connect } from 'react-redux';
import HeaderHome from './Section/HeaderHome';
 import "./Specialty.scss"
import { getAllcode ,getProvince } from '../../services/userService';
import { LANGUAGES } from '../../utils/constant';
import BookingDoctor from '../HomePage/CommonComponent/BookingDoctor'
import InfoDoctor from '../HomePage/CommonComponent/InfoDoctor'
import Schedule from './CommonComponent/Schedule';
import OverLoading from './CommonComponent/OverLoading';

class Specialty extends Component {
    state = {
        toggle: true,
        province: [],       
        data: [],

       
    }
    async componentDidMount() {
        let data = await getAllcode('PROVINCE')
        let show = await getProvince(this.state.first)
        if (data && data.data && data.data.code === 3 && show && show.code ===1) {
            this.setState({
                province: data.data.mess,
                data: show.mess
            })
        }
    }



    toggle = () => {
        this.setState({
            toggle: !this.state.toggle
        })
    }

    changeHandle = async(e) => {
        let data = await getProvince(e.target.value)
        if (data && data.code === 1) {
            this.setState({
                data: data.mess
            })
        }
    }
   


    render() {
        const { toggle, province,data,first } = this.state
        const { language } = this.props
        console.log('render',data);
        return (
            <>
              
              
                <HeaderHome show={false} />
                <div className="intro">
                    <div className="introl__con">
                        <div className={toggle ? "con" : "toggle con"}>
                            <div className="sibling">
                       <p><strong>Giáo sư, Tiến sĩ, Bác sĩ Đào Văn Long</strong></p>
                                <ul>
                                <li>Giáo sư, Tiến sĩ, Bác sĩ chuyên ngành Tiêu hóa - Gan mật</li>
                                <li>Nguyên Giám đốc bệnh viện Đại Học Y Hà Nội</li>
                                <li>Nguyên Tổng thư ký hội khoa học tiêu hóa Việt Nam</li>
                                <li>Nguyên Trưởng khoa tiêu hóa Bệnh viện Bạch Mai</li>
                                <li>Nguyên Giám đốc Trung tâm Nội soi Bệnh viện Đại học Y Hà Nội</li>
                                <li>Tốt nghiệp Đại học Y Hà Nội (1983)</li>
                                <li>Tốt nghiệp Bác sĩ Nội trú trường Đại học Y Hà Nội (1986)</li>
                                <li>Tốt nghiệp tiến sĩ Y khoa (1993)</li>
                                <li>Bác sĩ không thăm khám ban đầu, chỉ đọc kết quả</li>
                                </ul>
                                <p><strong>Lưu ý: Quy trình sau đây áp dụng khi đi khám chữa bệnh với Giáo sư, Tiến sĩ Đào Văn Long</strong></p>
                                <p><em>Tại Phòng khám Đa khoa Hoàng Long - Tầng 10, Tháp VCCI, Số 9 Đào Duy Anh, Đống Đa, Hà Nội</em></p>
                                <ol>
                                <li>Quy trình đi khám bệnh Tiêu hóa với Giáo sư Đào Văn Long</li>
                                <li>Bước 1: Bác sĩ chuyên khoa Nội khám và kiểm tra tình trạng chung của người bệnh</li>
                                <li>Bước 2: Bác sĩ chuyên khoa Nội chỉ định chụp chiếu, xét nghiệm, nội soi (nếu cần)</li>
                                <li>Bước 3: Thực hiện các xét nghiệm, chụp chiếu, nội soi theo chỉ định (nếu có)</li>
                                <li>Bước 4: Ngưới bệnh gặp Giáo sư Đào Văn Long để đọc kết quả và phương án điều trị</li>
                                <li>Ghi chú: Bệnh nhân chỉ gặp Giáo sư Đào Văn Long ở Bước 4 (sau khi đã có kết quả xét nghiệm, chụp chiếu, nội soi)</li>
                                </ol>
                                </div>
                               
                        </div>
                    </div>
                        <span className="btn " onClick={this.toggle}>Load More</span>
                </div>
                <div className="main">
                    <div className="select">
                        
                        <select name="" id="special"  onChange={(e)=>this.changeHandle(e)} className="special__select">
                            <option value="">Toan quoc</option>
                            {
                                province && province.length > 0 &&
                                province.map((e) => (
                                    <option value={e.keyMap}>{language === LANGUAGES.VI ? e.valueVi : e.valueEn}</option>
                                ))
                            }
                        </select>
                                                
                        {
                            data && data.length > 0 &&
                            data.map((e ,index) => (
                                <div className="card">
                                    <div key={index} className="divide">                               
                                        <BookingDoctor
                                        id={e.doctorId}
                                        day={null}
                                        />
                                        <div className="left">
                                            <Schedule
                                            idprops={e.doctorId}
                                            />
                                        <InfoDoctor
                                        id={e.doctorId}
                                        />
                                        </div>
                                    </div>
                                </div>                                
                            ))
                        }
                        
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
     
    };
};

const mapDispatchToProps = dispatch => {
    return {
       
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
