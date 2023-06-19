import axios from "axios";

const deleteProject = async (projectId, token) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/projects/${projectId}/empty`,
      {
        headers: {
          "X-Api-Token": token,
          accept: "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("An error occurred while deleting the project");
  }
};

export default deleteProject;
