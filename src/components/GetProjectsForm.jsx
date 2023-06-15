import "../App.css";
import { Flex, Input, Label, Button } from "@lokalise/louis";
// import { projects } from "./test.json";

function GetProjectsForm(props) {
  const { token, setToken, fetchProjects } = props;
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
            onChange={(e) => setToken(e.target.value)}
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
