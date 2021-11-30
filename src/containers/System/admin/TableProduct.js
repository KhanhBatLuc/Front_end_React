
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import * as  actions  from '../../../store/actions';
import {manageActions} from "../../../utils/constant"

class TableProduct extends Component {

    state = {        
       userRe : []
    }

    componentDidMount = () =>{
        this.props.showuser()
    }

    componentDidUpdate = (prevProps, prevState, snapshot) =>{
        if(this.props.users !== prevState.userRe){
            this.setState({
                userRe:this.props.users
            })
        }
    }
    handleUpdate = (e)=>{
        this.props.edit(e)
    }
    handleDeleteUser = (e)=>{
       
        this.props.deleteRe(e)
    }
    render() {
             
              const userall = this.state.userRe
           
        return (
        <>
        <div className="p-4"><h2 className="text-center">Manage user</h2></div>
       
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
              userall && userall.length >0 &&
              userall.map((item)=>{
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
        users: state.admin.show
    };
};

const mapDispatchToProps = dispatch => {
    return {
        showuser: ()=> dispatch(actions.show()),
        deleteRe: (id)=> dispatch(actions.deleteU(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableProduct);
