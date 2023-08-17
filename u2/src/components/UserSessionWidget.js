import {Button, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect } from "react-redux";

import * as authenticationActions from "../actions/AuthenticationActions"
import {bindActionCreators} from "redux";
import LoginButton from "./LoginButton";


const mapStateToProps = state => {
    return state;
}
class UserSessionWidget extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: ""
        }
        this.handleClose = this.handleClose.bind(this)
        this.handleShow = this.handleShow.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    // const [show, setShow] = useState(false)
    // const [username, setUsername] = useState("")
    // const [password, setPassword] = useState("" +
    //     "")
    handleChange = (e) => {
        const {name,value} = e.target;
        this.setState({[name]: value})
    }
    handleShow = (e) => {
        e.preventDefault()
        // console.log(this.props)
        const {showLoginDialogAction} = this.props
        showLoginDialogAction()
    }

    handleClose = (e) => {
        // e.preventDefault()
        const {hideLoginDialogAction} = this.props
        hideLoginDialogAction()
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {username,password} = this.state
        const {authenticateUserAction} = this.props
        authenticateUserAction(username, password)
    }

    // const mapDispatchtoProps = dispatch => {
    //     return {
    //         authenticateUserAction: (username,password) => {
    //             dispatch(authenticateUserAction(username,password))
    //         }
    //     }
    // }
    render() {
        let showDialog = this.props.showLoginDialog;
        // console.log(showDialog)
        if (showDialog === undefined){
            showDialog = false
        }
        return (<>
            {/*<Button variant="primary" onClick={this.handleShow}>*/}
            {/*    Login*/}
            {/*</Button>*/}
            <LoginButton />

            <Modal
                show={showDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton >
                    <Modal.Title>Sign In</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="Auth-form-content">
                                {/*<h3 className="Auth-form-title">Sign In</h3>*/}
                                <div className="form-group mt-3">
                                    <label>Username</label>
                                    <input
                                        type="text"
                                        id={"LoginUserIDInput"}
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
                                        id={"LoginPasswordInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter password"
                                        name={"password"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" id={"LoginButton"} className="btn btn-primary">
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
    showLoginDialogAction: authenticationActions.getShowLoginDialogAction,
    hideLoginDialogAction: authenticationActions.getHideLoginDialogAction,
    authenticateUserAction: authenticationActions.authenticateUser
}, dispatch)
export default  connect(mapStateToProps, mapDispatchToProps)(UserSessionWidget)
