import {Button, Form, Modal} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";

import {bindActionCreators} from "redux";

import * as deleteForumActions from "../actions/DeleteForumActions";


const mapStateToProps = state => {
    return state;
}
class DeleteForumButton extends Component{

    constructor(props) {
        super(props);

        this.showConfirmDialog = this.showConfirmDialog.bind(this)

    }

    showConfirmDialog = (e) =>{
        e.preventDefault()
        const {showConfirmForumDeleteAction} = this.props
        showConfirmForumDeleteAction(this.props.forumItemDelete)

    }


    render() {
        return (<div >
            <Button id={"DeleteForumThreadButton"+ this.props.forumItemDelete._id} onClick={(e) =>this.showConfirmDialog(e)}>Delete</Button>
        </div>);
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    showConfirmForumDeleteAction: deleteForumActions.getShowConfirmForumDeleteAction,
}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(DeleteForumButton)
