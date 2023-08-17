import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as forumOverviewActions from "../actions/ForumOverviewActions";
import * as createForumActions from "../actions/CreateForumActions";
import OpenCreateUserDialogButton from "./OpenCreateUserDialogButton";
import OpenCreateForumDialogButton from "./OpenCreateForumDialogButton";
import {getHideCreateForumDialogAction, getShowCreateForumDialogAction} from "../actions/ForumOverviewActions";


const mapStateToProps = state => {
    return state;
}

class CreateForumThread extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            name: "",
            description: "",
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.handleSubmit = this.handleSubmit.bind(this)
    }


    handleChange = (e) => {
        let {name, value} = e.target;

        this.setState({[name]: value})
    }
    handleShow = (e) => {
        // e.preventDefault()
        // // console.log(this.props)
        const {hideCreateForumDialogAction} = this.props
        hideCreateForumDialogAction()
    }

    handleClose = (e) => {
        const {hideCreateForumDialogAction} = this.props

        hideCreateForumDialogAction()


    }
    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        const {name, description} = this.state
        const {createForumAction} = this.props
        createForumAction(this.props.accessToken, name, description)
    }


    render() {
        let showDialog = this.props.showCreateForumDialog;
        // console.log(showDialog)
        if (showDialog === undefined) {
            showDialog = false
        }
        return (<>

            <OpenCreateForumDialogButton/>

            <Modal
                show={showDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Create New Thread</Modal.Title>
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
                                        id={"ForumThreadNameInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter Title"
                                        name={"name"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Description</label>
                                    <input
                                        type="text"
                                        id={"ForumThreadDescriptionInput"}
                                        className="form-control mt-1"
                                        placeholder="Enter Description"
                                        name={"description"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>


                                <div className="d-grid gap-2 mt-3">
                                    <button type="submit" id={"CreateForumThreadButton"} className="btn btn-primary">
                                        Submit
                                    </button>
                                    <button type="button" id={"CancelCreateForumThreadButton"} className="btn btn-secondary" onClick={event => this.handleClose(event)}>
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
    showCreateForumDialogAction: forumOverviewActions.getShowCreateForumDialogAction,
    hideCreateForumDialogAction: forumOverviewActions.getHideCreateForumDialogAction,
    createForumAction: createForumActions.createForum
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(CreateForumThread)
