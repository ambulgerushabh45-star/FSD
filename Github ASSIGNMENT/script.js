const fetchBtn = document.getElementById("fetchBtn");
const usernameInput = document.getElementById("username");
const repoTable = document.getElementById("repoTable").getElementsByTagName('tbody')[0];
const errorMsg = document.getElementById("errorMsg");

fetchBtn.addEventListener("click", () => {
    const username = usernameInput.value.trim();
    repoTable.innerHTML = ""; // Clear previous results
    errorMsg.innerText = "";

    if (username === "") {
        errorMsg.innerText = "Please enter a GitHub username";
        return;
    }

    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (!response.ok) {
                throw new Error("User not found");
            }
            return response.json();
        })
        .then(data => {
            if (data.length === 0) {
                errorMsg.innerText = "No repositories found for this user.";
                return;
            }

            data.forEach(repo => {
                const row = repoTable.insertRow();
                const nameCell = row.insertCell(0);
                const descCell = row.insertCell(1);
                const urlCell = row.insertCell(2);

                nameCell.innerText = repo.name;
                descCell.innerText = repo.description || "No description";
                urlCell.innerHTML = `<a href="${repo.html_url}" target="_blank">Link</a>`;
            });
        })
        .catch(err => {
            errorMsg.innerText = err.message;
        });
});
