import {Button} from "react-bootstrap";
import {Component} from "react";

import {getShowLoginDialogAction} from "../actions/AuthenticationActions";
import {connect} from "react-redux";


class LoginButton extends Component{

    constructor(props) {
       super(props);
       this.showLoginDialog = this.showLoginDialog.bind(this)
   }

   showLoginDialog(){
       const dispatch = this.props.dispatch
       dispatch(getShowLoginDialogAction())
   }

    render() {
        return (<div>
            <Button id={"OpenLoginDialogButton"} onClick={this.showLoginDialog}>Login</Button>
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