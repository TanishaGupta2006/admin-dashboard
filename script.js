document.getElementById("load-users").addEventListener("click", fetchUsers);
document.getElementById("back-button").addEventListener("click", showUsers);
document.getElementById("dark-mode-toggle").addEventListener("click", toggleDarkMode);
document.getElementById("export-data").addEventListener("click", exportData);

function fetchUsers() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(data => {
            const userList = document.getElementById("user-list");
            userList.innerHTML = "";
            data.forEach(user => {
                const userDiv = document.createElement("div");
                userDiv.classList.add("user");
                userDiv.innerHTML = `<h3>${user.name}</h3><p>${user.email}</p>`;
                userDiv.addEventListener("click", () => fetchPosts(user.id));
                userList.appendChild(userDiv);
            });
        })
        .catch(error => console.error("Error fetching users:", error));
}

function fetchPosts(userId) {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(data => {
            const postList = document.getElementById("post-list");
            postList.innerHTML = "";
            data.forEach(post => {
                const postDiv = document.createElement("div");
                postDiv.classList.add("user");
                postDiv.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
                postList.appendChild(postDiv);
            });

            document.getElementById("user-section").style.display = "none";
            document.getElementById("post-section").style.display = "block";
        })
        .catch(error => console.error("Error fetching posts:", error));
}

function showUsers() {
    document.getElementById("user-section").style.display = "block";
    document.getElementById("post-section").style.display = "none";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}

function exportData() {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then(response => response.json())
        .then(users => {
            let csvContent = "data:text/csv;charset=utf-8,Name,Email\n";
            users.forEach(user => {
                csvContent += `${user.name},${user.email}\n`;
            });

            const encodedUri = encodeURI(csvContent);
            const link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "users.csv");
            document.body.appendChild(link);
            link.click();
        })
        .catch(error => console.error("Error exporting data:", error));
}
