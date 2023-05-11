const deletePostHandler = async function(event) {
    event.preventDefault();
    
    // Gets the post ID from form //
    const postId = document.getElementById('post-id')
  
    fetch("/api/userPost/" + postId.value, {
      method: "delete"
  })
  .then(function() {
      document.location.replace("/dashboard");
  })
  .catch(err => console.log(err))
}

document.querySelector("#delete-btn").addEventListener("click", deletePostHandler);