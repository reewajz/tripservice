import { Router } from "express";
import { middleware as query } from "querymen";
import { middleware as body } from "bodymen";
import { master } from "../../services/passport";
import {
  create,
  index,
  show,
  update,
  destroy,
  deleteItinerary,
  postItinerary,
  deleteDepartures,
  postDepartures,
  createPackage,
  deletePackage
} from "./controller";
import { schema } from "./model";
import { AgentPackage } from ".";

export AgentPackage, { schema } from "./model";

const router = new Router();
// const { dest_id, seasons, accomodation, group_size, starting_point, end_point, difficulty_level, altitude } = schema.tree
const { org_id, packages } = schema.tree;

/**
 * @api {post} /agent Create agent package
 * @apiName CreateAgentPackage
 * @apiGroup AgentPackage
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dest_id AgentPackage's dest_id.
 * @apiParam seasons AgentPackage's seasons.
 * @apiParam accomodation AgentPackage's accomodation.
 * @apiParam group_size AgentPackage's group_size.
 * @apiParam starting_point AgentPackage's starting_point.
 * @apiParam end_point AgentPackage's end_point.
 * @apiParam difficulty_level AgentPackage's difficulty_level.
 * @apiParam altitude AgentPackage's altitude.
 * @apiSuccess {Object} agent package AgentPackage's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 AgentPackage not found.
 * @apiError 401 master access only.
 */
router.post("/", master(), body({ org_id, packages }), create);
router.post("/:id/packages/:pid/departures", master(), postDepartures);
router.post("/:id/packages/", master(), createPackage);

/**
 * @api {get} /agent Retrieve agent-package
 * @api {get}/agent/?region=region_name Retrieve agent according to region
 * @apiName RetrieveAgentPackage
 * @apiGroup AgentPackage
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of agent-package.
 * @apiSuccess {Object[]} rows List of agent-package.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get(
  "/",
  master(),
  query({
    region: {
      type: String,
      paths: ["packages.region"]
    }
  }),
  index
);

/**
 * @api {get} /agent/:id Retrieve agent package
 * @apiName RetrieveAgentPackage
 * @apiGroup AgentPackage
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} agent package AgentPackage's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 AgentPackage not found.
 * @apiError 401 master access only.
 */
router.get(
  "/:id",
  master(),
  query({
    bestseller: {
      type: Boolean,
      paths: ["packages.best_sellers"]
    }
  }),
  show
);

/**
 * @api {put} /agent/:id Update agent package
 * @apiName UpdateAgentPackage
 * @apiGroup AgentPackage
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dest_id AgentPackage's dest_id.
 * @apiParam seasons AgentPackage's seasons.
 * @apiParam accomodation AgentPackage's accomodation.
 * @apiParam group_size AgentPackage's group_size.
 * @apiParam starting_point AgentPackage's starting_point.
 * @apiParam end_point AgentPackage's end_point.
 * @apiParam difficulty_level AgentPackage's difficulty_level.
 * @apiParam altitude AgentPackage's altitude.
 * @apiSuccess {Object} agent package AgentPackage's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 AgentPackage not found.
 * @apiError 401 master access only.
 */
router.put("/:id", master(), update);
router.put("/:id/packages/:pid", master(), update);
//itinerary
router.put("/:id/packages/:pid/itinerary/:iteid", master(), update);
router.delete("/:id/packages/:pid/itinerary/:iteid", master(), deleteItinerary);
router.post("/:id/packages/:pid/itinerary", master(), postItinerary);
//destination
router.put("/:id/packages/:pid/destination/:did", master(), update);
//departures
router.put("/:id/packages/:pid/departures/:depid", master(), update);
router.delete(
  "/:id/packages/:pid/departures/:depid",
  master(),
  deleteDepartures
);

/**
 * @api {delete} /agent/:id Delete agent package
 * @apiName DeleteAgentPackage
 * @apiGroup AgentPackage
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 AgentPackage not found.
 * @apiError 401 master access only.
 */
router.delete("/:id", master(), destroy);
router.delete("/:id/package/:pid", master(), deletePackage);


export default router;
