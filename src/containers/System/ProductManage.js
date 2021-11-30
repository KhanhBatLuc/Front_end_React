import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import CommonUtils from '../../utils/CommonUtils';
import {LANGUAGES ,manageActions , } from "../../utils"
import * as  actions  from '../../store/actions';
import "./ProductManage.scss"
import TableProduct from './admin/TableProduct';
import Loading from '../HomePage/CommonComponent/Loading.js';

class ProductManage extends Component {

    state = {
        gender:[],
        position:[],
        role:[],
        image:'',

        // form
        email:'',
        password:'',
        fname:'',
        lname:'',
        phone:'',
        address:'',
        gen:'',
        rol:'',
        posti:'',
        openEdit:'',
        idEdit:'',
        previewIMG :''


    }

     async componentDidMount() {
        // try {
        //        let data = await getAllcode("gender")            
        //     if(data && data.data.code === 3){              
        //         this.setState({
        //             gender:data.data.mess
        //         })
        //         console.log('ok');
            
        //         }else{
        //             console.log(data.data.mess);
        //         }
        //    } catch (error) {
        //        console.log(error.message);
        //    }
        await this.props.Reduxgender()
        await this.props.Reduxposition()
        await this.props.Reduxrole()
    
        
    }

    componentDidUpdate(prevProps, prevState,snapshot){
        if(prevState.gender !== this.props.genderdux){
            let genders =this.props.genderdux
            this.setState({              
                gender:genders,
                gen: genders && genders.length>0 ? genders[0].keyMap : ''
            })
        }
        if(prevState.position !== this.props.positionredux){
            let positionss = this.props.positionredux
            this.setState({                      
                position: positionss,
                posti:positionss && positionss.length>0 ? positionss[0].keyMap : ''           
            })
        }
        if(prevState.role !== this.props.roleredux){
            let roless =this.props.roleredux
            this.setState({                           
                role:roless,
                rol:roless && roless.length>0 ? roless[0].keyMap : ''  
            })
        }
        if(prevProps.users !== this.props.users){
            let roless =this.props.roleredux
            let genders =this.props.genderdux
            let positionss = this.props.positionredux
        
            this.setState({
                email:'',
                password:'',
                fname:'',
                lname:'',
                phone:'',
                address:'',
                image:'',
                previewIMG:'',
                openEdit:manageActions.ADD,
                gen: genders && genders.length>0 ? genders[0].keyMap : '',
                posti:positionss && positionss.length>0 ? positionss[0].keyMap : ''  ,
                rol:roless && roless.length>0 ? roless[0].keyMap : ''   
            })
        }
    }

    handleOnchangeImg = async(e)=>{
      
        if (e.target.files && e.target.files[0]) {
            let img = e.target.files[0];           
            let imgbs64 = await CommonUtils.blobToBase64(img)

                this.setState({
                image: imgbs64,
                previewIMG : URL.createObjectURL(img)
                });
          }
    }

    handleForm = (e,key)=>{
        let coppyState = {...this.state}
        coppyState[key] = e.target.value
        this.setState({
            ...coppyState
        })
     
    }

    validateInput = ()=>{
        const arrayCheck = ['email','fname','lname','phone','password','address','gen','rol','posti']
        for (let i = 0; i < arrayCheck.length; i++) {
            if(!this.state[arrayCheck[i]]){     
                alert('requried '+arrayCheck[i])         
                return false
            }
        }
        return true

    }
    handleSubmit = async()=>{
        let status = this.validateInput()
        if(!status){
          
        }
        else{
            // call api
            const {email,password,fname,lname,phone, address,gen,rol,posti,image,openEdit,idEdit} = this.state
            
            if(openEdit === manageActions.ADD){        
                await this.props.ReduxCreate({
                    email : email,
                    password :password,
                    fname :fname,
                    lname :lname,
                    address :address,
                    phonenumber :phone,
                    image:image,
                    sex :gen,
                    role :rol,
                    position :posti,
                })
            }else if(openEdit === manageActions.EDIT){
                await this.props.ReduxUpdate({                                       
                    fname :fname,
                    lname :lname,
                    address :address,
                    phonenumber :phone,
                    image:image,
                    sex :gen,
                    role :rol,
                    position :posti,
                    id:idEdit
                })
                this.setState({
                    idEdit:''
                })
            }
        
        }
    }

    handeledit = (e)=>{
      let imageBs64 = ''
      if(e.image){
         imageBs64 = new  Buffer (e.image , 'base64').toString('binary')
      
      }
        this.setState({
            email:e.email,
            password:'check',
            fname:e.firstName,
            lname:e.lastName,
            phone:e.phoneNumber,
            address:e.address,
            image:e.image,
            gen:e.gender,
            rol:e.roleId,
            posti:e.positionId,
            idEdit:e.id,
            openEdit:manageActions.EDIT,
            previewIMG : imageBs64
        })
       
       
        
    }

