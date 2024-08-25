import React from 'react';
import './Comments.scss';

const Comments = ({ comments }) => {
  //Sort comments, newest first
  const sortedComments = [...comments].sort((a, b) => b.timestamp - a.timestamp);

  return (
    <div className="comments">
      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <div key={comment.id} className='comments__container'>
            <div className='comments__avatar-info'>
              <div className='comments__avatar'>{comment.name[0]}</div>
              <div className="comments__info">
                <div className="comments__name"><h3>{comment.name}</h3></div>
                <div className="comments__timestamp">{new Date(comment.timestamp).toLocaleString()}</div>
              </div>
            </div>
            <div className="comments__text">{comment.comment}</div>
          </div>
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};


export default Comments;
