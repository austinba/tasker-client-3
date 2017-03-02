import React from 'react';
import R from 'ramda';
import ShowIf from '../common/ShowIf';
import { prettyTimeElapsed, fullName } from '../../utilities';
import { connect } from 'react-redux'


const getComments = R.ifElse(
  R.prop('expanded'),
  R.prop('comments'),
  R.compose(R.take(3), R.prop('comments'))
);

let CommentBoxes = ({users, comments, expanded}) => {
  if(expanded) comments = R.take(3, comments);
  return R.pipe(
    R.map(({comment, from, commentID, date}) => (
      <div className="box inner-box task-comment" key={commentID}>
        {fullName(users)(from) || 'Unknown User'}: &nbsp;
        {comment} - {prettyTimeElapsed(date)} ago
      </div>
    )),
    result => <div>{result}</div>
  )(comments);
};
CommentBoxes = connect(state => ({ users: state.users }))(CommentBoxes)

const AddComment = (props) => (
  <div className="box inner-box task-comment">
    <textarea className='add-comment-text' value={props.comment} />
  </div>
);

const Comments = ({comments, commentBeingAdded, expanded, expand}) => {
  const viewMoreCommentsText =
    'View ' + (comments.length - 3) +
    ' more comment' + ((comments.length > 4) ? 's' : '');
  return (
    <div>
      <ShowIf show={commentBeingAdded}>
        <AddComment commentBeingAdded={commentBeingAdded} />
      </ShowIf>
      <ShowIf show={comments.length > 3 && !expanded}>
        <div className="box inner-box task-comment">
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
