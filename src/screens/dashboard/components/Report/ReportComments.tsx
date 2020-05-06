import React from 'react';
import Comment from 'src/models/Comment';
import CommentBox from './CommentBox';
import CommentConnector from './CommentConector';

const ReportComments: React.FC<{comments: Comment[]}> = ({comments}) => {
  return (
    <>
      {comments
        .sort((a, b) => {
          //@ts-ignore
          return new Date(a.date) - new Date(b.date);
        })
        .map(comment => {
          return (
            <>
              <CommentConnector
                action={comment.action}
                name={comment.senderName}
              />
              <CommentBox comment={comment} />
            </>
          );
        })}
    </>
  );
};

export default ReportComments;
