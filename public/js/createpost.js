const createButton = $("#createButton");

createButton.on("click", async (req, res) => {
    const postTitle = $("#titleInput").val().trim();
    const postContent = $("#contentInput").val().trim();
    const response = await fetch("/api/createpost", {
        method: "POST",
        body: JSON.stringify({postTitle, postContent}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json();
    location.pathname = "/dashboard"
})