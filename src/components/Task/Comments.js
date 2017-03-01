import React from 'react';
import R from 'ramda';
import ShowIf from '../common/ShowIf';
import { prettyTimeElapsed } from '../../utilities';


const CommentBoxes = R.pipe(
  R.ifElse(
    R.prop('expanded'),
    R.prop('comments'),
    R.compose(R.take(3), R.prop('comments'))
  ),
  R.map(comment => (
    <div className="box task-comment" key={comment.commentID}>
      {comment.from}: {comment.comment} - {prettyTimeElapsed(comment.date)} ago
    </div>
  )),
  result => <div>{result}</div>
);

const AddComment = R.pipe(
  R.path(['addComment', 'comment']),
  R.unless(R.not,
    comment =>
    <div className="box task-comment">
      <textarea className='add-comment-text' value={comment} />
    </div>
  ),
  R.defaultTo(<div />)
);

const Comments = ({comments, addComment, expanded, expand}) => {
  const viewMoreCommentsText =
    'View ' + (comments.length - 3) +
    ' more comment' + ((comments.length > 4) ? 's' : '');
  return (
    <div>
      <AddComment addComment={addComment} />
      <ShowIf show={comments.length > 3 && !expanded}>
        <div className="box task-comment">
          <a href="#nowhere" className="primary-link"
            onClick={expand}>
            {viewMoreCommentsText}
          </a>
        </div>
      </ShowIf>
      <CommentBoxes comments={comments} expanded={expanded} />
    </div>
  );
}

export default Comments;
