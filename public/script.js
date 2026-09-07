const profileForm = document.getElementById("profileForm");
const profileResult = document.getElementById("profileResult");

profileForm.addEventListener("submit", async function (event) {
event.preventDefault();

const formData = new FormData(profileForm);

const profileData = {
name: formData.get("name"),
bio: formData.get("bio"),
skills: formData.get("skills"),
linkedin: formData.get("linkedin"),
github: formData.get("github")
 };

try {
const response = await fetch("/create-profile", {
method: "POST",
headers: {
"Content-Type": "application/json"
},
body: JSON.stringify(profileData)
});

const data = await response.json();

if (response.ok) {
profileResult.innerHTML = data.card;
} else {
profileResult.innerHTML = `<p>${data.error}</p>`;
}

} catch (error) {
profileResult.innerHTML = "<p>Something went wrong!</p>";
console.error(error);
}
});