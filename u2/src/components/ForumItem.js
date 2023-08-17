import {Component} from "react";

import {connect} from "react-redux";

import {ListGroupItem} from "react-bootstrap";
import OpenEditUserDialogButton from "./OpenEditUserDialogButton";
import DeleteForumButton from "./DeleteForumButton";
import EditForumButton from "./EditForumButton";
import OpenThreadPageButton from "./OpenThreadPageButton";


class ForumItem extends Component {

    constructor(props) {
        super(props);

    }

    render() {
        // let userID =
        return (
            <ListGroupItem>
                <div id={"ForumThread" + this.props.forumItem._id} className={"forumThread"}>{this.props.forumItem.name}
                    <EditForumButton forumItemEdit={this.props.forumItem}/>
                    <DeleteForumButton forumItemDelete={this.props.forumItem}/>
                    <OpenThreadPageButton threadItem={this.props.forumItem}/>
                </div>
            </ListGroupItem>);
    }
}

export default connect()(ForumItem)
// const Login = () => {
//     // const showLoginDialogState = useSelector((state) => state.login.showLoginDialog)
//     const dispatch = useDispatch()
//     return (<div>
//         <Button onClick={() => dispatch(showLoginDialog)}>Login</Button>
//     </div>);
// }

// export default Login