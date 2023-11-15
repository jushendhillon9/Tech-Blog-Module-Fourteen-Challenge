const editPost = $("#editPostPage");
const articles = $("#toCommentPage");
const newPostButton = $("#postButton");

editPost.on("click", async (event) => {
    let postID = $(event.target).closest("a").data("postid");
    let targetURL = "/editpost" + postID;
    location.pathname = targetURL;
})

newPostButton.on("click", async () => {
    location.pathname = "/createpost";
})