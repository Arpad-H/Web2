import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";

import {bindActionCreators} from "redux";
import * as deleteUserActions from "../actions/DeleteUserActions";


const mapStateToProps = state => {
    return state;
}
class DeleteUserButton extends Component{

    constructor(props) {
        super(props);

        this.showConfirmDialog = this.showConfirmDialog.bind(this)

    }

    showConfirmDialog = (e) =>{
        e.preventDefault()
        const {showConfirmDeleteAction} = this.props
        showConfirmDeleteAction(this.props.userItemDelete)

    }


    render() {
        return (<div >
            <Button id={"DeleteButton"+ this.props.userItemDelete.userID} onClick={(e) =>this.showConfirmDialog(e)}>Delete</Button>
        </div>);
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    showConfirmDeleteAction: deleteUserActions.getShowConfirmDeleteAction,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeleteUserButton)
