// Simulated post database (in memory)
let posts = {};

// Helper function to generate a unique post ID
function generatePostID() {
    return `post-${Math.random().toString(36).substr(2, 9)}`;
}

// Check if a specific post ID is in the URL
const params = new URLSearchParams(window.location.search);
const currentPostID = params.get("post");

if (currentPostID) {
    // If a post ID exists, display its content
    document.body.innerHTML = `
        <h1>Viewing Post: ${currentPostID}</h1>
        <a href="/">Go Back</a>
        <hr>
        <img src="${posts[currentPostID]}" alt="Post Image" style="max-width: 100%;">
    `;
} else {
    // Otherwise, display the main page
    document.getElementById("postButton").addEventListener("click", () => {
        const fileInput = document.getElementById("fileInput");
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const imageURL = e.target.result;

                // Generate a new post ID
                const postID = generatePostID();
                posts[postID] = imageURL;

                // Add the post to the list
                const postList = document.getElementById("postList");
                const listItem = document.createElement("li");
                listItem.innerHTML = `
                    <a href="?post=${postID}">View Post: ${postID}</a>
                `;
                postList.appendChild(listItem);
            };
            reader.readAsDataURL(file);
        }
    });
}
