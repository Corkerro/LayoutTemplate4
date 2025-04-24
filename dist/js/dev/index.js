import { d as data } from "./app.min.js";
const searchInput = document.getElementById("search");
const resultsContainer = document.getElementById("results");
const filePath = "assets/img";
function getTextContent(post) {
  const textFields = ["title", "content", "prev"];
  return textFields.map((field) => {
    var _a;
    return ((_a = post[field]) == null ? void 0 : _a.replace(/<[^>]+>/g, "")) || "";
  }).join(" ");
}
function parseDate(dateString) {
  const [day, month, year] = dateString.split(".");
  return new Date(year, month - 1, day);
}
function renderResults(items) {
  resultsContainer.innerHTML = "";
  if (items.length === 0) {
    resultsContainer.innerHTML = "<p>Не знайдено</p>";
    return;
  }
  items.forEach((post, i) => {
    const link = document.createElement("a");
    link.href = post.filename;
    link.classList.add("card");
    link.innerHTML = `
            <p class="card__index">${String(i + 1).padStart(2, "0")}</p>
            <img src="${filePath}/small-${post.cover}" alt="${post.title}" class="card__img">
            <div>
                <p class="card__date">${post.date}</p>
                <h3 class="card__title">${post.title}</h3>
                <p class="card__prev">${post.prev}</p>
            </div>
        `;
    resultsContainer.appendChild(link);
  });
}
const sortedData = [...data].sort((a, b) => parseDate(a.date) - parseDate(b.date));
renderResults(sortedData);
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const filtered = sortedData.filter((post) => {
    const text = getTextContent(post).toLowerCase();
    return text.includes(query);
  });
  renderResults(filtered);
});