    render() {  
     
        let genders = this.state.gender   
        let positions = this.state.position   
        let roles = this.state.role   
        let img = this.state.image       
       const {email,password,fname,lname,phone, address,gen,rol,posti,openEdit,previewIMG} = this.state
        const {language,isLoad} = this.props
        return (
            <div className="redux-form">
                <h3 className="text-center "><FormattedMessage id="form-use.add"/></h3>
                { isLoad && isLoad === true ?<Loading/> : ''}
                <div className="outline">
                <div className="redux-child">
                    <div className="col-child">
                        <label htmlFor=""><FormattedMessage id="form-use.email"/></label>
                        <input className="text1" disabled={openEdit === manageActions.EDIT ? true :false} value={email} onChange={(e)=>this.handleForm(e,'email')} type="text" />
                        </div>
                    <div className="col-child">
                        <label htmlFor=""><FormattedMessage id="form-use.password"/></label>
                        <input className="text1" disabled={openEdit === manageActions.EDIT ? true :false} value={password} onChange={(e)=>this.handleForm(e,'password')} type="password" />
                        </div>
                    <div className="col-child">
                    <label htmlFor=""><FormattedMessage id="form-use.fname"/></label>
                    <input className="text1" value={fname} onChange={(e)=>this.handleForm(e,'fname')} type="text" />
                        </div>
                    <div className="col-child">
                    <label htmlFor=""><FormattedMessage id="form-use.lname"/></label>
                    <input className="text1" value={lname} onChange={(e)=>this.handleForm(e,'lname')} type="text" />
                        </div>
                </div>
                <div className="redux-child">
                   
                       <div className="col1">
                           <label htmlFor=""><FormattedMessage id="form-use.phonenumber"/></label>
                           <input className="text1" value={phone} onChange={(e)=>this.handleForm(e,'phone')} type="text" />
                       </div>
                      
                       <div className="col2">
                           <label htmlFor=""><FormattedMessage id="form-use.address"/></label>
                           <input className="text1" value={address} onChange={(e)=>this.handleForm(e,'address')} type="text" />
                       </div>
                   
                </div>
                <div className="redux-child">
                    <div className="col-child">
                    <label htmlFor=""><FormattedMessage id="form-use.gender"/></label>
                      <select onChange={(e)=>this.handleForm(e,'gen')} value={gen} className="text1 text" id="">
                          {
                              genders && genders.length > 0 &&
                              
                              genders.map((item)=>{
                               return ( 
                               <option keys={item.keyMap} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi:item.valueEn}</option>

                               )
                              })
                          }
                      </select>
                        </div>
                    <div className="col-child">
                    <label htmlFor=""><FormattedMessage id="form-use.position"/></label>
                    <select onChange={(e)=>this.handleForm(e,'posti')} value={posti} className="text1 text" id="">
                    {
                              positions && positions.length > 0 &&
                              
                              positions.map((item)=>{
                               return ( 
                               <option keys={item.keyMap} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi:item.valueEn}</option>

                               )
                              })
                          }
                      </select>
                        </div>
                    <div className="col-child">
                    <label htmlFor=""><FormattedMessage id="form-use.role"/></label>
                    <select onChange={(e)=>this.handleForm(e,'rol')} value={rol} className="text1 text" id="">
                    {
                              roles && roles.length > 0 &&
                              
                              roles.map((item)=>{
                               return ( 
                               <option keys={item.keyMap} value={item.keyMap}>{language === LANGUAGES.VI ?item.valueVi:item.valueEn}</option>

                               )
                              })
                          }
                      </select>
                        </div>
                    <div className="col-child">
                    <div className="uploadImg">
                        <label htmlFor="preview" 
                        
                        className="upload">Upload </label>
                        <input id="preview" type="file" hidden onChange = {(e)=> this.handleOnchangeImg(e)} />
                          <div className="showimg">
                            <img src={previewIMG ? previewIMG:''} 
                            
                            style={{ height:'100px',
                                    width:'100px',
                                    objectFit:'cover'
                                                    }}
                            alt="" />
                          </div>
                    </div>
                        </div>
                </div>
                    <button className={manageActions.EDIT === this.state.openEdit ? "btn btn-warning    " :"btn btn-success"}
                    onClick={this.handleSubmit}
                    >
                        {
                            manageActions.EDIT === this.state.openEdit ?
                            <FormattedMessage id="form-use.edit"/>:
                            <FormattedMessage id="form-use.save"/>
                            
                        }
                   
                    </button>
                <TableProduct
                    edit={(e)=>this.handeledit(e)}

                />
            </div>
        </div>
              
        )
    }

}

const mapStateToProps = state => {
    return {
        language:state.app.language,
        genderdux: state.admin.gender,
        isLoad:state.admin.isloadDing,
        positionredux:state.admin.position,
        roleredux:state.admin.role,
        users: state.admin.show
      
    };
};

const mapDispatchToProps = dispatch => {
    return {
        Reduxgender : ()=> dispatch(actions.Acgender()),
        Reduxposition : ()=> dispatch(actions.acPosition()),
        Reduxrole : ()=> dispatch(actions.acRole()),
        ReduxCreate: (data)=> dispatch(actions.acUSER(data)),
        ReduxUpdate: (data)=> dispatch(actions.acUPDATE(data)),
  
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
