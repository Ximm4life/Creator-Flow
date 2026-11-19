const $ = (id) => document.getElementById(id);

function generateContent() {
  const niche = $("niche").value.trim() || "your topic";
  const platform = $("platform").value;
  const tool = $("tool").value;

  let output = "";

  if (tool === "ideas") {
    output = [
      `1. 5 things beginners should know about ${niche}`,
      `2. I tried ${niche} for 7 days`,
      `3. Common mistakes people make with ${niche}`,
      `4. The ultimate beginner's guide to ${niche}`,
      `5. My honest opinion about ${niche}`,
      `6. Things I wish I knew earlier about ${niche}`,
      `7. Can you master ${niche} in one day?`
    ].join("\n\n");
  }

  if (tool === "titles") {
    output = [
      `The Truth About ${niche}`,
      `I Tried ${niche} So You Don't Have To`,
      `7 ${niche} Tips Every Beginner Needs`,
      `Nobody Tells You This About ${niche}`,
      `How to Get Better at ${niche}`,
      `I Wish I Knew This Before Starting ${niche}`
    ].join("\n\n");
  }

  if (tool === "captions") {
    output = [
      `Here's something you need to know about ${niche} 👀`,
      `Most people get this wrong about ${niche}.`,
      `Would you try this? Let me know below!`,
      `Save this for your next ${niche} session.`,
      `Part 1: Let's talk about ${niche} 🔥`
    ].join("\n\n");
  }

  if (tool === "scripts") {
    output =
`VIDEO SCRIPT: ${niche}

HOOK:
"Have you ever wondered about ${niche}? Here's something worth knowing."

INTRO:
"Today we're talking about ${niche} and sharing a few useful tips."

MAIN POINT 1:
Explain one important fact or tip about ${niche}.

MAIN POINT 2:
Give an example that your audience can understand.

MAIN POINT 3:
Share a common mistake and how to avoid it.

ENDING:
"Which tip was most useful? Let me know in the comments."

This is a starter template. Add your own research and examples.`;
  }

  $("result").textContent = `Platform: ${platform}\n\n${output}`;
}

$("generate").addEventListener("click", generateContent);

$("copy").addEventListener("click", async () => {
  const text = $("result").textContent;
  try {
    await navigator.clipboard.writeText(text);
    $("copy").textContent = "Copied!";
    setTimeout(() => $("copy").textContent = "Copy result", 1500);
  } catch {
    $("copy").textContent = "Select and copy the text";
  }
});

let posts = JSON.parse(localStorage.getItem("creatorflow-posts") || "[]");

function savePosts() {
  localStorage.setItem("creatorflow-posts", JSON.stringify(posts));
  renderPosts();
}

function renderPosts() {
  const planner = $("planner");
  planner.innerHTML = "";

  if (!posts.length) {
    planner.textContent = "No planned posts yet.";
    return;
  }

  posts.forEach((post, index) => {
    const card = document.createElement("div");
    card.className = "post";

    const details = document.createElement("p");
    details.textContent = `${post.date || "No date"} — ${post.name}`;

    const remove = document.createElement("button");
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      posts.splice(index, 1);
      savePosts();
    });

    card.append(details, remove);
    planner.append(card);
  });
}

$("addPost").addEventListener("click", () => {
  const name = $("post").value.trim();
  const date = $("postDate").value;

  if (!name) {
    alert("Enter a content idea first.");
    return;
  }

  posts.push({ name, date });
  $("post").value = "";
  $("postDate").value = "";
  savePosts();
});function generateHooks() {
  const topic = document.getElementById("hookTopic").value.trim();
  const result = document.getElementById("hookResult");

  if (!topic) {
    result.textContent = "Please enter a video topic first.";
    return;
  }

  const hooks = [
    `Nobody tells you this about ${topic}...`,
    `Stop scrolling if you're interested in ${topic}!`,
    `I wish I knew this before getting into ${topic}.`,
    `Here are 5 things you need to know about ${topic}.`,
    `Most people get ${topic} completely wrong.`,
    `This might change the way you think about ${topic}.`,
    `The biggest mistake beginners make with ${topic}.`,
    `Can you believe this about ${topic}?`
  ];

  result.textContent = hooks.join("\n\n");
}

document.getElementById("generateHook")
  .addEventListener("click", generateHooks);

document.getElementById("copyHook")
  .addEventListener("click", async () => {
    const text = document.getElementById("hookResult").textContent;

    try {
      await navigator.clipboard.writeText(text);
      document.getElementById("copyHook").textContent = "Copied!";
    } catch {
      document.getElementById("copyHook").textContent = "Copy unavailable";
    }
  });
  renderPosts();