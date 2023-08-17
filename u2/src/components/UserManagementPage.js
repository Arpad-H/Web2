import {Component} from "react";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";

import * as userManagementActions from "../actions/UserManagementActions"

import {ListGroup, ListGroupItem} from "react-bootstrap";
import CreateUserDialog from "./CreateUserDialog";
import {getShowEditUserDialogAction} from "../actions/EditUserActions";

import EditUserDialog from "./EditUserDialog";
import OpenEditUserDialogButton from "./OpenEditUserDialogButton";
import DeleteUserButton from "./DeleteUserButton";
import UserItem from "./UserItem";
import DeleteUserConfirm from "./DeleteUserConfirm";

const mapStateToProps = state => {
    return state;
}

class UserManagementPage extends Component {
    componentDidMount() {
        this.loadUsers()
        // console.log("user list")
        // console.log(this.props.userList.users)
        // console.log("Component has been rendered");
    }


    constructor(props) {
        super(props);
        this.loadUsers = this.loadUsers.bind(this)
        this.displayUsers = this.displayUsers.bind(this)
        // this.editUser = this.editUser.bind(this)

    }

    loadUsers() {
        const {accessToken} = this.props
        const {getUsersAction} = this.props
        getUsersAction(accessToken)
    }

    handleShowEditUser() {
        const dispatch = this.props.dispatch
        dispatch(getShowEditUserDialogAction())
    }

    displayUsers() {
        let list = []
        // list.push(<ListGroup>)
        // console.log(this.props.userList)
        if (this.props.userList.users) {
            this.props.userList.users.forEach(user => {
                // console.log(user)
                list.push(
                    <UserItem userItem={user}/>
                )
            })
            // list.push(</ListGroup>)
            // console.log(list)
            return list
            // return <div id={"UserItem" }>user item</div>
        }
    }

    render() {
        let list
        if (!this.props.showCreateUserDialog) {
            list = this.props.userList
        }
        return (<>
            <div id={"UserManagementPage"}>
                <h1>WE-2 Forum</h1>
                Dies ist die Seite zum Bearbeiten von Usern
                <CreateUserDialog/>
                <EditUserDialog/>
                <DeleteUserConfirm/>
                <ListGroup>
                    {list ? this.displayUsers() : <ListGroupItem>Loading Users...</ListGroupItem>}
                </ListGroup>
            </div>
        </>)

    }
}

const
    mapDispatchToProps = dispatch => bindActionCreators({

        getUsersAction: userManagementActions.getUsers
    }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(UserManagementPage)

