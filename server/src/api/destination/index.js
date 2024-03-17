import { Router } from 'express'
import { middleware as query } from 'querymen'
import { middleware as body } from 'bodymen'
import { master } from '../../services/passport'
import { create, index, show, update, destroy } from './controller'
import { schema } from './model'
export Destination, { schema } from './model'

const router = new Router()
const { dest_id, seasons, accomodation, group_size, starting_point, end_point, difficulty_level, altitude } = schema.tree

/**
 * @api {post} /destinations Create destination
 * @apiName CreateDestination
 * @apiGroup Destination
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dest_id Destination's dest_id.
 * @apiParam seasons Destination's seasons.
 * @apiParam accomodation Destination's accomodation.
 * @apiParam group_size Destination's group_size.
 * @apiParam starting_point Destination's starting_point.
 * @apiParam end_point Destination's end_point.
 * @apiParam difficulty_level Destination's difficulty_level.
 * @apiParam altitude Destination's altitude.
 * @apiSuccess {Object} destination Destination's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destination not found.
 * @apiError 401 master access only.
 */
router.post('/',
  master(),
  body({ dest_id, seasons, accomodation, group_size, starting_point, end_point, difficulty_level, altitude }),
  create)

/**
 * @api {get} /destinations Retrieve destinations
 * @apiName RetrieveDestinations
 * @apiGroup Destination
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiUse listParams
 * @apiSuccess {Number} count Total amount of destinations.
 * @apiSuccess {Object[]} rows List of destinations.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 401 master access only.
 */
router.get('/',
  master(),
  query(),
  index)

/**
 * @api {get} /destinations/:id Retrieve destination
 * @apiName RetrieveDestination
 * @apiGroup Destination
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess {Object} destination Destination's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destination not found.
 * @apiError 401 master access only.
 */
router.get('/:id',
  master(),
  show)

/**
 * @api {put} /destinations/:id Update destination
 * @apiName UpdateDestination
 * @apiGroup Destination
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiParam dest_id Destination's dest_id.
 * @apiParam seasons Destination's seasons.
 * @apiParam accomodation Destination's accomodation.
 * @apiParam group_size Destination's group_size.
 * @apiParam starting_point Destination's starting_point.
 * @apiParam end_point Destination's end_point.
 * @apiParam difficulty_level Destination's difficulty_level.
 * @apiParam altitude Destination's altitude.
 * @apiSuccess {Object} destination Destination's data.
 * @apiError {Object} 400 Some parameters may contain invalid values.
 * @apiError 404 Destination not found.
 * @apiError 401 master access only.
 */
router.put('/:id',
  master(),
  body({ dest_id, seasons, accomodation, group_size, starting_point, end_point, difficulty_level, altitude }),
  update)

/**
 * @api {delete} /destinations/:id Delete destination
 * @apiName DeleteDestination
 * @apiGroup Destination
 * @apiPermission master
 * @apiParam {String} access_token master access token.
 * @apiSuccess (Success 204) 204 No Content.
 * @apiError 404 Destination not found.
 * @apiError 401 master access only.
 */
router.delete('/:id',
  master(),
  destroy)

export default router
