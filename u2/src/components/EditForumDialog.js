import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as editForumActions from "../actions/EditForumActions";


const mapStateToProps = state => {
    return state;
}

class EditForumDialog extends Component<{}> {


    constructor(props) {
        super(props);
        this.state = {
            name: null,
            description: null,
            forumID: null,
        }
        this.handleShow = this.handleShow.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }


    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value})
    }
    handleShow = (e) => {
        e.preventDefault()
        const {showEditForumDialogAction} = this.props
        showEditForumDialogAction()
    }

    handleClose = (e) => {
        // e.preventDefault()
        this.state.name = null
        this.state.description = null
        this.state.forumID = null


        const {hideEditForumDialogAction} = this.props
        hideEditForumDialogAction()

    }
    handleSubmit = (e) => {
        e.preventDefault();
        const {name, description, forumID} = this.state
        const {editForum} = this.props
        editForum(this.props.accessToken, forumID, name, description)
    }


    render() {
        if (this.props.forumToBeEdited) {
            this.state.forumID = this.props.forumToBeEdited ? this.props.forumToBeEdited._id : ""

            this.state.name = (this.state.name || this.state.name === "") ? this.state.name : this.props.forumToBeEdited.name

            this.state.description = (this.state.description || this.state.description === "") ? this.state.description : this.props.forumToBeEdited.description


        }


        return (<div key={this.props.forumItem ? this.props.forumItem._id : ""}>

            <Modal
                show={this.props.showEditForumDialog}
                onHide={(e) => this.handleClose(e)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit {this.state.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="Auth-form-container">
                        <form className="Auth-form" autoComplete="off" onSubmit={(e) => this.handleSubmit(e)}>
                            <div className="Auth-form-content">
                                {/*<h3 className="Auth-form-title">Sign In</h3>*/}
                                <div className="form-group mt-3">
                                    <label>Title</label>
                                    <input
                                        type="text"
                                        id={"ForumThreadNameInput"}
                                        className="form-control mt-1"
                                        value={this.state.name}
                                        name={"name"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>
                                <div className="form-group mt-3">
                                    <label>Descriprion</label>
                                    <input
                                        type="text"
                                        id={"ForumThreadDescriptionInput"}
                                        className="form-control mt-1"
                                        value={this.state.description}
                                        name={"description"}
                                        onChange={(e) => this.handleChange(e)}
                                    />
                                </div>

                                <br/>


                                <div className="d-grid gap-2 mt-3">
                                    <Button type={"button"} variant={"light"} id={"CancelEditForumThreadButton"} className="btn btn-primary"
                                            onClick={(e) => this.handleClose(e)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" id={"SaveForumThreadButton"} className="btn btn-primary">
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
    showEditForumDialogAction: editForumActions.getShowEditForumDialogAction,
    hideEditForumDialogAction: editForumActions.getHideEditForumDialogAction,
    editForum: editForumActions.editForum
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(EditForumDialog)
