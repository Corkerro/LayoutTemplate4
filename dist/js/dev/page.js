import { d as data } from "./app.min.js";
const fileName = window.location.pathname.split("/").pop();
const pageData = data.find((post) => post.filename === fileName);
const filePath = "assets/img";
if (pageData) {
  const titleEl = document.querySelector("#title");
  const dateEl = document.querySelector("#date");
  const contentEl = document.querySelector("#content");
  const cover = document.querySelector("#cover");
  cover.src = `${filePath}/${pageData.cover}`;
  titleEl.textContent = pageData.title;
  dateEl.textContent = pageData.date;
  contentEl.innerHTML = pageData.content;
  const contentImages = contentEl.querySelectorAll("img");
  const baseName = fileName.replace(".html", "");
  contentImages.forEach((img, i) => {
    img.src = `${filePath}/${baseName}/${i + 1}.png`;
  });
}
