import React from 'react';
import classes from './Post.module.css';

const Post = (props) => {
   return <div className={classes.item}>
      <img src='https://yt3.ggpht.com/a/AATXAJxlPvJZvg-IUO-Stb6lGFt3OWqBqwNyQEpgrg=s900-c-k-c0xffffffff-no-rj-mo' />
      {props.message}
      <div>
         <span>Like {props.likeCount}</span>
      </div>
   </div>
}

export default Post;