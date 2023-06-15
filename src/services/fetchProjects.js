import axios from "axios";

const fetchProjects = async (token) => {
  try {
    const response = await axios.get("http://localhost:3000/projects", {
      headers: {
        "X-Api-Token": token,
        accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while fetching projects.");
  }
};

export default fetchProjects;
