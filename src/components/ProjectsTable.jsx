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
} from "@lokalise/louis";
import ProjectItem from "./ProjectItem";
import emptyProject from "../services/emptyProject";
import deleteProject from "../services/deleteProject";
import fetchProjects from "../services/fetchProjects";

function ProjectsTable(props) {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState();

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
            <Flex direction="column" gap="5">
              <div>
                <Label className="h1">Projects ({projects.length})</Label>
              </div>
              <Flex as="div" direction="row" gap="3">
                <Flex as="div">
                  <Label className="h2">Selected ({selected.length})</Label>
                </Flex>
                <Flex as="div">
                  <Select
                    options={optionsArray}
                    value={action}
                    onChange={setAction}
                  />
                </Flex>
                <Flex as="div">
                  {action && (
                    <Button onClick={handleAction}>
                      {action.label} selected projects
                    </Button>
                  )}
                </Flex>
              </Flex>
            </Flex>
          </TableHeaderCell>
        </TableRow>
      </TableHeader>
      <TableBody>
        {projects &&
          projects.map((project) => (
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
