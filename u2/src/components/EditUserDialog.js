import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as editUserActions from "../actions/EditUserActions";



const mapStateToProps = state => {
    return state;
}

class EditUserDialog extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            username: null,
            userID: null,
            password: null,
            isAdministrator: null
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange = (e) => {
        let {name, value} = e.target;
        if (name==="isAdministrator"){
            value = e.target.checked
        }
        console.log(this.state)
        this.setState({[name]: value})
    }
    handleShow = (e) => {
        e.preventDefault()
        const {showEditUserDialogAction} = this.props
        showEditUserDialogAction()
    }

    handleClose = (e) => {
        // e.preventDefault()
       this.state.userID =  null
       this.state.username =  null
       this.state.password =  null
       this.state.isAdministrator =  null
        // this.setState({username: null})
        // this.setState({password: null})
        // this.setState({isAdministrator: null})
        const {hideEditUserDialogAction} = this.props
        hideEditUserDialogAction()

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {username, userID, password, isAdministrator} = this.state
        const {editUserAction} = this.props
        editUserAction(this.props.accessToken, userID, username, password, isAdministrator)
    }


    render() {

        // console.log(showDialog)
        // if (showDialog === undefined) {
        //     showDialog = false
        // }

        // console.log(this.props.userToBeEdited)
        // let userID
        // let username
        // let isAdministrator
        // let password

        if (this.props.userToBeEdited ) {
            this.state.userID = this.props.userToBeEdited ? this.props.userToBeEdited.userID: ""

            this.state.username = (this.state.username || this.state.username ==="") ? this.state.username : this.props.userToBeEdited.userName

            this.state.password = (this.state.password || this.state.password ==="") ? this.state.password : ""
            this.state.isAdministrator = (this.state.isAdministrator !== null)? this.state.isAdministrator : this.props.userToBeEdited.isAdministrator

            // this.setState({userID: this.state.userID ? this.state.userID : this.props.userToBeEdited.userID})
            // this.setState({username: (this.state.username || this.state.username === "") ? this.state.username : this.props.userToBeEdited.userName})
            // this.setState({password: (this.state.password || this.state.password === "") ? this.state.password : this.props.userToBeEdited.password})
            // this.setState({isAdministrator: (this.state.isAdministrator !== null) ? this.state.isAdministrator : this.props.userToBeEdited.isAdministrator})
        }
        // console.log(this.state)

        return (<div key={this.props.userItem ? this.props.userItem.userID : ""}>
            {/*<Button variant="primary" onClick={this.handleShow}>*/}
            {/*    Login*/}
            {/*</Button>*/}
            <Modal
                show={this.props.showEditUserDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit {this.state.userID}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Auth-form-container">
                        <form className="Auth-form" autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="Auth-form-content">
                                {/*<h3 className="Auth-form-title">Sign In</h3>*/}
                                <div className="form-group mt-3">
                                    <label>UserID</label>
                                    <input
                                        type="text"
                                        id={"UserIDInput"}
                                        className="form-control mt-1"
                                        value={this.state.userID}
                                        name={"userID"}
                                        disabled={true}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        id={"UserNameInput"}
                                        className="form-control mt-1"
                                        value={this.state.username}
                                        name={"username"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="text"
                                        id={"PasswordInput"}
                                        className="form-control mt-1"
                                        value={this.state.password}
                                        name={"password"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <br/>

                                <Form.Check
                                    type="switch"
                                    id="IsAdministratorInput"
                                    name={"isAdministrator"}
                                    checked={this.state.isAdministrator}
                                    onChange={(e) => this.handleChange(e)}
                                    label="Administrator"
                                />

                                <div className="d-grid gap-2 mt-3">
                                    <Button variant={"light"} id={""} className="btn btn-primary" onClick={(e) =>this.handleClose(e)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" id={"CreateUserButton"} className="btn btn-primary">
                                        Submit
                                    </Button>
                                </div>

                            </div>
                        </form>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    {/*<Button variant="secondary" onClick={handleClose}>*/}
                    {/*    Close*/}
                    {/*</Button>*/}

                </Modal.Footer>
            </Modal>
        </div>);

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showEditUserDialogAction: editUserActions.getShowEditUserDialogAction,
    hideEditUserDialogAction: editUserActions.getHideEditUserDialogAction,
    editUserAction: editUserActions.editUser
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EditUserDialog)
