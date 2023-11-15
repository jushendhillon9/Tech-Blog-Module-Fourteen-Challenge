const createButton = $("#createButton");
const updateButton = $("#updatePost");
const deleteButton = $("#deletePostButton");

createButton.on("click", async (req, res) => {
    const postTitle = $("#titleInput").val().trim();
    const postContent = $("#contentInput").val().trim();
    const response = await fetch("/api/createpost", {
        method: "POST",
        body: JSON.stringify({postTitle, postContent}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json();
    location.pathname = "/dashboard";
})

updateButton.on("click", async (req, res) => {
    const postTitle = $("#titleInput").val().trim();
    const postContent = $("#contentInput").val().trim();
    const response = await fetch("/api/updatepost", {
        method: "PUT",
        body: JSON.stringify({postTitle, postContent}),
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json();
    window.location = "/dashboard";
})

deleteButton.on("click", async (req, res) => {
    const response = await fetch("/api/deletepost", {
        method: "DELETE",
        headers: {"Content-Type": "application/json"}
    })
    const data = await response.json();
    window.location = "/dashboard";
})