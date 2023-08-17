import {Button} from "react-bootstrap";
import {Component} from "react";

import {connect} from "react-redux";

import {getShowCreateForumDialogAction} from "../actions/ForumOverviewActions";


class OpenCreateForumButton extends Component{

    constructor(props) {
        super(props);
        this.showCreateForumDialog = this.showCreateForumDialog.bind(this)
    }

    showCreateForumDialog(){
        const dispatch = this.props.dispatch
        dispatch(getShowCreateForumDialogAction())
    }

    render() {
        return (<div>
            <Button id={"OpenCreateForumThreadDialogButton"} onClick={this.showCreateForumDialog}>Add Forum</Button>
        </div>);
    }
}
export default connect()(OpenCreateForumButton)