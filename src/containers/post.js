import React, { Component } from 'react';
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {readPost} from "../actions/index"
import PostContent from "../components/post-content"
import { Link  } from 'react-router'
class Post extends Component {
    
    componentWillMount () {
        this.props.readPost(this.props.params.id)
    }
    
    render () {
        return (
            <div className="default_margin_top">
                <PostContent post={this.props.post}/>
                <Link className="button_space" to="/"> <button   className="btn btn-danger" >Retour</button></Link>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        post: state.activePost
    }
}

function mapDispatchToProps (dispatch) {
    return bindActionCreators({readPost},dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)