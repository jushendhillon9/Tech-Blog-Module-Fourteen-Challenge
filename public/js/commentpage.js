const submitcomment = $("#submitCommentButton");

submitcomment.on("click", async () => {
    const commentContent = $("#commentInput").val().trim();
    if (commentContent == "") {
        return;
    }
    const postID = $("#commentPageContainer").data("postid");
    const response = await fetch("/api/addcomment", {
        method: "POST",
        body: JSON.stringify({commentContent, postID}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json();
    location.pathname = "/homepage";
})