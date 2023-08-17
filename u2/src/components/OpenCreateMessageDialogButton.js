import {Button} from "react-bootstrap";
import {Component} from "react";

import {connect} from "react-redux";

import {getShowCreateForumDialogAction} from "../actions/ForumOverviewActions";
import {getShowCreateMessageDialogAction} from "../actions/CreateMessageActions";


class OpenCreateMessageButton extends Component{

    constructor(props) {
        super(props);
        this.showCreateMessageDialog = this.showCreateMessageDialog.bind(this)
    }

    showCreateMessageDialog(){
        const dispatch = this.props.dispatch
        dispatch(getShowCreateMessageDialogAction())
    }

    render() {
        return (<div>
            <Button id={"OpenCreateForumMessageDialogButton"} onClick={this.showCreateMessageDialog}>Add Message</Button>
        </div>);
    }
}
export default connect()(OpenCreateMessageButton)