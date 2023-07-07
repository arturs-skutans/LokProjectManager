import { useState, useEffect } from "react";
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

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      handleFetchProjects();
    }
  }, [token]);

  return (
    <Flex>
      <GetProjectsForm
        token={token}
        setToken={setToken}
        fetchProjects={handleFetchProjects}
      />
      <Flex>
        {projects && <ProjectsTable projects={projects} token={token} />}
      </Flex>
    </Flex>
  );
}

export default App;
