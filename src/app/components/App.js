import React from 'react'
import { Router, Route, hashHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin';

import AppsHeader from './AppsHeader/';
import UsersDashboard from './UsersDashboard/';
import ExamplesList from './ExamplesList';

class App extends React.Component {
    componentWillMount() {
        console.log('inject tap event plugin');
        injectTapEventPlugin();
    }
    render() {
        return (
            <div>
                <Router history={window.reduxHistory}>
                    <Route path="/" component={
                        (props) => (<div>
                            <AppsHeader title={"example list"}/>
                            <ExamplesList/>
                        </div>)
                    }/>
                    {
                        window.user && window.user.isAdmin ? 
                            <Route path="/users" component={
                                (props) => (<div>
                                    <AppsHeader title={"users"}/>
                                    <UsersDashboard/>
                                </div>)
                            }/>
                            : null
                    }
                    <Route path="*" component={
                        (props) => (<div>
                            <AppsHeader title={"example list"}/>
                            <ExamplesList/>
                        </div>)
                    }/>
                </Router>
            </div>
        )
    }
}

export default App