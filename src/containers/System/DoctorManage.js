import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import "./DoctorManage.scss"
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';
import * as  actions  from '../../store/actions';
import { LANGUAGES } from '../../utils/constant';
import { push } from 'connected-react-router';
import { getInfoDoctor } from '../../services/userService';

const mdParser = new MarkdownIt()
class DoctorManage extends Component {
    
    state ={
        textMark:'',
        textHtml:'',
        optionDoctor:'',
        textarea:'',
        selects: [],
        
        priceArr: [],
        provinceArr: [],
        paymentArr: [],
        startPrice: '',
        startProvince: '',
        startPayment: '',
        nameClinic: '',
        adderss: '',
        note: '',
        action:'SAVE'
        
    }


    componentDidMount(){
        this.props.SelectDoctor()
       
    }
    async componentDidUpdate(prevProps,preveState,snapshot){  
        const {res,resPayment,resPrice,resProvince} = this.props.select
       if(prevProps.select !== this.props.select){
           let dataselect = this.checkSelectLanguage(res.mess, 'USER')
          
           this.setState({
               selects:dataselect,
               optionDoctor:dataselect[0]['id']
           })
           
           //res payment
           let dataresPayment = this.checkSelectLanguage(resPayment.data.mess)           
           this.setState({
               paymentArr: dataresPayment,
               startPayment:dataresPayment[0].type
               
           })
           //res price
           let dataPrice = this.checkSelectLanguage(resPrice.data.mess,'PRICE')
           this.setState({
               priceArr: dataPrice,
               startPrice:dataPrice[0].type
               
           })
           //res province
           let dataProvince = this.checkSelectLanguage(resProvince.data.mess)           
           this.setState({
               provinceArr: dataProvince,
               startProvince:dataProvince[0].type
               
           })
        }

       
        if (prevProps.language !== this.props.language) {
           //res           
            if ( res &&res.mess.length > 0) {
                let dataselect = this.checkSelectLanguage(res.mess,'USER')       
                this.setState({
                    selects:dataselect,
                    optionDoctor:dataselect[0]['id']
                })
            }
            //end res
            // res payment
            if (resPayment && resPayment.data.mess.length > 0) {
                let dataresPayment = this.checkSelectLanguage(resPayment.data.mess)
                this.setState({
                    paymentArr:dataresPayment,
                    startPayment:dataresPayment[0].type
                })
            }
            //end res payment
            //res price
            if (resPrice && resPrice.data.mess.length > 0) {
                let dataPrice = this.checkSelectLanguage(resPrice.data.mess,'PRICE')           
                this.setState({
                    priceArr: dataPrice,
                    startPrice:dataPrice[0].type
                })
                
            }
            // end res price
            //res province
            if (resPrice && resPrice.data.mess.length > 0) {
                let dataProvince = this.checkSelectLanguage(resProvince.data.mess)           
                this.setState({
                    provinceArr: dataProvince,
                    startProvince:dataProvince[0].type
                })
                
            }
            //end res province


            
        }
        
    }

   
     handleEditorChange =({ html, text })=>{
        this.setState({
            textMark:text,
            textHtml :html
        })
    
    }
    
    handleChangeDoctor = async (e) => {
        this.setState({
            optionDoctor: e.target.value,
        })      
        let data = await getInfoDoctor(e.target.value)
      
        if (data.code === 1 && data.mess) {
            if (data.mess.Markdown.doctorId == e.target.value) {
                this.setState({
                    action:'EDIT'
                })
            } else {
                this.setState({
                    action:'SAVE'
                })
            }
            this.setState({
                
                textMark: data.mess.Markdown.contentMark ? data.mess.Markdown.contentMark:'',
                textHtml: data.mess.Markdown.contentHtml  ? data.mess.Markdown.contentHtml:'',
                textarea:  data.mess.Markdown.description  ? data.mess.Markdown.description:'',
                startPrice:  data.mess.InfoDoctor.priceId  ? data.mess.InfoDoctor.priceId:'',
                startProvince:   data.mess.InfoDoctor.provinceId  ? data.mess.InfoDoctor.provinceId:'',
                startPayment:  data.mess.InfoDoctor.paymentId ? data.mess.InfoDoctor.paymentId:'',
                nameClinic:  data.mess.InfoDoctor.nameClinic  ? data.mess.InfoDoctor.nameClinic:'',
                adderss:  data.mess.InfoDoctor.addressClinic  ? data.mess.InfoDoctor.addressClinic:'',
                note: data.mess.InfoDoctor.note ? data.mess.InfoDoctor.note : '',                
               
            })
           
        }
        
    }

