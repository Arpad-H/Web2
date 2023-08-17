import {Button} from "react-bootstrap";
import {Component} from "react";

import {connect} from "react-redux";
import {getShowEditUserDialogAction} from "../actions/EditUserActions";


class OpenEditUserDialogButton extends Component {

    constructor(props) {
        super(props);
        this.showEditUserDialog = this.showEditUserDialog.bind(this)
    }

    showEditUserDialog() {
        const dispatch = this.props.dispatch
        dispatch(getShowEditUserDialogAction(this.props.userItemEdit))
    }

    render() {
        return (<div>
            <Button variant={"outline-primary"}  id={"EditButton"+this.props.userItemEdit.userID} onClick={this.showEditUserDialog}>Edit</Button>
        </div>);
    }
}

export default connect()(OpenEditUserDialogButton)