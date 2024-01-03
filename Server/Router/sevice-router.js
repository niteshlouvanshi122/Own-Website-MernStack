const Express = require ("express");
const router = Express.Router();
const Services = require("../Controllers/service-controller")

router.route("/service").get(Services);

module.exports = router;