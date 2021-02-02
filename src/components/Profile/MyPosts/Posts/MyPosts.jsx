import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Textarea } from '../../../../common/FormsControls/FormsControl';
import { maxLengthCreator, required } from '../../../../utils/validators';
import classes from './MyPosts.module.css';
import Post from './Post';

const MyPosts = (props) => {

   let postsElements = props.posts.map(p => <Post key={p.key} message={p.message} likeCount={p.likeCount} />);




   let onAddPost = (values) => {
      props.addPost(values.newPostText);
   }

   return <div className={classes.postsBlock}>
      <h3>My posts</h3>
      <AddPostFormRedux onSubmit={onAddPost} />
      <div className={classes.posts}>
         {postsElements}
      </div>
   </div>

}

const maxLength10 = maxLengthCreator(10);

const AddNewPostForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <div>
            <Field component={Textarea} name='newPostText' placeholder='Enter your text'
               validate={[required, maxLength10]} />
         </div>
         <div>
            <button>Add post</button>
         </div>
      </form>
   )
}

const AddPostFormRedux = reduxForm({ form: 'profileAddNewPostForm' })(AddNewPostForm)

export default MyPosts;