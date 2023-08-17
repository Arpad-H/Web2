import {Button} from "react-bootstrap";
import {Component} from "react";

import {getLogoutAction} from "../actions/AuthenticationActions";
import {connect} from "react-redux";


class LoginButton extends Component {

    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this)
    }

    logout() {
        const dispatch = this.props.dispatch
        dispatch(getLogoutAction())
    }

    render() {
        return (<div>
            <Button id={"LogoutButton"} onClick={this.logout}>Logout</Button>
        </div>);
    }
}

export default connect()(LoginButton)
// const Login = () => {
//     // const showLoginDialogState = useSelector((state) => state.login.showLoginDialog)
//     const dispatch = useDispatch()
//     return (<div>
//         <Button onClick={() => dispatch(showLoginDialog)}>Login</Button>
//     </div>);
// }

// export default Login