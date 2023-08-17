import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as deleteUserActions from "../actions/DeleteUserActions";



const mapStateToProps = state => {
    return state;
}
class DeleteUserConfirm extends Component{

    constructor(props) {
        super(props);

        this.hideConfirmDialog = this.hideConfirmDialog.bind(this)
        this.handleConfirmDelete = this.handleConfirmDelete.bind(this)
    }


    hideConfirmDialog= (e) =>{
        const {hideConfirmDeleteAction} = this.props
        hideConfirmDeleteAction()
    }
    handleConfirmDelete = (e) =>{
        // console.log(this.props.userToBeDeleted)
        const {deleteUser} = this.props
        deleteUser(this.props.accessToken,this.props.userToBeDeleted.userID)
    }
    render() {
        // console.log(this.props.userToBeDeleted)
        return (<div>
            <Modal
                show={this.props.showDeleteUserConfirmation}
                onHide={(e) => this.hideConfirmDialog()}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Delete {this.props.userToBeDeleted ? this.props.userToBeDeleted.userID: ""}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Button id={"DeleteUserConfirm"} onClick={(e) => this.handleConfirmDelete(e)}>Confirm</Button>
                    <Button id={"DeleteUserCancel"} onClick={(e) => this.hideConfirmDialog(e)}>Cancel</Button>
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

    hideConfirmDeleteAction: deleteUserActions.getHideConfirmDeleteAction,
    deleteUser: deleteUserActions.deleteUser
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserConfirm)
