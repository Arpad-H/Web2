import {Component} from "react";

import {connect} from "react-redux";
import OpenEditUserDialogButton from "./OpenEditUserDialogButton";
import DeleteUserButton from "./DeleteUserButton";
import {ListGroupItem} from "react-bootstrap";


class UserItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        // let userID =
        return (
            <ListGroupItem>
                <div id={"UserItem" + this.props.userItem.userID}>{ this.props.userItem.userID}
                    <OpenEditUserDialogButton userItemEdit={ this.props.userItem}/>
                    <DeleteUserButton userItemDelete={ this.props.userItem}/>
                </div>
            </ListGroupItem>);
    }
}

export default connect()(UserItem)
// const Login = () => {
//     // const showLoginDialogState = useSelector((state) => state.login.showLoginDialog)
//     const dispatch = useDispatch()
//     return (<div>
//         <Button onClick={() => dispatch(showLoginDialog)}>Login</Button>
//     </div>);
// }

// export default Login