import request from 'supertest'
import { masterKey, apiRoot } from '../../config'
import express from '../../services/express'
import routes, { Destination } from '.'

const app = () => express(apiRoot, routes)

let destination

beforeEach(async () => {
  destination = await Destination.create({})
})

test('POST /destinations 201 (master)', async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({ access_token: masterKey, dest_id: 'test', seasons: 'test', accomodation: 'test', group_size: 'test', starting_point: 'test', end_point: 'test', difficulty_level: 'test', altitude: 'test' })
  expect(status).toBe(201)
  expect(typeof body).toEqual('object')
  expect(body.dest_id).toEqual('test')
  expect(body.seasons).toEqual('test')
  expect(body.accomodation).toEqual('test')
  expect(body.group_size).toEqual('test')
  expect(body.starting_point).toEqual('test')
  expect(body.end_point).toEqual('test')
  expect(body.difficulty_level).toEqual('test')
  expect(body.altitude).toEqual('test')
})

test('POST /destinations 401', async () => {
  const { status } = await request(app())
    .post(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /destinations 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(Array.isArray(body.rows)).toBe(true)
  expect(Number.isNaN(body.count)).toBe(false)
})

test('GET /destinations 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}`)
  expect(status).toBe(401)
})

test('GET /destinations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${destination.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(destination.id)
})

test('GET /destinations/:id 401', async () => {
  const { status } = await request(app())
    .get(`${apiRoot}/${destination.id}`)
  expect(status).toBe(401)
})

test('GET /destinations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .get(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})

test('PUT /destinations/:id 200 (master)', async () => {
  const { status, body } = await request(app())
    .put(`${apiRoot}/${destination.id}`)
    .send({ access_token: masterKey, dest_id: 'test', seasons: 'test', accomodation: 'test', group_size: 'test', starting_point: 'test', end_point: 'test', difficulty_level: 'test', altitude: 'test' })
  expect(status).toBe(200)
  expect(typeof body).toEqual('object')
  expect(body.id).toEqual(destination.id)
  expect(body.dest_id).toEqual('test')
  expect(body.seasons).toEqual('test')
  expect(body.accomodation).toEqual('test')
  expect(body.group_size).toEqual('test')
  expect(body.starting_point).toEqual('test')
  expect(body.end_point).toEqual('test')
  expect(body.difficulty_level).toEqual('test')
  expect(body.altitude).toEqual('test')
})

test('PUT /destinations/:id 401', async () => {
  const { status } = await request(app())
    .put(`${apiRoot}/${destination.id}`)
  expect(status).toBe(401)
})

test('PUT /destinations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .put(apiRoot + '/123456789098765432123456')
    .send({ access_token: masterKey, dest_id: 'test', seasons: 'test', accomodation: 'test', group_size: 'test', starting_point: 'test', end_point: 'test', difficulty_level: 'test', altitude: 'test' })
  expect(status).toBe(404)
})

test('DELETE /destinations/:id 204 (master)', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${destination.id}`)
    .query({ access_token: masterKey })
  expect(status).toBe(204)
})

test('DELETE /destinations/:id 401', async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${destination.id}`)
  expect(status).toBe(401)
})

test('DELETE /destinations/:id 404 (master)', async () => {
  const { status } = await request(app())
    .delete(apiRoot + '/123456789098765432123456')
    .query({ access_token: masterKey })
  expect(status).toBe(404)
})
