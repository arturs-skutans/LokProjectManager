import { useState, useEffect } from "react";
import "./App.css";
import { Flex, Loading, Button } from "@lokalise/louis";
import fetchProjects from "./services/fetchProjects";
import GetProjectsForm from "./components/GetProjectsForm";
import ProjectsTable from "./components/ProjectsTable";

// import { projects } from "./test.json";

function App() {
  const [loading, setLoading] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [projects, setProjects] = useState(null);
  const [token, setToken] = useState("");

  const handleFetchProjects = async () => {
    setLoading(true);
    const response = await fetchProjects(token);
    setProjects(response.projects);
    setLoading(false);
    setLoaded(true);
  };

  const resetToken = () => {
    localStorage.removeItem("token");
    setLoaded(false);
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <Flex>
      {!loaded && (
        <GetProjectsForm
          token={token}
          setToken={setToken}
          fetchProjects={handleFetchProjects}
          setLoading={setLoading}
        />
      )}
      {loaded && <Button onClick={resetToken}>Set new token</Button>}
      {loading && <Loading />}
      <Flex>
        {projects && <ProjectsTable projects={projects} token={token} />}
      </Flex>
    </Flex>
  );
}

export default App;
