import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalFooter from 'react-bootstrap/ModalFooter'
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import BookingDoctor from '../CommonComponent/BookingDoctor';
import "./ModalBooking.scss"
import * as  actions  from '../../../store/actions';
import { LANGUAGES } from '../../../utils';
import { submitBooking } from '../../../services/userService';
import { ToastContainer, toast } from 'react-toastify';
import OverLoading from '../CommonComponent/OverLoading';

class ModalBooking extends Component {

    state = {
        arrGender: [],
        name:'',
        phone:'',
        email:'',
        address:'',
        reason:'',
        who:'',
        gender: '',
        active:false
    }
  
    componentDidMount() {

        this.props.Actiongender()
        
    }
    componentDidUpdate(preveProps, preveState, snapshot) {
        if (preveProps.gender !== this.props.gender) {
            this.setState({
                arrGender:this.props.gender
            })
        }
    }

    // function props
    isOpCloseModal = () => {
        this.props.toggleModal()
    }
    handleSelect = (e,param) => {
        let coopy = { ...this.state }
        coopy[param] = e.target.value
        this.setState({
            ...coopy
        })
    }
    validate = () => {
        let arrayCheck = ['name', 'phone', 'email', 'address', 'reason', 'who', 'gender']
        for (let i = 0; i < arrayCheck.length; i++) {
            if(!this.state[arrayCheck[i]]){     
                alert('requried '+arrayCheck[i])         
                return false
            }
        }
        return true
        
    }

    handleSubmit = async() => {
        let check = this.validate()
        this.setState({
            active: true
        })
        if (check) {          
            
            let check = this.state
            let show = this.props.day
            let res = await submitBooking({
                doctorId:show.doctorId,
                email:check.email,
                phone:check.phone,
                name: check.name,
                gender: check.gender,
                address:check.address,
                date:show.date,
                timeType: show.timeType,
                who:check.who,
                reason: check.reason,
                mapTime:show.mapTime.valueEn
            })

            if (res && res.code === 1) {
                toast.success(res.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            } else {
                toast.warn(res.mess, {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
            this.setState({
                name:'',
                phone:'',
                email:'',
                address:'',
                reason:'',
                who:'',
                gender: '',
                active:false
            })
              //off modal
              this.isOpCloseModal()

          

        } 
      
        
    }
     
    render() {      
        const { show ,language } = this.props
        const { arrGender, gender ,active} = this.state

       
        return (
            <>
                <OverLoading
                active = {active}
                />
                 <Modal
                    show={show}
                    onHide={this.isOpCloseModal}
                    backdrop="true"              
                    size='lg'
                    keyboard={false}
                  >
                    <Modal.Header closeButton>
                    <Modal.Title>Booking Clinic</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>

                        <Container fluid>                                                 
                                    <BookingDoctor
                                id={this.props.id}
                                day={this.props.day}
                                    />                         
                            <Row>
                            <Form>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                <Form.Label>Name</Form.Label>
                                <Form.Control type="text" onChange={(e)=>this.handleSelect(e,'name')} placeholder="khanh nguyen" />
                                <Form.Label>Phone</Form.Label>
                                <Form.Control type="text" onChange={(e)=>this.handleSelect(e,'phone')} placeholder="01234567" />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>email</Form.Label>
                                <Form.Control type="email" onChange={(e)=>this.handleSelect(e,'email')} placeholder="adu@gmail.com" />
                                <Form.Label>adderss</Form.Label>
                                <Form.Control type="text" onChange={(e)=>this.handleSelect(e,'address')} placeholder="Quang Binh province"/>
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Why you sick </Form.Label>
                                <Form.Control as="textarea" onChange={(e)=>this.handleSelect(e,'reason')} rows={3} />
                                    </Form.Group>
                            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Who is Booking </Form.Label>
                                <Form.Control type="text" onChange={(e)=>this.handleSelect(e,'who')} placeholder="you and someone" />
                                <Form.Label>Sex</Form.Label>
                                <Form.Select value={gender} onChange={(e)=>this.handleSelect(e,'gender')} >
                                 <option>---Open this select menu----</option>                                            
                                    {
                                        arrGender && arrGender.length > 0 &&
                                        arrGender.map((e) => (
                                            <option value={e.keyMap}>{ language === LANGUAGES.VI ? e.valueVi : e.valueEn}</option>
                                        ))
                                    }
                                            
                                </Form.Select>
                            </Form.Group>
                            </Form>
                            </Row>
                        </Container>

                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.isOpCloseModal}>
                        Close
                    </Button>
                    <Button onClick={this.handleSubmit} variant="success">Save</Button>
                    </Modal.Footer>
                </Modal>
                
            </>
            
        )
    }
}

const mapStateToProps = state => {
    return {
        started: state.app.started,
        isLoggedIn: state.user.isLoggedIn,
        gender: state.admin.gender,
        language :state.app.language

    };
};

const mapDispatchToProps = dispatch => {
    return {
        Actiongender: ()=>dispatch(actions.Acgender())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);