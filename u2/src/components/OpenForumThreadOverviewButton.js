import {Button} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../actions/NavigationActions";


const mapStateToProps = state => {
    return state;
}

class OpenForumThreadOverviewButton extends Component {

    constructor(props) {
        super(props);
        this.openForumThreadOverview = this.openForumThreadOverview.bind(this)
    }

    openForumThreadOverview() {

        const {goToForumOverviewPage} = this.props
        goToForumOverviewPage()
    }

    render() {
        return (<div>
            <Button id={"OpenForumThreadOverviewButton"} onClick={this.openForumThreadOverview}>Forums</Button>
        </div>);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToForumOverviewPage: navigationActions.getGoToForumThreadOverviewPageAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpenForumThreadOverviewButton)


