(function () {
  const USERS_API_URL = "https://dummyjson.com/users";
  const CONTAINER_CLASS = "user-list-container";

  function init() {
    createHeading();
    fetchAndRenderUsers();
  }

  function createHeading() {
    const heading = document.createElement("h1");
    heading.innerText = "Users";
    heading.setAttribute(
      "style",
      `
      text-align: center;
      margin: 40px 0;
      font-size: 24px;
      color: #333;
      font-family: Arial, sans-serif;
    `
    );
    document.body.appendChild(heading);
  }

  async function fetchAndRenderUsers() {
    try {
      const res = await fetch(USERS_API_URL);
      const data = await res.json();
      const users = data.users;

      const container = document.createElement("div");
      container.className = CONTAINER_CLASS;
      container.setAttribute(
        "style",
        `
        width: 100%;
        max-width: 600px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
      `
      );

      users.forEach((user) => {
        const card = createUserCard(user);
        container.appendChild(card);
      });

      document.body.appendChild(container);
    } catch (err) {
      showError("Failed to load users. Please try again later.");
    }
  }

  function createUserCard(user) {
    const card = document.createElement("div");
    card.setAttribute(
      "style",
      `
      padding: 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      background-color: #f9f9f9;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    `
    );

    const imageNameContainer = document.createElement("div");
    imageNameContainer.setAttribute(
      "style",
      `
      display: flex;
      align-items: center;
      gap: 10px;
    `
    );

    const image = document.createElement("img");
    image.src = user.image;
    image.setAttribute(
      "style",
      `
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    `
    );

    const details = document.createElement("div");
    details.setAttribute(
      "style",
      `
      display: flex;
      flex-direction: column;
      gap: 2px;
    `
    );

    const name = document.createElement("span");
    name.innerText = `${user.firstName} ${user.lastName}`;
    name.style.fontSize = "18px";

    const email = document.createElement("span");
    email.innerText = user.email;
    email.setAttribute(
      "style",
      `
      color: lightslategray;
      font-size: 14px;
    `
    );

    details.appendChild(name);
    details.appendChild(email);
    imageNameContainer.appendChild(image);
    imageNameContainer.appendChild(details);

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "Delete";
    deleteBtn.setAttribute(
      "style",
      `
      background-color: #e62c2c;
      color: white;
      border: none;
      padding: 8px 12px;
      cursor: pointer;
      border-radius: 6px;
    `
    );
    deleteBtn.addEventListener("click", () => card.remove());

    card.appendChild(imageNameContainer);
    card.appendChild(deleteBtn);

    return card;
  }

  function showError(message) {
    const error = document.createElement("p");
    error.innerText = message;
    error.setAttribute(
      "style",
      `
      color: red;
      text-align: center;
      margin-top: 20px;
      font-family: Arial, sans-serif;
    `
    );
    document.body.appendChild(error);
  }

  if (document.readyState !== "loading") {
    init();
  } else {
    document.addEventListener("DOMContentLoaded", init);
  }
})();
