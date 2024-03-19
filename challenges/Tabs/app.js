document.querySelector(".about").addEventListener("click", (e) => {
  if (e.target.dataset.id) {
    // remove active from other btns
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });
    // hide other articles
    document
      .querySelectorAll(".content")
      .forEach((article) => article.classList.remove("active"));
    document.getElementById(id).classList.add("active");
  }
});
