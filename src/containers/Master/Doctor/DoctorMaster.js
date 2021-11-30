import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./DoctorMaster.scss"
 import * as  actions  from '../../../store/actions';
  import { LANGUAGES } from '../../../utils/constant';

import { toast } from 'react-toastify';
import { isEmpty } from 'lodash';
import { setChedule } from '../../../services/userService';



class DoctorMaster extends Component {
    
    state ={
        startDate:'', 
        doc:'',      
        listDoc:[],
        listTime:[]
    }
   componentDidMount(){
       this.props.SelectDoctor()
       this.props.Timeres()
    }
    componentDidUpdate(prevProps,preveState,snapshot){  
        const {res} = this.props.select   
        if(prevProps.select !== this.props.select){
            let compare =  this.selectDoctorLanguage(res.mess)
            this.setState({    
                 
                listDoc:compare,
                doc :res.mess && res.mess.length>0 ? res.mess[0].id : ''
            })
        }
        if(prevProps.language !== this.props.language){
            let compare =  this.selectDoctorLanguage(res.mess)
            this.setState({    
                 
                listDoc:compare,
                doc :res.mess && res.mess.length>0 ? res.mess[0].id : ''
            })
        }
        if(prevProps.time !== this.props.time){   
            let rangtime = this.props.time
            if(rangtime && rangtime.length >0){
               let data = rangtime.map(obj=>({...obj,isActive:false}))     
                this.setState({                    
                    listTime:data
                })
            }
        }
    }
    selectDoctorLanguage = (input)=>{
    let array=[]
    if(input && input.length >0){
        input.map((e)=>{
            let obj = {}
            let laVi = `${e.firstName} ${e.lastName}`
            let laEn = `${e.lastName} ${e.firstName}`
            obj.name = this.props.language === LANGUAGES.VI ? laVi : laEn
            obj.id = e.id
            array.push(obj)
        })
    }
        return array
    }


    setStartDate = (data) => {
       
       
        let formatTime = new Date(data).getTime()       
        console.log(formatTime);
        this.setState({
            startDate:formatTime
        })
       
    }

    handleChangeDoc = (e)=>{
        this.setState({
            doc:e.target.value
        })
    }
  
    handleGetTime = (e)=>{
       let {listTime} = this.state
      if(listTime && listTime.length >0){
        let find = listTime.findIndex(element=> element.id === e)
        listTime[find].isActive = !listTime[find].isActive
        this.setState({
             listTime: listTime
        });
      }
     
    }

    handleSave =async()=>{
        const {doc,listDoc,listTime,startDate} = this.state
        let array = []
        if(!startDate) {
            toast.warn('please fill full the date', {
                position: toast.POSITION.TOP_RIGHT
            });
            return
        }
        if(listTime && listTime.length>0){
            let data = listTime.filter(item=> item.isActive === true)
                if(isEmpty(data)){
                    toast.warn('please fill full the input', {
                        position: toast.POSITION.TOP_RIGHT
                    });
                }else{
                    data.map((e)=>{
                        let obj = {}
                        obj.maxNumber=10
                        obj.date = startDate
                        obj.timeType = e.keyMap
                        obj.doctorId = doc
                        array.push(obj)                        
                    })
                 
                    //call api
                    let res = await setChedule(array)
                    if (res && res.code === 1) {
                        toast.success(res.mess, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.warn(res.mess, {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }

                }
        }
    }
    render(){
        
        const {language} = this.props  
       const {startDate,doc,listDoc,listTime} = this.state
        return(
            <>
                <div className="partents-master">
                    <div className="partent-master">
                        <h3 className="text-center">Manage Schedule</h3>
                        <div className="table">
                            <div className="left-select">
                                <label htmlFor="">select doctor</label>
                                <select name="" id="" value={doc} onChange={(e)=>this.handleChangeDoc(e)} className="select-doctor">
                                   {listDoc&&listDoc.length>0 &&
                                    listDoc.map((e,index)=>{
                                        return(<option keys={index} value={e.id}>{e.name}</option>)
                                    })
                                   }
                                </select>
                            </div>
                            <div className="right-select">
                            <DatePicker 
                            className="select-date"                                      
                            selected={new Date(startDate).getTime()}
                            minDate={new Date()}
                            onChange={(date) => this.setStartDate(date)} 
                            />                            
                            </div>
                        </div>
                        <div className="table-2">
                           <div className="list-butt">
                               {
                                   listTime && listTime.length>0 &&
                                   listTime.map((e)=>{
                                        return(
                                            <button keys={e.id} className={e.isActive === true?'but active':'but'}
                                                onClick={()=>this.handleGetTime(e.id)}
                                            >{language===LANGUAGES.VI ? e.valueVi:e.valueEn}</button>
                                        )
                                   })
                               }
                            
                           </div>
                        </div>
                        <button className="btn btn-success" onClick={this.handleSave}>Save</button>
                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
      select : state.admin.selectDoctor,
      language: state.app.language,
      time: state.admin.getTimeSchedule

    };
};

const mapDispatchToProps = dispatch => {
    return {
        SelectDoctor: ()=> dispatch(actions.actionReduxSelectDoctor()),
        Timeres: ()=> dispatch(actions.getTime())
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(DoctorMaster);