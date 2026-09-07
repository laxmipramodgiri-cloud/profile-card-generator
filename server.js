const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

app.get("/test", (req, res) => {
    res.send("Server is working!");
});

app.post("/create-profile", (req, res) => {
const { name, bio, skills, linkedin, github } = req.body;

if (!name || !bio || !skills) {
return res.status(400).json({
error: "Name, Bio and Skills are required."
});
}

const skillList = skills
.split(",")
.map(skill => skill.trim())
.filter(skill => skill !== "");

const skillsHTML = skillList
.map(skill => `<span class="skill">${skill}</span>`)
.join("");

const card = `
<div class="profile-card">
<div class="avatar">
${name.charAt(0).toUpperCase()}
</div>

<h2>${name}</h2>
<p>${bio}</p>

<div class="skills">
${skillsHTML}
</div>

<div class="social-links">
${linkedin ? `<a href="${linkedin}" target="_blank">LinkedIn</a>` : ""}
${github ? `<a href="${github}" target="_blank">GitHub</a>` : ""}
</div>
</div>
`;

res.json({ card });
});

app.listen(PORT, () => {
console.log(`Server running at http://localhost:${PORT}`);
});