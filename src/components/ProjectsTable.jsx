import { useState } from "react";
import "../App.css";
import {
  Flex,
  Label,
  Table,
  TableBody,
  TableRow,
  TableHeaderCell,
  TableHeader,
  Spacer,
  Select,
  Button,
  Input,
  Checkbox,
} from "@lokalise/louis";
import ProjectItem from "./ProjectItem";
import emptyProject from "../services/emptyProject";
import deleteProject from "../services/deleteProject";
import fetchProjects from "../services/fetchProjects";

function ProjectsTable(props) {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState();
  const [searchInput, setSearchInput] = useState("");

  const optionsArray = [
    { value: "delete", label: "Delete" },
    { value: "empty", label: "Empty" },
  ];

  const { projects, token } = props;
  const tokenString = String(token);

  const handleSelected = (item) => {
    if (selected.includes(item)) {
      // Remove the item from the array
      const updatedSelected = selected.filter(
        (selectedItem) => selectedItem !== item
      );
      setSelected(updatedSelected);
    } else {
      // Append the item to the array
      setSelected([...selected, item]);
    }
  };

  const handleAction = async () => {
    if (action.value === "delete") {
      await deleteSelectedProjects();
    } else if (action.value === "empty") {
      await emptySelectedProjects();
    } else {
      return null;
    }
    await fetchProjects();
  };

  const deleteSelectedProjects = async (tokenString) => {
    try {
      const deletePromises = selected.map((item) => deleteProject(item, token));
      await Promise.all(deletePromises);
      console.log("All projects have been deleted successfully.");
    } catch (error) {
      console.error("An error occurred while deleting projects:", error);
    }
  };

  const emptySelectedProjects = async (tokenString) => {
    try {
      const emptyPromises = selected.map((item) => emptyProject(item, token));
      await Promise.all(emptyPromises);
      console.log("All projects have been emptied successfully.");
    } catch (error) {
      console.error("An error occurred while emptying projects:", error);
    }
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="left">
            <Flex
              direction="row"
              gap="5"
              justify="space-between"
              align="center"
            >
              <Flex as="div" direction="column" gap="3">
                <Flex as="div">
                  <Label className="h1">Projects ({projects.length})</Label>
                </Flex>
                <Flex as="div" direction="row" gap="3" align="center">
                  <div>
                    <Label className="h2">Selected ({selected.length})</Label>
                  </div>
                </Flex>
                <Flex as="div" direction="row">
                  <div>
                    <Select
                      options={optionsArray}
                      value={action}
                      onChange={setAction}
                    />
                  </div>
                  {action && (
                    <div>
                      <Button onClick={handleAction}>
                        {action.label} selected projects
                      </Button>
                    </div>
                  )}
                </Flex>
              </Flex>
              <Flex as="div">
                <Input
                  placeholder="Search"
                  value={searchInput}
                  onChange={(event) => setSearchInput(event.target.value)}
                />
              </Flex>
            </Flex>
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects &&
          projects
            .filter((project) => {
              const projectIdMatch = project.project_id.includes(searchInput);
              const projectNameMatch = project.name.includes(searchInput);
              return projectIdMatch || projectNameMatch;
            })
            .map((project) => (
              <ProjectItem
                key={project.project_id}
                project={project}
                handleSelected={handleSelected}
              />
            ))}
        {projects.length <= 0 && (
          <Spacer horizontal={10} vertical={5}>
            <Label className="h2">There are no projects yet</Label>
          </Spacer>
        )}
      </TableBody>
    </Table>
  );
}

export default ProjectsTable;
