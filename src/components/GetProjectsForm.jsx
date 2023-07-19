import "../App.css";
import { Flex, Input, Label, Button } from "@lokalise/louis";
// import { projects } from "./test.json";

function GetProjectsForm(props) {
  const { token, setToken, fetchProjects } = props;

  const handleTokenChange = (e) => {
    const newToken = e.target.value;
    setToken(newToken);
    localStorage.setItem("token", newToken); // Save token to localStorage
  };

  return (
    <Flex
      direction="column"
      grow
      style={{
        paddingBottom: 50,
      }}
      gap="2"
      inline
      align="left"
    >
      <div style={{ textAlign: "start" }}>
        <Label
          underline
          text="Lokalise API Key"
          style={{ backgroundColor: "green" }}
          className="h1"
        />
      </div>
      <Flex direction="row" gap="5">
        <div>
          <Input
            placeholder="API token"
            value={token}
            onChange={handleTokenChange}
          />
        </div>
        <div>
          <Button variant="primary" onClick={fetchProjects}>
            Get projects
          </Button>
        </div>
      </Flex>
    </Flex>
  );
}

export default GetProjectsForm;
