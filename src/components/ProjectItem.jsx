import { useState } from "react";
import "../App.css";
import {
  Flex,
  Label,
  IconButton,
  TableRow,
  TableCell,
  Checkbox,
  Tag,
  Spacer,
} from "@lokalise/louis";
import {
  FileIcon,
  SourceCodeIcon,
  CustomUpIcon,
  CustomDownIcon,
} from "@lokalise/louis";

function ProjectItem(props) {
  const project = props.project;
  const [checked, setChecked] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleChecked = (event, value) => {
    setChecked(!checked);
    props.handleSelected(project.project_id);
  };

  const handleExpanded = () => {
    setExpanded(!expanded);
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
                  <Flex as="div" align="center">
                    {project.project_type === "localization_files" ? (
                      <SourceCodeIcon size="20px" />
                    ) : (
                      <FileIcon size="20px" />
                    )}
                  </Flex>
                  <Flex as="div">
                    <Label className="h2">{project.name}</Label>
                  </Flex>
                  <div>
                    <Tag>{project.base_language_iso}</Tag>
                  </div>
                </Flex>
                <Label className="caption">{project.project_id}</Label>
              </Spacer>
            </Checkbox>
          </div>
          <Flex as="div" gap="2">
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
            <IconButton onClick={handleExpanded}>
              {expanded ? (
                <CustomUpIcon size="20px" />
              ) : (
                <CustomDownIcon size="20px" />
              )}
            </IconButton>
          </Flex>
        </Flex>
        {expanded && (
          <Spacer horizontal={5} vertical={1}>
            <Flex
              direction="column"
              gap="1"
              style={{
                padding: 10,
              }}
            >
              <div>
                <Label>{project.description}</Label>
              </div>
              <Flex as="div" direction="row" gap="2">
                <div>
                  <Label className="caption">
                    Created by {project.created_by_email}
                  </Label>
                </div>
                <div>
                  <Label className="caption">at {project.created_at}</Label>
                </div>
              </Flex>
              <Flex as="div" direction="row" gap="1">
                <div>
                  <Label className="h3">Total progress:</Label>
                </div>
                <div>
                  <Label className="h3 bold">
                    {project.statistics.progress_total}%
                  </Label>
                </div>
              </Flex>
              <Flex as="div" direction="row" gap="2" align="center">
                <div>
                  <Label>Languages: </Label>
                </div>
                {project.statistics.languages.map((item) => (
                  <div>
                    <Tag>
                      {item.language_iso} – {item.progress}%
                    </Tag>
                  </div>
                ))}
              </Flex>
            </Flex>
          </Spacer>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ProjectItem;
