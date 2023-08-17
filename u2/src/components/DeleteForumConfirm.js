import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";

import * as deleteForumActions from "../actions/DeleteForumActions";



const mapStateToProps = state => {
    return state;
}
class DeleteForumConfirm extends Component{

    constructor(props) {
        super(props);

        this.hideConfirmDialog = this.hideConfirmDialog.bind(this)
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    }


    hideConfirmDialog= (e) =>{
        const {hideConfirmForumDeleteAction} = this.props
        hideConfirmForumDeleteAction()
    }
    handleConfirmDelete = (e) =>{
        // console.log(this.props.userToBeDeleted)
        const {deleteForum} = this.props
        deleteForum(this.props.accessToken,this.props.forumToBeDeleted._id)
    }
    render() {
        // console.log(this.props.userToBeDeleted)
        return (<div>
            <Modal
                show={this.props.showDeleteForumConfirmation}
                onHide={(e) => this.hideConfirmDialog()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {this.props.forumToBeDeleted ? this.props.forumToBeDeleted.name: ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button id={"DeleteForumThreadConfirm"} onClick={(e) => this.handleConfirmDelete(e)}>Confirm</Button>
                    <Button id={"DeleteForumThreadCancel"} onClick={(e) => this.hideConfirmDialog(e)}>Cancel</Button>
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

    hideConfirmForumDeleteAction: deleteForumActions.getHideConfirmForumDeleteAction,
    deleteForum: deleteForumActions.deleteForum
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeleteForumConfirm)
