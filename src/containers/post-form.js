import React, { Component } from 'react'
import {reduxForm,Field} from 'redux-form'
import { Link  } from 'react-router'
import {createPost} from "../actions/index"
import {bindActionCreators} from "redux"
import {connect} from "react-redux"
import { browserHistory } from 'react-router';

const formConfig ={
  form: 'createPostForm',
  initialValues :{author:"Moi"},
  fields : ['title','content','author'],
  validate: validate
}
class PostForm extends Component {

    render () {
          const {errors,fields : {title,content,author} ,handleSubmit, fields } = this.props;
        return (
           <form onSubmit={handleSubmit(this.createPost.bind(this)) } className="default_margin_top">
                 <h1>Nouveau post</h1>
                   <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : '' }`}>
                        <label>Titre</label>
                            <input className="form-control" type="text" {...fields.title} />
                            <div className="text-help">{title.touched ? errors.title : ""}</div>
                        
                    </div>
                    <div className={`form-group ${content.touched && content.invalid ? 'has-danger' : '' }`}>
                        <label >Description</label>
                        
                            <input className="form-control" type="textarea" {...fields.content}/>
                            <div className="text-help">{content.touched ? errors.content : ""}</div>
                        
                    </div>     
                    <div className={`form-group ${author.touched && author.invalid ? 'has-danger' : '' }`}>
                        <label >Auteur</label>
                        
                            <input className="form-control md" type="text" {...fields.author}/>
                            <div className="text-help">{author.touched ? errors.author : ""}</div>
                  </div>        
                  
                   <Link className="button_space" to="/"> <button   className="btn btn-danger" >Retour</button></Link>
                   <button type="submit"  className="btn btn-primary" disabled={this.props.invalid}>Créer</button>          
         </form>
        )
    }

    createPost(post){
        this.props.createPost(post)
        browserHistory.push('/');
    }

}
function validate (values) {
  const errors = {}
   if(!values.title ){
        errors.title = "Le titre est requis"
    }
     if(!values.content ){
        errors.content = "La description est requise"
    }
     if(!values.author ){
        errors.author = "L'auteur est requis"
    }
    return errors;

}



const mapDispatchToProps = (dispatch) => ({
    ...bindActionCreators({createPost}, dispatch)
});

export default connect(null, mapDispatchToProps)(reduxForm(formConfig)(PostForm));