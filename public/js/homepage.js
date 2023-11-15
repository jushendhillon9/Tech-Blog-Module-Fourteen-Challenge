const articles = $("#toCommentPage");

articles.on("click", (event) => {
    event.preventDefault();
    console.log($(event.target).closest("a").attr("id"))
    let postID = $(event.target).closest("a").data("postid");
    let targetURL = "/commentpage" + postID
    location.pathname = targetURL;
})