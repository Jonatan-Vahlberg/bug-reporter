import React from 'react';
import Comment from 'src/models/Comment';
import CommentBox from './CommentBox';

const ReportComments: React.FC<{comments: Comment[]}> = ({comments}) => {
  return (
    <>
      {comments.map(comment => {
        // if (comment.action !== undefined) {
        //   return null;
        // }
        return <CommentBox comment={comment} />;
      })}
    </>
  );
};

export default ReportComments;
