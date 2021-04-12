// Imports the Google Cloud client library
const { Datastore } = require('@google-cloud/datastore');

// Creates a client
const datastore = new Datastore({
   projectId: 'solar-nation-310516',
   keyFilename: 'solar-nation-310516-9dfd55b6467a.json'
});

const kindName = 'user-log';
exports.savelog = (req, res) => {
   let uid = req.query.uid || req.body.uid || 0;
   let log = req.query.log || req.body.log || '';
   datastore
      .save(
         {
            key: datastore.key(kindName),
            data: {
               log: log,
               uid: datastore.int(uid),
               time_create: datastore.int(Math.floor(new Date().getTime() / 1000))
            }
         }
      )
      .catch(
         err => {
            console.error('ERROR:', err);
            return res.status(500).send(err);
         }
      );
   return res.status(200).send(log);
};