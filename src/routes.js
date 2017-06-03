import React, { Component } from 'react';
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'

import App from "./components/app"
import Post from './containers/post'
import PostList from './containers/post-list'

import PostForm from './containers/post-form'
import NotFound from './components/not-found'

class Routes extends Component {
    render() {
        return (
            <Router history={browserHistory}>
                  <Route path="/" component={App}>

                   <IndexRoute component={PostList}/>
                    <Route path="post-list" component={PostList}/>
                    <Route path="post/:id" component={Post}/>
                    <Route path="create-post" component={PostForm}/>

                  </Route>
                
                  <Route path="*" component={NotFound} />
           </Router> 
        );
    }
}

export default Routes;