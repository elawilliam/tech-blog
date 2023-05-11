const commentFormHandler = async function(event) {
    event.preventDefault();
  
    const postId = document.querySelector('input[name="post-id"]').value;
    const body = document.querySelector('textarea[name="comment-body"]').value;
  
    if (body) {
      await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
          postId,
          body
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
  
      // Fetches the new comment from the server //
      const response = await fetch(`/api/comments/${postId}`);
      const { comments } = await response.json();
      const commentsSection = document.querySelector('#comments-section');
  
      // Clears the comments section & appends the updated comments //
      commentsSection.innerHTML = '';
      comments.forEach(comment => {
        const commentEl = document.createElement('div');
        commentEl.innerHTML = `
          <p>${comment.body}</p>
          <p>&mdash; ${comment.User.username}, ${format_date(comment.createdAt)}</p>
        `;
        commentsSection.appendChild(commentEl);
      });
  
      // Clears the comment form //
      document.querySelector('textarea[name="comment-body"]').value = '';
    }
  };
  
  document
    .querySelector('#new-comment-form')
    .addEventListener('submit', commentFormHandler);