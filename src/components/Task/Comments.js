import React from 'react';
import R from 'ramda';
import ShowIf from '../common/ShowIf';
import { prettyTimeElapsed, fullName, onActionKey } from '../../utilities';
import { connect } from 'react-redux'
import * as taskActions from '../../actions/task';


const getComments = R.ifElse(
  R.prop('expanded'),
  R.prop('comments'),
  R.compose(R.take(3), R.prop('comments'))
);

let CommentBoxes = ({users, comments, expanded}) => {
  if(!expanded) {
    if(comments.length >= 4) comments = R.take(2, comments);
    if(comments.length <= 3) comments = R.take(3, comments);
  }
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


const AddComment = (props) => {
  const {commentBeingAdded, cancel, save, edit} = props;
  const {comment} = commentBeingAdded;
  const onKeyDown = onActionKey(save, cancel);
  return (
    <div className="box inner-box task-comment add-comment">
      <textarea className='add-comment-text'
                onKeyDown={onKeyDown}
                onChange={edit}
                value={comment} />
    </div>
  );
};

const Comments = props => {
  const { comments,
          commentBeingAdded,
          saveComment,
          editComment,
          cancelAddComment,
          addCommentEdit,
          expanded,
          expand} = props;

  const viewMoreCommentsText =
    'View ' + (comments.length - 2) +
    ' more comment' + ((comments.length > 3) ? 's' : '');
  return (
    <div>
      <ShowIf show={commentBeingAdded}>
        <AddComment commentBeingAdded={commentBeingAdded}
                    save={saveComment}
                    edit={addCommentEdit}
                    cancel={cancelAddComment}/>
      </ShowIf>
      <ShowIf show={comments.length >= 4 && !expanded}>
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
