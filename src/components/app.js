import React, { Component } from 'react'
import PostList from '../containers/post-list'

class App extends Component {
    render () {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default App