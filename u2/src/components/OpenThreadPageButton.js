import {Button} from "react-bootstrap";
import {Component} from "react";


import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as navigationActions from "../actions/NavigationActions";


const mapStateToProps = state => {
    return state;
}

class OpenThreadPageButton extends Component {

    constructor(props) {
        super(props);
        this.openThreadPage = this.openThreadPage.bind(this)
    }

    openThreadPage() {

        const {goToThreadPageAction} = this.props
        goToThreadPageAction(this.props.threadItem)
    }

    render() {
        return (<div>
            <Button id={"ViewForumThreadButton" + this.props.threadItem._id}
                    onClick={this.openThreadPage}>View Thread</Button>
        </div>);
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    goToThreadPageAction: navigationActions.getGoToThreadPageAction
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(OpenThreadPageButton)


