import {Button} from "react-bootstrap";
import {Component} from "react";

import {connect} from "react-redux";

import {getShowEditForumDialogAction} from "../actions/EditForumActions";


class EditForumButton extends Component {

    constructor(props) {
        super(props);
        this.showEditForumDialog = this.showEditForumDialog.bind(this)
    }

    showEditForumDialog() {
        const dispatch = this.props.dispatch
        dispatch(getShowEditForumDialogAction(this.props.forumItemEdit))
    }

    render() {
        return (<div>
            <Button variant={"outline-primary"}  id={"EditForumThreadButton"+this.props.forumItemEdit._id} onClick={this.showEditForumDialog}>Edit</Button>
        </div>);
    }
}

export default connect()(EditForumButton)