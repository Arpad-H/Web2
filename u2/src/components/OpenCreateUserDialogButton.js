import {Button} from "react-bootstrap";
import {Component} from "react";

import {connect} from "react-redux";
import {getShowCreateUserDialogAction} from "../actions/UserManagementActions";


class OpenCreateUserDialogButton extends Component{

    constructor(props) {
        super(props);
        this.showCreateUserDialog = this.showCreateUserDialog.bind(this)
    }

    showCreateUserDialog(){
        const dispatch = this.props.dispatch
        dispatch(getShowCreateUserDialogAction())
    }

    render() {
        return (<div>
            <Button id={"OpenCreateUserDialogButton"} onClick={this.showCreateUserDialog}>Add User</Button>
        </div>);
    }
}
export default connect()(OpenCreateUserDialogButton)