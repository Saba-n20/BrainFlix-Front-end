import React from 'react';
import Comment from '../Comment/Comment';
import './Comments.scss';

const Comments = ({ comments, videoId, onDelete }) => {
  const sortedComments = [...comments].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));

  return (
    <div className="comments">
      {sortedComments.length > 0 ? (
        sortedComments.map(comment => (
          <Comment 
            key={comment.id} 
            comment={comment} 
            videoId={videoId} 
            onDelete={onDelete}
          />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default Comments;
