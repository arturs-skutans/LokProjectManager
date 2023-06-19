const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
const port = 3000; // You can use a different port if needed

app.use(express.json());
app.use(cors());

app.get("/projects", async (req, res) => {
  const options = {
    headers: {
      "X-Api-Token": req.header("X-Api-Token"),
      accept: "application/json",
    },
  };
  try {
    const response = await axios.get(
      "https://api.lokalise.com/api2/projects",
      options
    );
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching projects." });
  }
});

app.put("/projects/:projectId/empty", async (req, res) => {
  const { projectId } = req.params;

  try {
    const options = {
      headers: {
        "X-Api-Token": req.header("X-Api-Token"),
        accept: "application/json",
      },
    };

    const response = await axios.put(
      `https://api.lokalise.com/api2/projects/${projectId}/empty`,
      null,
      options
    );

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while emptying the project server.cjs",
    });
  }
});

app.delete("/projects/:projectId/empty", async (req, res) => {
  const { projectId } = req.params;

  try {
    const options = {
      headers: {
        "X-Api-Token": req.header("X-Api-Token"),
        accept: "application/json",
      },
    };

    const response = await axios.delete(
      `https://api.lokalise.com/api2/projects/${projectId}`,
      options
    );

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "PUT");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "An error occurred while emptying the project server.cjs",
    });
  }
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
