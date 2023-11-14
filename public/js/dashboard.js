const newPostButton = $("#postButton");

newPostButton.on("click", async () => {
    location.pathname = "/createpost";
})