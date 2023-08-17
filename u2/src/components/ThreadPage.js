import {Component} from "react";
import {logDOM} from "@testing-library/react";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as threadLoadActions from "../actions/ThreadLoadActions";
import UserItem from "./UserItem";
import MessageItem from "./MessageItem";
import {ListGroupItem} from "react-bootstrap";
import CreateMessageDialog from "./CreateMessageDialog";

const mapStateToProps = state => {
    return state;
}

class ThreadPage extends Component {
    componentDidMount() {
        this.loadMessages()

    }

    constructor(props) {
        super(props);
        this.loadMessages = this.loadMessages.bind(this)
        this.displayMessages = this.displayMessages.bind(this)
    }

    loadMessages() {
        // const {accessToken} = this.props
        const {getMessagesAction} = this.props
        getMessagesAction(this.props.threadToBeViewed._id)
    }
    displayMessages() {
        let list = []
        if (this.props.messagesList.messages) {
            this.props.messagesList.messages.forEach(message => {
                // console.log(user)
                list.push(
                   <MessageItem messageItem={message}/>
                )
            })
            // list.push(</ListGroup>)
            // console.log(list)
            return list
            // return <div id={"UserItem" }>user item</div>
        }
    }
    render() {
// this.loadMessages()
        let list
        console.log(this.props.messagesList)
        if (!this.props.showCreateMessageDialog) {
            list = this.props.messagesList
        }
        return (<>
            <div id={"ThreadPage"}>
                <h1>WE-2 Forum</h1>
                {this.props.threadToBeViewed.name}
                <CreateMessageDialog /> 
                {list ? this.displayMessages() : <ListGroupItem>Loading Messages...</ListGroupItem>}

            </div>
        </>)

    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    getMessagesAction: threadLoadActions.getMessages
}, dispatch)
export default connect(mapStateToProps,mapDispatchToProps)(ThreadPage)