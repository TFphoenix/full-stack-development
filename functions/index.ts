const { Datastore } = require("@google-cloud/datastore");

const dataStore = new Datastore({
  projectId: "solar-nation-310516",
  keyFilename: "solar-nation-310516-9dfd55b6467a.json",
});

const cors = require("cors")({ origin: true });

export async function helloWorld(req: any, res: any) {
  cors(req, res, async () => {
    const query = dataStore.createQuery("user");

    let [users] = await dataStore.runQuery(query);

    for (const user of users) {
      const userKey = user[dataStore.KEY];
      console.log(userKey.id, user);
    }

    res.send(users);
  });
}
