import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as createMessageAction from "../actions/CreateMessageActions";
import OpenCreateUserDialogButton from "./OpenCreateUserDialogButton";
import OpenCreateMessageDialogButton from "./OpenCreateMessageDialogButton";
import * as threadLoadActions from "../actions/ThreadLoadActions";


const mapStateToProps = state => {
    return state;
}

class CreateMessageDialog extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            title: "",
            text: "",
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }
    // loadMessages() {
    //     // const {accessToken} = this.props
    //     const {getMessagesAction} = this.props
    //     getMessagesAction(this.props.threadToBeViewed._id)
    // }


    handleChange = (e) => {
        let {name, value} = e.target;

        // console.log(value)
        this.setState({[name]: value})
    }
    handleShow = (e) => {
        e.preventDefault()
        // console.log(this.props)
        const {showCreateMessageDialogAction} = this.props
        showCreateMessageDialogAction()
    }

    handleClose = (e) => {
        // e.preventDefault()
        const {hideCreateMessageDialogAction} = this.props
        hideCreateMessageDialogAction()
    }
    handleSubmit = (e) => {
        // this.loadMessages()
        e.preventDefault();
        const {title,text} = this.state
        const {createMessageAction} = this.props
        createMessageAction(this.props.threadToBeViewed._id,
            this.props.accessToken,title,text,this.props.userID)
    }


    render() {
        let showDialog = this.props.showCreateMessageDialog;
        // console.log(showDialog)
        if (showDialog === undefined) {
            showDialog = false
        }
        return (<>
            {/*<Button variant="primary" onClick={this.handleShow}>*/}
            {/*    Login*/}
            {/*</Button>*/}
            <OpenCreateMessageDialogButton/>

            <Modal
                show={showDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Message</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Auth-form-container">
                        <form className="Auth-form" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="Auth-form-content">
                                {/*<h3 className="Auth-form-title">Sign In</h3>*/}
                                <div className="form-group mt-3">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id={"ForumMessageTitleInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter title"
                                        name={"title"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Text</label>
                                    <input
                                        type="text"
                                        id={"ForumMessageTextInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter your Message"
                                        name={"text"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>

                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" id={" CreateForumMessageButton"} className="btn btn-primary">
                                        Submit
                                    </button>
                                    <button type="button" id={"CancelCreateForumMessageButton"} className="btn btn-secondary" onClick={event => this.handleClose(event)}>
                                        Cancel
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
    showCreateMessageDialogAction: createMessageAction.getShowCreateMessageDialogAction,
    hideCreateMessageDialogAction: createMessageAction.getHideCreateMessageDialogAction,
    createMessageAction: createMessageAction.createMessage,
    getMessagesAction: threadLoadActions.getMessages
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateMessageDialog)
