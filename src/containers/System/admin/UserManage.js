
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { handleAllUser ,handleCreateService,handleDeleteService,handleUpdateService} from '../../../services/userService';
import ModalUpdateUser from './ModalUpdateUser';
import {emitter} from '../../../utils/emitter'
import './UserManage.scss'
import ModalUser from './ModalUser';
class UserManage extends Component {

    state = {        
        user:[],
        isOpen:false,
        isUpdate:false,
        editUser:{}
    }


    async componentDidMount() {
       await this.showDataUser()
      
    }

    showDataUser = async() =>{
        const dataUser = await handleAllUser('all')
        if(dataUser && dataUser.data.mess === 0 ){           
            this.setState({             
                user:dataUser.data.alldata
            })
        }
    }

     handleAddUser = ()=>{
     this.setState({
         isOpen:true
     })
    }
    toggleModalUpdate =()=>{
        this.setState({
            isUpdate:!this.state.isUpdate
        })
    }
    toggleModal = ()=>{
        this.setState({
            isOpen:!this.state.isOpen
        }) 
    }
    createUser = async(data)=>{       
      const res =  await handleCreateService(data)
      if(res && res.mess.code!== 3){
        alert(res.mess.mess)
      }else{
        await this.showDataUser()
        emitter.emit('EVENT_CLEAR_MODAL_DATA')
        this.toggleModal()
      }    
    }

    handleDeleteUser = async(item)=>{
       try {
        await handleDeleteService(item) 
        await this.showDataUser()
       } catch (error) {
           console.log(error.message);
       }
    }

    handleUpdate = (item)=>{
        this.setState({
            isUpdate:true,
            editUser:item
        })
    }

    handleUpdateUser = async(data)=>{
        const res = await handleUpdateService(data)
        if(res.data && res.data.code && res.data.code != 1){         
            
            alert(res.data.mess)
        }else{
            await this.showDataUser()
            this.toggleModalUpdate()
        }
    }

    render() {
       
        const {user,isOpen,isUpdate,editUser} = this.state           
        return (
        <>
        <div className="p-4"><h2 className="text-center">Manage user</h2></div>
        <ModalUser
        isOpenModal = {isOpen}
        toggleModal = {this.toggleModal}
        createUser = {this.createUser}
        />       
        {
            
            isUpdate &&
            <ModalUpdateUser
            isOpenUpdate = {isUpdate}
            user = {editUser}
            toggleModalUpdate = {this.toggleModalUpdate}
            handleUpdateUser = {this.handleUpdateUser}
            />
        }
        
        <button className="btn btn-success pd-2"
            onClick={this.handleAddUser}
        >Add user</button>
          <table id="customers">
               <thead>
            <tr>
                <th>email</th>
                <th>fname</th>
                <th>lname</th>
                <th>Address</th>
                <th>Action</th>
            </tr>
                </thead>
                <tbody>
            {
                user.map((item)=>{
                    return(
                        <tr key={item.id}>
                            <td>{item.email}</td>
                            <td>{item.firstName}</td>
                            <td>{item.lastName}</td>
                            <td>{item.address}</td>
                            <td className="two-button">
                                <button 
                                className="btn btn-warning"
                                onClick={()=>this.handleUpdate(item)}
                                >Edit</button>
                                <button 
                                className="btn btn-info"
                                onClick={()=>this.handleDeleteUser(item.id)}
                                
                                >Delete</button>
                            
                            </td>
                        </tr>
                    )
                })
            }
       
            </tbody>
            </table>
        </>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
