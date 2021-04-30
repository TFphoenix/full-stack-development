// Imports the Google Cloud client library
const { Datastore } = require("@google-cloud/datastore");

// Creates a client
const datastore = new Datastore({
  projectId: "solar-nation-310516",
  keyFilename: "solar-nation-310516-9dfd55b6467a.json",
});

const kindName = "user-log";

export async function savelog(req, res) {
  let uid = req.query.uid || req.body.uid || 0;
  let log = req.query.log || req.body.log || "";
  datastore
    .save({
      key: datastore.key(kindName),
      data: {
        log: log,
        uid: datastore.int(uid),
        createdAt: new Date(),
      },
    })
    .catch((err) => {
      console.error("ERROR:", err);
      res.status(500).send(err);
      return;
    });
  res.status(200).send(log);
}

export async function getLogs(req, res) {
  setCors(res);
  const query = datastore.createQuery(kindName);
  let logs: [] = [];
  await datastore
    .runQuery(query)
    .then((results) => {
      console.log("results:", results);
      console.log("results[0]:", results[0]);
      logs = results[0];
    })
    .catch((err) => {
      console.error("ERROR:", err);
      res.status(500).send(err);
      return;
    });
  console.log("logs:", logs);
  res.status(200).json(logs);
}

const cors = require("cors")({ origin: true });

export async function helloWorld(req: any, res: any) {
  cors(req, res, async () => {
    const query = datastore.createQuery("user");

    let [users] = await datastore.runQuery(query);

    for (const user of users) {
      const userKey = user[datastore.KEY];
      console.log(userKey.id, user);
    }

    res.send(users);
  });
}

function setCors(res) {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "*");
  res.set("Access-Control-Allow-Headers", "*");
}
