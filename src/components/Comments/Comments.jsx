import React from 'react';
import Comment from '../Comment/Comment';
import './Comments.scss';

const Comments = ({ comments }) => {
  // Sort comments, newest first
  const sortedComments = [...comments].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className="comments">
      {sortedComments.length > 0 ? (
        sortedComments.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))
      ) : (
        <p>No comments yet</p>
      )}
    </div>
  );
};

export default Comments;
