import {Button} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../actions/NavigationActions";
import {getGoToPersonalPageAction} from "../actions/NavigationActions";

const mapStateToProps = state => {
    return state;
}

class OpenPersonalPageButton extends Component {

    constructor(props) {
        super(props);
        this.openPersonalPage = this.openPersonalPage.bind(this)
    }

    openPersonalPage() {

        const {goToPersonalPageAction} = this.props
        goToPersonalPageAction()
    }

    render() {
        return (<div>
            <Button id={"OpenPrivatePageButton"} onClick={this.openPersonalPage}>PersonalPage</Button>
        </div>);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToPersonalPageAction: navigationActions.getGoToPersonalPageAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpenPersonalPageButton)


