import { success, notFound } from '../../services/response/'
import { Destination } from '.'

export const create = ({ bodymen: { body } }, res, next) =>
  Destination.create(body)
    .then((destination) => destination.view(true))
    .then(success(res, 201))
    .catch(next)

export const index = ({ querymen: { query, select, cursor } }, res, next) =>{
  console.log(select,"selrct");
  Destination.count(query)
  .then(count => Destination.find(query, select, cursor)
    .then((destinations) => ({
      count,
      rows: destinations.map((destination) => destination.view())
    }))
  )
  .then(success(res))
  .catch(next)
}


export const show = ({ params }, res, next) =>
  Destination.findById(params.id)
    .then(notFound(res))
    .then((destination) => destination ? destination.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Destination.findById(params.id)
    .then(notFound(res))
    .then((destination) => destination ? Object.assign(destination, body).save() : null)
    .then((destination) => destination ? destination.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Destination.findById(params.id)
    .then(notFound(res))
    .then((destination) => destination ? destination.remove() : null)
    .then(success(res, 204))
    .catch(next)
