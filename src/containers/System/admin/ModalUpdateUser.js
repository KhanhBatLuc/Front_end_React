
import React, { Component } from 'react';
import {Modal,ModalHeader,ModalTitle ,ModalBody, ModalFooter,Container, Row, Col } from 'react-bootstrap';
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import _ from 'lodash'
class ModalUpdateUser extends Component {

    state = {
        id:'',
        email:'',
        password:'',
        fname:'',
        lname:'',
        address:''
    }

    componentDidMount() {
        const {user} = this.props 
      
        if(user && !_.isEmpty(user)){
            this.setState({
                id:user.id,
                email:user.email,
                password:'123',
                fname:user.firstName,
                lname:user.lastName,
                address:user.address
            })
        }

    }

    handleClose = ()=>{
       this.props.toggleModalUpdate()
    }


    handleInputCreate =(e ,type)=>{
        let copyState = {...this.state}
        copyState[type] = e.target.value
        this.setState({
            ...copyState
        })
    }

    validateData = ()=>{
        let isAccept = true 
        const array = ['email','password','fname','lname','address']
        for (let i = 0; i < array.length; i++) {        
            if(!this.state[array[i]]){
                isAccept = false
              alert('missing input: '+array[i])
              break;
            }            
        }
        return isAccept;
    }

    UpdateUser = ()=>{
        let check = this.validateData()
        if(check){
            this.props.handleUpdateUser(this.state)
        }
    }

  
    render() {
        const {email,password,fname,lname,address}= this.state
        const prop = this.props  
    
        return (
            <Container>
            <Row>
            <Col sm={12}>
            <Modal show={prop.isOpenUpdate} 
            className={'modal-parent'}
            size="lg"
            >
            <Modal.Header closeButton={false}>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form>           
                   <Row>
                   <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control value={email} onChange={(e)=>this.handleInputCreate(e,'email')} type="email" placeholder="Enter email" />
                    </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control value={password} disabled onChange={(e)=>this.handleInputCreate(e,'password')} type="password" placeholder="Password" />
                    </Form.Group>
                    </Col>
                   </Row>
                   <Row>
                   <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGroupEmail">
                        <Form.Label>Fname</Form.Label>
                        <Form.Control value={fname} onChange={(e)=>this.handleInputCreate(e,'fname')} type="text" placeholder="Fname" />
                    </Form.Group>
                    </Col>
                    <Col sm={6}>
                    <Form.Group className="mb-3" controlId="formGroupPassword">
                        <Form.Label>LName</Form.Label>
                        <Form.Control value={lname} onChange={(e)=>this.handleInputCreate(e,'lname')} type="text" placeholder="Lname" />
                    </Form.Group>
                    </Col>
                   </Row>
                   <Row>
                       <Col sm={12}>
                       <Form.Label>Address</Form.Label>
                        <Form.Control value={address} onChange={(e)=>this.handleInputCreate(e,'address')} type="text" placeholder="Address" />
                        </Col>
                   </Row>
                  
            </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={this.handleClose}>
                Close
              </Button>
              <Button variant="secondary" onClick={this.UpdateUser}>
                updateUser
              </Button>
            </Modal.Footer>
          </Modal>

            </Col>
            </Row>
            </Container>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUpdateUser);
