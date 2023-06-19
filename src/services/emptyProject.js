import axios from "axios";

const emptyProject = async (projectId, token) => {
  try {
    const response = await axios.put(
      `http://localhost:3000/projects/${projectId}/empty`,
      null,
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
    throw new Error("An error occurred while emptying the project emptyPr.js");
  }
};

export default emptyProject;
