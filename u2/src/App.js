import './App.css';
import TopMenu from "./components/TopMenu"
import MainPage from "./components/MainPage";
import PersonalPage from "./components/PersonalPage";
import {connect} from "react-redux";
import React, {Component} from "react";
import UserManagementPage from "./components/UserManagementPage";
import ForumThreadOverview from "./components/ForumThreadOverview";
import ThreadPage from "./components/ThreadPage";


const mapStateToProps = state => {
    return state
}

class App extends Component {

    render() {

        const token = this.props.accessToken

        let workspace = this.props.workspace
        // console.log(workspace)
        if (workspace === "personalPage"){
            workspace = <PersonalPage />
        }else if (workspace === "userManagementPage") {
            workspace = <UserManagementPage />
        }else if (workspace ==="mainPage" || !token){
            workspace = <MainPage />
        }
        else if (workspace ==="forumThreadOverviewPage" || !token){
            workspace = <ForumThreadOverview />
        } else if (workspace ==="threadPage" || !token){
            workspace = <ThreadPage />
        }
        // console.log(token)
        return (
            <div className="App">
                <TopMenu/>
                {workspace}
            </div>
        );
    }
}

export default connect(mapStateToProps)(App);
