import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as createUserActions from "../actions/CreateUserActions";
import * as userManagementActions from "../actions/UserManagementActions";
import OpenCreateUserDialogButton from "./OpenCreateUserDialogButton";


const mapStateToProps = state => {
    return state;
}

class CreateUserDialog extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            userID: "",
            password: "",
            isAdministrator: false
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
        // console.log(value)
        this.setState({[name]: value})
    }
    handleShow = (e) => {
        e.preventDefault()
        // console.log(this.props)
        const {showCreateUserDialogAction} = this.props
        showCreateUserDialogAction()
    }

    handleClose = (e) => {
        // e.preventDefault()
        const {hideCreateUserDialogAction} = this.props
        hideCreateUserDialogAction()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {username, userID, password, isAdministrator} = this.state
        const {createUserAction} = this.props
        createUserAction(this.props.accessToken, userID, username, password, isAdministrator)
    }


    render() {
        let showDialog = this.props.showCreateUserDialog;
        // console.log(showDialog)
        if (showDialog === undefined) {
            showDialog = false
        }
        return (<>
            {/*<Button variant="primary" onClick={this.handleShow}>*/}
            {/*    Login*/}
            {/*</Button>*/}
            <OpenCreateUserDialogButton/>

            <Modal
                show={showDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New User</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="Auth-form-content">
                                {/*<h3 className="Auth-form-title">Sign In</h3>*/}
                                <div className="form-group mt-3">
                                    <label>UserID</label>
                                    <input
                                        type="text"
                                        id={"UserIDInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter userID"
                                        name={"userID"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        id={"UserNameInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter username"
                                        name={"username"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Password</label>
                                    <input
                                        type="password"
                                        id={"PasswordInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        name={"password"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                {/*<div className="form-group mt-3">*/}
                                {/*    <label>Administrator</label>*/}
                                {/*    <input*/}
                                {/*        type="checkbox"*/}
                                {/*        id={"IsAdministratorInput"}*/}
                                {/*        className="form-control mt-1"*/}
                                {/*        name={"isAdministrator"}*/}
                                {/*        onChange={(e) => this.handleChange(e)}*/}
                                {/*    />*/}
                                {/*</div>*/}
                                <br/>

                                <Form.Check
                                    type="switch"
                                    id="IsAdministratorInput"
                                    name={"isAdministrator"}
                                    onChange={(e) => this.handleChange(e)}
                                    label="Administrator"
                                />

                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" id={"CreateUserButton"} className="btn btn-primary">
                                        Submit
                                    </button>
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
        </>);

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    showCreateUserDialogAction: userManagementActions.getShowCreateUserDialogAction,
    hideCreateUserDialogAction: userManagementActions.getHideCreateUserDialogAction,
    createUserAction: createUserActions.createUser
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateUserDialog)
