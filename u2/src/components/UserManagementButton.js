import {Button} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../actions/NavigationActions";
import {getGoToPersonalPageAction, getGoToUserManagementPageAction} from "../actions/NavigationActions";

const mapStateToProps = state => {
    return state;
}
class UserManagementButton extends Component{

    constructor(props) {
        super(props);
        this.showUserManagementPage = this.showUserManagementPage.bind(this)
    }

    showUserManagementPage(){
        const {goToUserManagementPageAction} = this.props
        goToUserManagementPageAction()
    }

    render() {
        return (<div>
            <Button id={"OpenUserManagementButton"} onClick={this.showUserManagementPage}>User Management</Button>
        </div>);
    }
}
const mapDispatchToProps = dispatch => bindActionCreators({
    goToUserManagementPageAction: navigationActions.getGoToUserManagementPageAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(UserManagementButton)
