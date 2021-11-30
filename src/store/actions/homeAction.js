import { handleCallDoctor ,
        handleSelectDoctor ,
        handleSubmitDescripDoctor ,
        getIdandShowDetail,
        timeSchedule,
        getAllcode
} from '../../services/userService';
import actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';

export const actionReduxDoctor = ()=>{
    return async (dispatch , getState) =>{
        try {
          
            let res = await handleCallDoctor(8)             
            if(res && res.data && res.data.code === 1){
                dispatch (successDoctor(res.data.data))
            }else{
                dispatch (errorDoctor())
            }
        } catch (error) {
            console.log('error from action home',error.message);
        }
    }
}

export const successDoctor = (data)=>({
    type : actionTypes.DOCTOR_SUCCESS,
    data:data
})
export const errorDoctor = ()=>({
        type : actionTypes.DOCTOR_FAIL,
        data:[]
})
// doctor manage Controller
export const actionReduxSelectDoctor = ()=>{
    return async (dispatch , getState) =>{
        try {
            // promise all
           
            const [res, resPrice,resProvince,resPayment] = await Promise.all([
                await handleSelectDoctor(),
                await getAllcode('PRICE'),
                await getAllcode('PROVINCE'),
                await getAllcode('PAYMENT'),
            ]);
            let obj = {
                res,
                resPrice ,
                resProvince,
                resPayment
            }
           
            if(obj && obj.res && obj.res.code === 1){
                dispatch (successSelectDoctor(obj))
            }else{
                dispatch (errorSelectDoctor())
            }
        } catch (error) {
            console.log('error from action home',error.message);
        }
    }
}

export const successSelectDoctor = (data)=>({
    
    type : actionTypes.DOCTOR_SELECT_SUCCESS,
    data:data
})
export const errorSelectDoctor = ()=>({
        type : actionTypes.DOCTOR_SELECT_FAIL 
})

export const  submitDescripDoctor = (data)=>{
    return async(dispatch,getState)=>{
        try {
            let res = await handleSubmitDescripDoctor(data)
            console.log('submit',data);
            if(res && res.code && res.code === 1){
                dispatch (successDetailDoctor(res.mess))
                toast.success(res.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }else{
                dispatch (errorDetailDoctor())
                toast.warn(res.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        } catch (error) {
            console.log('error from action home',error.message);
        }
    }
}

export const successDetailDoctor = ()=>({
    
    type : actionTypes.SUBMIT_DOCTOR_SUCCESS
   
})
export const errorDetailDoctor = ()=>({
        type : actionTypes.SUBMIT_DOCTOR_ERROR 
})

export const  getDetail = (id)=>{
    return async(dispatch,getState)=>{
        try {
            let res = await getIdandShowDetail(id)
           
            if(res && res.code && res.code === 1){
                dispatch({
                    type: actionTypes.DOCTOR_DETAIL_SUCCESS,
                    data: res.mess
                })
               
            }else{
                dispatch({
                    type: actionTypes.DOCTOR_DETAIL_FAIL,
                    data: res.mess
                })
            }
        } catch (error) {
            console.log('error from action home',error.message);
        }
    }
}
export const calltimeschedule = (data) => {
    return async(dispatch,getState)=>{
        try {
            let res = await timeSchedule(data)
            if(res && res.code && res.code === 1){
                dispatch({
                    type: actionTypes.CALL_AP_TIME_SUCCESS,
                    data: res.mess
                })
               
            }else{
                dispatch({
                    type: actionTypes.CALL_AP_TIME_FAIL,
                    data: res.mess
                })
            }
        } catch (error) {
            console.log('error from action home',error.message);
        }
    }
}