    handleSub = ()=>{
        const { textMark, textHtml, optionDoctor, textarea,
                 startPrice, startProvince,
            startPayment, nameClinic, note, adderss, action } = this.state

        this.props.SubmitDoctor({
            contentHtml: textHtml,
            contentMark: textMark,
            description: textarea,
            doctorId: optionDoctor,
            priceId:startPrice,
            provinceId:startProvince,
            paymentId:startPayment,
            addressClinic:adderss,
            nameClinic:nameClinic,
            note: note,
            action: action
            

        })
    }
    checkSelectLanguage =(input , param)=>{
      
        let newArr = []
      if(input && input.length >0){
          input.map((e)=>{
              let obj = {}
              if (param === 'USER') {
                let laVi = `${e.firstName} ${e.lastName}`
                let laEn = `${e.lastName} ${e.firstName}`
                obj.lang = this.props.language === LANGUAGES.VI ? laVi : laEn
                obj.id = e.id
              } else if (param === 'PRICE') {             
                    obj.type = e.keyMap
                    let valueVi = e.valueVi+` VND`
                    let valueEn = e.valueEn+` USD`
                    obj.value = this.props.language === LANGUAGES.VI ? valueVi : valueEn                                  
              }
               else {
                  obj.type = e.keyMap
                  let valueVi = e.valueVi
                  let valueEn = e.valueEn
                  obj.value = this.props.language === LANGUAGES.VI ? valueVi : valueEn                  
              }
              
              newArr.push(obj)
            })
      }
       return newArr
    }
    
    handleChangeInput = (e,asigment) => {
        let copyState = { ...this.state }
        copyState[asigment] = e.target.value
        this.setState({
            ...copyState
        })
    }

    render(){      
        console.log("this is main state",this.state)
        const { textMark, textHtml, optionDoctor, textarea, selects,
                priceArr, provinceArr, paymentArr, startPrice, startProvince,
                startPayment,nameClinic,note,adderss,action} = this.state
        return(
            <>
            <div className="doctor-partent">
                <h4 className="text-center inf">Tao thong tin Bac Si</h4>
            <div className="header-partent">
                        <div className="col-one-left">
                            <label htmlFor="select-doctor" className="text-choss">Select Doctor</label>
                            <select name="" id="select-doctor" value={optionDoctor} onChange={(e)=>this.handleChangeDoctor(e)}>
                            {
                                selects&&selects.length>0&&
                                selects.map((item,index)=>{
                                    return(
                                        <option keys={index} value={item.id}>{item.lang}</option>
                                    )
                                })
                            }
                            
                            </select>
                        </div>
                        <div className="col-one-right">                            
                            <label htmlFor="text" className="text-choss">Description</label>                            
                            <textarea name="" id="text" value={textarea} onChange={(e) => this.handleChangeInput(e,'textarea')} rows="4">                                
                            </textarea>                            
                        </div>
                        
                        <div className="infor-doctor">
                            <div className="row">
                                <div className="col-sm-4">
                                <label htmlFor="text" className="text-choss">Price</label>     
                                    <select  className="full__size" value={startPrice} onChange={(e)=>this.handleChangeInput(e,'startPrice')}  name="" id="">
                                        {
                                            priceArr && priceArr.length > 0 &&
                                            priceArr.map((e, index) => (
                                                <option keys={index} value={e.type}>{e.value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label htmlFor="text" className="text-choss">Payment</label>     
                                    <select  className="full__size" value={startPayment} onChange={(e)=>this.handleChangeInput(e,'startPayment')} name="" id="">
                                         {
                                            paymentArr && paymentArr.length > 0 &&
                                            paymentArr.map((e, index) => (
                                                <option keys={index} value={e.type}>{e.value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                                <div className="col-sm-4">
                                <label htmlFor="text" className="text-choss">Province</label>     
                                    <select  className="full__size" value={startProvince} onChange={(e)=>this.handleChangeInput(e,'startProvince')} name="" id="">
                                        {
                                            provinceArr && provinceArr.length > 0 &&
                                            provinceArr.map((e, index) => (
                                                <option keys={index} value={e.type}>{e.value}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-4">
                                    <label htmlFor="text" className="text-choss">name Clinic</label>
                                    <input  className="full__size" value={nameClinic} onChange={(e)=>this.handleChangeInput(e,'nameClinic')} type="text" />
                                </div>
                                <div className="col-sm-4">
                                    <label htmlFor="text" className="text-choss">Address</label>  
                                    <input  className="full__size" value={adderss} onChange={(e)=>this.handleChangeInput(e,'adderss')} type="text" />
                                </div>
                                <div className="col-sm-4">
                                    <label htmlFor="text" className="text-choss">Note</label>    
                                    <input className="full__size" value={note} onChange={(e)=>this.handleChangeInput(e,'note')}  type="text" />
                                </div>
                            </div>
                        </div>

                        <MdEditor style={{ height: '500px' }} renderHTML={text => mdParser.render(text)} value={textMark} onChange={this.handleEditorChange} />
                        
                    </div>
                    
                </div>
                
                <button className={action === 'SAVE' ? 'btn btn-success' : 'btn btn-warning'} onClick={this.handleSub}>{ action === 'SAVE'?'SAVE':'EDIT'}</button>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
    
      select : state.admin.selectDoctor,
      language: state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
      
        SelectDoctor: ()=> dispatch(actions.actionReduxSelectDoctor()),
        SubmitDoctor : (data)=> dispatch(actions.submitDescripDoctor(data))
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);