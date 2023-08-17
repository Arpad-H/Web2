import {Component} from "react";

import {connect} from "react-redux";

import {ListGroupItem} from "react-bootstrap";


class MessageItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        // let userID =
        return (
            <ListGroupItem key={"ForumMessage" + this.props.messageItem._id}>
                <div id={"ForumMessage" + this.props.messageItem._id} className={"forumMessage"}>{ this.props.messageItem.text}

                </div>
            </ListGroupItem>);
    }
}

export default connect()(MessageItem)
// const Login = () => {
//     // const showLoginDialogState = useSelector((state) => state.login.showLoginDialog)
//     const dispatch = useDispatch()
//     return (<div>
//         <Button onClick={() => dispatch(showLoginDialog)}>Login</Button>
//     </div>);
// }

// export default Login