const { postComments } = require("../models")

postCommentData = [
    {
        author: "InnoTechJive",
        comment_content: "This insightful blog on Model-View-Controller beautifully dissects the core principles. The breakdown of MVC's components clarifies its role, making it an essential read for developers seeking clarity in architecture.",
        userPost_id: "1"
    },
    {
        author: "CodeCrazeMaestro",
        comment_content: "This insightful blog on Model-View-Controller beautifully dissects the core principles. The breakdown of MVC's components clarifies its role, making it an essential read for developers seeking clarity in architecture.",
        userPost_id: "2"
    },
    {
        author: "Xandromus",
        comment_content: "This insightful blog on Model-View-Controller beautifully dissects the core principles. The breakdown of MVC's components clarifies its role, making it an essential read for developers seeking clarity in architecture.",
        userPost_id: "3"
    }
]

let seedPostComments = () => postComments.bulkCreate(postCommentData);

module.exports = seedPostComments;