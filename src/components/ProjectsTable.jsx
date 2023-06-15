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

function ProjectsTable(props) {
  const [selected, setSelected] = useState([]);
  const [action, setAction] = useState();

  const optionsArray = [
    { value: "delete", label: "Delete" },
    { value: "empty", label: "Empty" },
  ];

  const { projects } = props;

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

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeaderCell align="left">
            <Flex direction="column" gap="5">
              <div>
                <Label className="h1">Projects</Label>
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
                  <Button>Confirm</Button>
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
