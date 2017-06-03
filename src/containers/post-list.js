import React, { Component } from 'react';
import PostListItem from "../components/post-list-item"
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import {readAllPost,deletePost} from "../actions/index"
import ReactCSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'
import { Link  } from 'react-router'

class PostList extends Component {    
    constructor(props){
        super(props)
        this.state= {displayMineOnly : false}
    }
    componentWillMount() {
        this.props.readAllPost()
    }
    
    renderPosts(){
        
        const {posts} = this.props
        let arrayMap ;
        if(posts){
            if(this.state.displayMineOnly){
                arrayMap = this.filterMyPost(posts)
            }else{
                arrayMap = posts;
            }
             return (
                    arrayMap.map((p) => {
                        return <PostListItem post={p} key={p.id} deletePostCallBack={this.deletePost.bind(this)}/>
                    })
                )
        }
    }
    filterMyPost(postsList){
       return postsList.filter((p) => {
           if(p.author == "Moi"){
               return p
           }else{
               return false;
           }
       })
    }
    deletePost(post){
        this.props.deletePost(post.id)
    }

    render() {
        return (
            <div className="default_margin_top">
                <h1>Boite à post</h1>
                <div className="checkbox">
                    <label><input type="checkbox" onChange={(e) => this.setState({displayMineOnly:e.target.checked})}/>Afficher uniquement mes posts</label>
                </div>
                <div className="button_add">
                <Link to="/create-post"> <button className="btn btn-primary btn-circle btn-lg ">+</button></Link>
                </div>
                 <table className="table table-hover">
                <thead>
                <tr>
                    <th>Titre</th>
                    <th>Action</th>
                </tr>
                </thead>
                <ReactCSSTransitionGroup
              transitionName="fade"
              transitionEnterTimeout={500}
              transitionLeaveTimeout={300}
              component="tbody"
            >
            {this.renderPosts()}
            </ReactCSSTransitionGroup>       
           </table>
             
            </div>
        );
    }
}
const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({readAllPost,deletePost}, dispatch),
});

const mapStateToProps = (state) => {
    return {
        posts:state.posts
    }
}
export default connect(mapStateToProps,mapDispatchToProps) (PostList);