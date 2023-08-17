import {Component} from "react";
import {bindActionCreators} from "redux";

import {connect} from "react-redux";

import * as forumOverviewActions from "../actions/ForumOverviewActions";
import {ListGroup, ListGroupItem} from "react-bootstrap";
import ForumItem from "./ForumItem";
import CreateForumThread from "./CreateForumThread";
import DeleteForumConfirm from "./DeleteForumConfirm";
import EditForumDialog from "./EditForumDialog";
import CreateMessageDialog from "./CreateMessageDialog";


const mapStateToProps = state => {
    return state;
}

class ForumThreadOverview extends Component {
    componentDidMount() {
        this.loadForums()

    }


    constructor(props) {
        super(props);
        this.loadForums = this.loadForums.bind(this)
        this.displayForums = this.displayForums.bind(this)


    }

    loadForums() {
        // const {accessToken} = this.props
        const {getForumsAction} = this.props
        getForumsAction()
    }

    // handleShowEditUser() {
    //     // const dispatch = this.props.dispatch
    //     // dispatch(getShowEditUserDialogAction())
    // }

    displayForums() {
        let list = []
        // console.log(this.props.forumList)
        if (this.props.forumList.forums) {
            this.props.forumList.forums.forEach(forum => {
                list.push(
                    <ForumItem forumItem={forum}/>
                )
            })
            return list
        }
    }

    render() {
        let list
        if (!this.props.showCreateForumDialog) {
            list = this.props.forumList
        }
        return (<>
            <div id={"ForumThreadOverview"}>
                <h1>WE-2 Forum</h1>
                Dies ist die Seite zum Anzeigen von Forums
                <DeleteForumConfirm/>
                <CreateForumThread/>
                <EditForumDialog/>
                {/*<DeleteUserConfirm/>*/}
                <ListGroup id={"ForumThreadList"}>
                    {list ? this.displayForums() : <ListGroupItem>Loading forums...</ListGroupItem>}
                </ListGroup>
            </div>
        </>)

    }
}

const
    mapDispatchToProps = dispatch => bindActionCreators({
        getForumsAction:  forumOverviewActions.getForums
    }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(ForumThreadOverview)

