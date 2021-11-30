import axios from '../axios';

const handleLoginApi = (email, password) =>{
      return axios.post('/api/login',{email,password})
    
}

const handleAllUser = (all)=>{
      return axios.get('/api/show/',{
            params:{id:all}
      })
}

const handleCreateService = (data)=>{
      return axios.post('/api/create-user',
      {email:data.email,
      password:data.password,
      fname:data.fname,
      lname:data.lname,
      address:data.address      
})
}

const handleDeleteService = (id)=>{
     
      return axios.delete('/api/delete-user',{data:{id:id}})
}

const handleUpdateService = (data)=>{
      return axios.put('/api/edit-user',{
            id:data.id,           
            fname:data.fname,
            lname:data.lname,
            address:data.address,
            phonenumber:data.phonenumber,  
            image: data.image,    
            sex:data.sex  ,    
            role:data.role ,
            position:data.position 
      })
}

const getAllcode = (type)=>{
      return axios.get('/api/get-allcode',{params:{type}})
    
}
//Redux
const handleCreateRedux = (data)=>{
      return axios.post('/api/create-user',
      {email:data.email,
      password:data.password,
      fname:data.fname,
      lname:data.lname,
      address:data.address,
      phonenumber:data.phonenumber,  
      image: data.image,    
      sex:data.sex  ,    
      role:data.role ,
      position:data.position ,
})
}

const handleCallDoctor = (limit)=>{
      return axios.get('/api/best-doctor/',{
            params:{limit:limit}
      })
}

const handleSelectDoctor = ()=>{
      return axios.get('/api/select-doctor')
}
const handleSubmitDescripDoctor = (data)=>{
      return axios.post('api/create-info-doctor',{
            contentHtml : data.contentHtml,
            contentMark : data.contentMark,
            description : data.description,
            doctorId: data.doctorId,
            priceId:data.priceId,
            provinceId:data. provinceId,
            paymentId:data. paymentId,
            addressClinic:data. addressClinic,
            nameClinic:data. nameClinic,
            note:data. note,
            action:data. action,
      })
}

const setChedule = (data) => {
      return axios.post("/api/set-schedule",{data:data})
}
const getIdandShowDetail = (id) => {
      return axios.get("/api/detail-doctor", {
            params:{id:id}
      })
}

const timeSchedule = (data) => {
      return axios.get("/api/time-schedule", {
            params:{id:data.id, date:data.date}
      })
}
const getInfoDoctor = (id) => {
      return axios.get("/api/get-info-doctor", {
            params:{id:id}
      })
}
const getInfoAddress = (id) => {
      return axios.get("/api/info-address", {
            params:{id:id}
      })
}
const infoBookingDoctor = (id) => {
      return axios.get("/api/loadComponent-info", {
            params:{id:id}
      })
}

const submitBooking = (param) => {
      return axios.post("/api/submit-booking",{data:param})
}
const confirmBooking = (param) => {
      return axios.get("/api/verify-booking", {
            params:{token:param.token,id:param.id}
      })
}
const getProvince = (province) => {
      return axios.get("/api/get-allprovince", {
            params:{param:province}
      })
}
export {handleLoginApi ,
       handleAllUser,
       handleCreateService,
       handleDeleteService,
       handleUpdateService,
       getAllcode,
       handleCreateRedux,
       handleCallDoctor,
       handleSelectDoctor,
      handleSubmitDescripDoctor,
      setChedule,
      getIdandShowDetail,
      timeSchedule,
      getInfoDoctor,
      getInfoAddress,
      infoBookingDoctor,
      submitBooking,
      confirmBooking,
      getProvince
      } 