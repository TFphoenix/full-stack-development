"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.getLogs = exports.savelog = void 0;
// Imports the Google Cloud client library
var Datastore = require("@google-cloud/datastore").Datastore;
// Creates a client
var datastore = new Datastore({
    projectId: "solar-nation-310516",
    keyFilename: "solar-nation-310516-9dfd55b6467a.json"
});
var kindName = "user-log";
function savelog(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var uid, log;
        return __generator(this, function (_a) {
            uid = req.query.uid || req.body.uid || 0;
            log = req.query.log || req.body.log || "";
            datastore
                .save({
                key: datastore.key(kindName),
                data: {
                    log: log,
                    uid: datastore.int(uid),
                    createdAt: new Date()
                }
            })["catch"](function (err) {
                console.error("ERROR:", err);
                res.status(500).send(err);
                return;
            });
            res.status(200).send(log);
            return [2 /*return*/];
        });
    });
}
exports.savelog = savelog;
function getLogs(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var query, logs;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    setCors(res);
                    query = datastore.createQuery(kindName);
                    logs = [];
                    return [4 /*yield*/, datastore
                            .runQuery(query)
                            .then(function (results) {
                            console.log("results:", results);
                            console.log("results[0]:", results[0]);
                            logs = results[0];
                        })["catch"](function (err) {
                            console.error("ERROR:", err);
                            res.status(500).send(err);
                            return;
                        })];
                case 1:
                    _a.sent();
                    console.log("logs:", logs);
                    res.status(200).json(logs);
                    return [2 /*return*/];
            }
        });
    });
}
exports.getLogs = getLogs;
function setCors(res) {
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "*");
    res.set("Access-Control-Allow-Headers", "*");
}
