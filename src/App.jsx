import { useState } from "react";
import "./App.css";
import { Flex } from "@lokalise/louis";
import fetchProjects from "./services/fetchProjects";
import GetProjectsForm from "./components/GetProjectsForm";
import ProjectsTable from "./components/ProjectsTable";
// import { projects } from "./test.json";

function App() {
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState(null);
  const [token, setToken] = useState("");

  const handleFetchProjects = async () => {
    const response = await fetchProjects(token);
    console.log(response.projects);
    setProjects(response.projects);
  };

  return (
    <Flex justify="flex-center">
      <GetProjectsForm
        token={token}
        setToken={setToken}
        fetchProjects={handleFetchProjects}
      />
      <Flex align="flex-start">
        {projects && <ProjectsTable projects={projects} />}
      </Flex>
    </Flex>
  );
}

export default App;
