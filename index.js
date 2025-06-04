document.addEventListener("DOMContentLoaded", () => {
  createHeading();
  fetchAndRenderUsers();
});

function createHeading() {
  const heading = document.createElement("h1");
  heading.innerText = "Users";
  heading.style = `
    text-align: center;
    margin: 40px 0;
    font-size: 24px;
    color: #333;
    font-family: Arial, sans-serif;
  `;

  document.body.appendChild(heading);
}

async function fetchAndRenderUsers() {
  try {
    const response = await fetch("https://dummyjson.com/users")
      .then((res) => res.json())
      .catch((error) => {
        throw new Error(error);
      });
    const users = response.users;

    const usersList = document.createElement("div");
    usersList.style = `
      width: 100%;
      max-width: 600px;
      margin: auto;
      display: flex;
      flex-direction: column;
      gap: 8px;
    `;

    users.forEach((user) => {
      const userCard = createUserCard(user);
      usersList.appendChild(userCard);
    });

    document.body.appendChild(usersList);
  } catch (error) {
    showErrorMessage("Failed to load users. Please try again later.");
  }
}

function createUserCard(user) {
  const card = document.createElement("div");
  card.style = `
    padding: 16px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #f9f9f9;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  `;

  const imageNameContainer = document.createElement("div");
  imageNameContainer.style = `
    display: flex;
    align-items: center;
    gap: 10px;
  `;

  const image = document.createElement("img");
  image.src = user.image;
  image.style = `
    width: 50px;
    height: 50px;
    border-radius: 50%;
    object-fit: cover;
  `;

  const details = document.createElement("div");
  details.style = `
    display: flex;
    flex-direction: column;
    gap: 2px;
  `;

  const name = document.createElement("span");
  name.innerText = `${user.firstName} ${user.lastName}`;
  name.style.fontSize = "18px";

  const email = document.createElement("span");
  email.innerText = user.email;
  email.style = `
    color: lightslategray;
    font-size: 14px;
  `;

  details.appendChild(name);
  details.appendChild(email);
  imageNameContainer.appendChild(image);
  imageNameContainer.appendChild(details);

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.style = `
    background-color: #e62c2c;
    color: white;
    border: none;
    padding: 8px 12px;
    cursor: pointer;
    border-radius: 6px;
  `;
  deleteButton.addEventListener("click", () => card.remove());

  card.appendChild(imageNameContainer);
  card.appendChild(deleteButton);

  return card;
}

function showErrorMessage(message) {
  const errorMsg = document.createElement("p");
  errorMsg.innerText = message;
  errorMsg.style = `
    color: red;
    text-align: center;
    margin-top: 20px;
    font-family: Arial, sans-serif;
  `;
  document.body.appendChild(errorMsg);
}
