import { useState } from "react";
import "../App.css";
import {
  Flex,
  Label,
  TableRow,
  TableCell,
  Checkbox,
  Tag,
  Spacer,
} from "@lokalise/louis";

function ProjectItem(props) {
  const project = props.project;
  const [checked, setChecked] = useState(false);

  const handleChecked = (event, value) => {
    setChecked(!checked);
    props.handleSelected(project.project_id);
  };
  return (
    <TableRow
      key={project.project_id}
      style={{ display: "flex" }}
      className={checked ? "selected-item" : ""}
    >
      <TableCell align="left" width="auto">
        <Flex
          direction="row"
          justify="space-between"
          style={{
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <div>
            <Checkbox onChange={(e) => handleChecked(project.project_id)}>
              <Spacer left="2">
                <Flex direction="row" align="center" gap="2">
                  <div>
                    <Label className="h2">{project.name}</Label>
                  </div>
                  <div>
                    <Tag>{project.base_language_iso}</Tag>
                  </div>
                </Flex>
                <Label className="caption">{project.project_id}</Label>
              </Spacer>
            </Checkbox>
          </div>
          <div>
            <Flex align="flex-end" direction="column">
              <div>
                <Label className="h3 bold">
                  Total keys: {project.statistics.keys_total}
                </Label>
              </div>
              <div>
                <Label className="caption">
                  Base words: {project.statistics.base_words}
                </Label>
              </div>
            </Flex>
          </div>
        </Flex>
      </TableCell>
    </TableRow>
  );
}

export default ProjectItem;
