import { users, posts } from "./Data/index.js";

users.forEach(async (element) => {
  const {
    firstName,
    lastName,
    email,
    password,
    picturePath,
    friends,
    location,
    occupation,
  } = element;

  try {
    const response = await fetch("http://localhost:3001/posts/post/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", // Set the appropriate header
      },
      body: JSON.stringify({ // Convert the body to a JSON string
        firstName,
        lastName,
        email,
        password,
        picturePath,
        friends,
        location,
        occupation,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to register user: ${firstName} ${lastName}`);
    }

    const data = await response.json();
    console.log(`Successfully registered user: ${data.firstName} ${data.lastName}`);
  } catch (error) {
    console.error(error);
  }
});
