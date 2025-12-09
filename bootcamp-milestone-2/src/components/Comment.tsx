// Comment component for displaying blog comments

export type IComment = {
  user: string;
  comment: string;
  time: Date | string; // Can be Date or string (from JSON serialization)
};

type CommentProps = {
  comment: IComment;
};

/**
 * Parses a Date object or string into a formatted string like "September 16 2024 8:30AM"
 * @param time - The Date object or string to format
 * @returns Formatted date string
 */
function parseCommentTime(time: Date | string): string {
  const date = new Date(time);
  
  // Get month name
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const month = months[date.getMonth()];
  
  // Get day
  const day = date.getDate();
  
  // Get year
  const year = date.getFullYear();
  
  // Get hours and minutes
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "PM" : "AM";
  
  // Convert to 12-hour format
  hours = hours % 12;
  hours = hours ? hours : 12; // 0 should be 12
  
  // Format minutes with leading zero if needed
  const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
  
  return `${month} ${day} ${year} ${hours}:${minutesStr}${ampm}`;
}

function Comment({ comment }: CommentProps) {
  return (
    <div className="comment">
      <h4 className="comment-user">{comment.user}</h4>
      <p className="comment-text">{comment.comment}</p>
      <span className="comment-time">{parseCommentTime(comment.time)}</span>
    </div>
  );
}

export default Comment;

