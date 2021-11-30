import { getAllcode ,handleCreateRedux,handleAllUser,handleDeleteService,handleUpdateService  } from '../../services/userService';
import actionTypes from './actionTypes';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
export const Acgender = () => {
    
    return async(dispatch , getState)=>{
        try {
            dispatch({ type: actionTypes.GENDER_OK})
            let res = await getAllcode("GENDER")        
            if(res && res.data && res.data.code === 3){
                dispatch (genderSuccess(res.data.mess))
            }else{
                dispatch (genderFail())
            }
           
        } catch (error) {
            
        }
    }

}

export const  genderSuccess = (gendata) =>({
    type : actionTypes.SUCCESS_GENDER,
    data:gendata
})

export const genderFail = () => ({
    type: actionTypes.FAIL_GENDER
})

// position
export const acPosition = ()=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {
            let res = await getAllcode("POSITION")                   
            if(res && res.data && res.data.code === 3){
                dispatch (positionSuccess(res.data.mess))
            }else{
                dispatch (positionFail())
            }
        } catch (error) {
            
        }
    }
}

export const  positionSuccess = (gendata) =>({
    type : actionTypes.SUCCESS_POSITION,
    data:gendata
})

export const positionFail = () => ({
    type: actionTypes.FAIL_POSITION
})



// role
export const acRole = ()=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {
            let res = await getAllcode("ROLE")
            if(res && res.data && res.data.code === 3){
                dispatch (roleSuccess(res.data.mess))
            }else{
                dispatch (roleFail())
            }
        } catch (error) {
            
        }
    }
}

export const  roleSuccess = (gendata) =>({
    type : actionTypes.SUCCESS_ROLE,
    data:gendata
})

export const roleFail = () => ({
    type: actionTypes.FAIL_ROLE
})

// CRUD user
export const acUSER = (data)=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {
         
            let res = await handleCreateRedux(data)

            if(res && res.mess && res.mess.code === 3){
                
                dispatch (saveUserSuccess())
                dispatch (show())
                toast.success(res.mess.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            
            }else{
                dispatch (saveUserFail())
                toast.warn(res.mess.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        } catch (error) {
            
        }
    }
}

export const  saveUserSuccess = () =>({
    type : actionTypes.USER_SAVE
})

export const saveUserFail = () => ({
    type: actionTypes.USER_FAILED
   
})

export const show = ()=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {
         
            let res = await handleAllUser('all')
            if(res && res.data && res.data.mess === 0){
                dispatch (saveShowSuccess(res.data.alldata.reverse()))
            }else{
                dispatch (saveShowFail(res.data))
            }
        } catch (error) {
            
        }
    }
}

export const  saveShowSuccess = (gendata) =>({
    type : actionTypes.SHOW_SAVE,
    data:gendata
})

export const saveShowFail = (err) => ({
    type: actionTypes.SHOW_FAILED,
    data:err
})


export const deleteU = (id)=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {
         
            let res = await handleDeleteService(id)

            if(res && res.data && res.data.code === 3){
                                
                toast.success(res.data.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  dispatch (show())
            
            }else{
                dispatch (savedeleteFail())
                toast.warn(res.data.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        } catch (error) {
            
        }
    }
}

export const  savedeleteSuccess = () =>({
    type : actionTypes.DELETE_SAVE
})

export const savedeleteFail = () => ({
    type: actionTypes.DELETE_FAILED
   
})


export const acUPDATE = (data)=>{
    // call api into redux
    return async(dispatch , getState)=>{
        try {         
            let res = await handleUpdateService(data)
            
            if(res && res.data && res.data.code === 1){
                
                dispatch (saveUpdateSuccess())
                dispatch (show())
                toast.success(res.data.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            
            }else{
                dispatch (saveUpdateFail())
                toast.warn(res.data.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        } catch (error) {
            console.log(error);
        }
    }
}

export const  saveUpdateSuccess = () =>({
    type : actionTypes.UPDATE_SAVE
})

export const saveUpdateFail = () => ({
    type: actionTypes.UPDATE_FAILED
   
})

export const getTime = () => {
    
    return async(dispatch , getState)=>{
        try {
          
            let res = await getAllcode("TIME")        
            if(res && res.data && res.data.code === 3){
                dispatch ({
                    type : actionTypes.GET_TIME_SUCCESS,
                    data:res.data.mess
                })
            }else{
                dispatch ({ type: actionTypes.GET_TIME_ERROR})
            }
           
        } catch (error) {
            
        }
    }

}

