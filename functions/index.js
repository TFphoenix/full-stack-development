// Imports the Google Cloud client library
var Datastore = require('@google-cloud/datastore').Datastore;
// Creates a client
var datastore = new Datastore({
    projectId: 'solar-nation-310516',
    keyFilename: 'solar-nation-310516-9dfd55b6467a.json'
});
var kindName = 'user-log';
exports.savelog = function (req, res) {
    var uid = req.query.uid || req.body.uid || 0;
    var log = req.query.log || req.body.log || '';
    datastore
        .save({
        key: datastore.key(kindName),
        data: {
            log: log,
            uid: datastore.int(uid),
            time_create: datastore.int(Math.floor(new Date().getTime() / 1000))
        }
    })["catch"](function (err) {
        console.error('ERROR:', err);
        res.status(200).send(err);
        return;
    });
    res.status(200).send(log);
};
