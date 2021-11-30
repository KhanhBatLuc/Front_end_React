import actionTypes from '../actions/actionTypes';



const initialState = {
    gender:[],
    role:[],
    position:[],
    isloadDing:false,
    showUser:[],
    doctor:[],
    selectDoctor:[],
    getTimeSchedule: [],
    detailDoctor: '',
    time:[]
  
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GENDER_OK :   
            let isLoad = {...state}
            isLoad.isloadDing = true
            return {
                ...isLoad
            }
            case actionTypes.SUCCESS_GENDER :
            let coppyGender = {...state}
            coppyGender.gender = action.data         
            coppyGender.isloadDing = false       
            return {
                ...state  ,
                gender:coppyGender.gender,
                isloadDing:coppyGender.isloadDing
                
            }
        case actionTypes.FAIL_GENDER :
            let isLoadfalse = {...state}
            isLoadfalse.isloadDing = false
            return {
                ...state,
                isloadDing:isLoadfalse
            }

            // position
        case actionTypes.POSITION_OK :
          
            return {
                ...state
            }

        case actionTypes.SUCCESS_POSITION :
            let coppyPosition = {...state}
            coppyPosition.position = action.data         
             
            return {
                ...state  ,
                position:coppyPosition.position
               
                
            }

        case actionTypes.FAIL_POSITION :
           
            return {
                ...state
            }

            // role

        case actionTypes.ROLE_OK :
            
            return {
                ...state
            }

        case actionTypes.SUCCESS_ROLE :
            let coppyRole = {...state}
            coppyRole.role = action.data              
            return {
                ...state  ,
                role:coppyRole.role
              
                
            }

        case actionTypes.FAIL_ROLE :
          
            return {
                ...state,
              
            }
       

            // CRUD user
        case actionTypes.USER_SAVE :
        
            return {
                ...state,
              
            }

        case actionTypes.USER_FAILED :
          
            return {
                ...state,
              
            }

            case actionTypes.SHOW_SAVE :
        
                return {
                    ...state,
                   show:action.data
                }
    
            case actionTypes.SHOW_FAILED :
              
                return {
                    ...state,
                    show:action.data
                }
                case actionTypes.DELETE_SAVE :
        
                return {
                    ...state,
                
                }
    
                case actionTypes.DELETE_FAILED :
              
                return {
                    ...state,
                
                }

                // home

                case actionTypes.DOCTOR_SUCCESS :
                state.doctor = action.data
                    return {
                        doctor:state.doctor
                    
                    }
        
                    case actionTypes.DOCTOR_FAIL :
                    state.doctor = []
                    return {
                        ...state,
                    
                    }
                    case actionTypes.DOCTOR_SELECT_SUCCESS :
                        state.selectDoctor = action.data

                            return {
                                ...state,
                            
                            }
                
                            case actionTypes.DOCTOR_SELECT_FAIL :
                            state.selectDoctor = []
                            return {
                                ...state,
                            
                            }
                    case actionTypes.SUBMIT_DOCTOR_SUCCESS :                
                            return {
                               ...state,                            
                            }                
                    case actionTypes.SUBMIT_DOCTOR_ERROR :                          
                            return {
                                ...state,
                            
                            }

                    case actionTypes.GET_TIME_SUCCESS :   
                    state.getTimeSchedule = action.data
                            return {
                             ...state                       
                            }                
                    case actionTypes.GET_TIME_ERROR :   
                    state.getTimeSchedule = []                       
                            return {
                                ...state,
                            
                    }
            case actionTypes.DOCTOR_DETAIL_SUCCESS :   
            state.detailDoctor = action.data
                    return {
                     ...state                       
                    }                
            case actionTypes.DOCTOR_DETAIL_FAIL :   
            state.detailDoctor = []                       
                    return {
                        ...state,
                    
                    }
                    case actionTypes.CALL_AP_TIME_SUCCESS :   
            state.time = action.data

                            return {
                             ...state                       
                            }                
                    case actionTypes.CALL_AP_TIME_FAIL :   
                    state.time = []                       
                            return {
                                ...state,
                            
                            }


            default:
                return state;
    }
}




export default adminReducer;