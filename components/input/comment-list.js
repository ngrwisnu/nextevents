import classes from "./comment-list.module.css";

function CommentList(props) {
  const { comments } = props;
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {comments.map((comment) => (
        <li key={comment.id}>
          <p>{comment.comment}</p>
          <div>
            By <address>{comment.name}</address>
          </div>
        </li>
      ))}
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
      <li>
        <p>My comment is amazing!</p>
        <div>
          By <address>Maximilian</address>
        </div>
      </li>
    </ul>
  );
}

export default CommentList;
