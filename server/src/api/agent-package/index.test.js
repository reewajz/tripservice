import request, { agent } from "supertest";
import { masterKey, apiRoot } from "../../config";
import express from "../../services/express";
import routes, { AgentPackage } from ".";

const app = () => express(apiRoot, routes);
let agentPackage;
beforeEach(async () => {
  agentPackage = await AgentPackage.create({
    org_id: "testorgb",
    packages: [
      {
        region: "Kathmandu",
        itinerary: [
          {
            day: 2,
            mode: "drive",
            from: "drive",
            to: "test",
            duration_hrs: "24"
          }
        ],
        departures: [
          {
            price: 150,
            availability: "yes",
            start_date: "2020-01-01",
            end_date: "2020-01-10"
          }
        ],
        destination: 
          {
            dest_id: "testdestb",
            seasons: ["testb1", "testb2"],
            accomodation: "hotel",
            group_size: 5,
            starting_point: "start point",
            end_point: "end point",
            difficulty_level: "Medium",
            altitude: 1900,
            created_by: "5e14a10d0e97f01b0faa9f77",
            modified_by: "5e14a10d0e97f01b0faa9f77"
          },
        best_sellers: true,
        description: "test",
        currency: "NRs",
        price: 1500,
        review_number: 1200,
        review_url: "test",
        image_url: "test"
      }
    ]
  });
});


test("POST /agent 201 (master)", async () => {
  const { status, body } = await request(app())
    .post(`${apiRoot}`)
    .send({
      access_token: masterKey,
      org_id: "testorg1",
      packages: [
        {
          region: "Kathmandu",
          itinerary: [
            {
              day: 2,
              mode: "drive",
              from: "drive",
              to: "test",
              duration_hrs: "24"
            }
          ],
          departures: [
            {
              price: 150,
              availability: "yes",
              start_date: "2020-01-01",
              end_date: "2020-01-10"
            }
          ],
          destination: {
              dest_id: "testdest1",
              seasons: ["test1", "test2"],
              accomodation: "hotel",
              group_size: 5,
              starting_point: "start point",
              end_point: "end point",
              difficulty_level: "Medium",
              altitude: 1900,
              created_by: "5e14a10d0e97f01b0faa9f77",
              modified_by: "5e14a10d0e97f01b0faa9f77"
            },
          best_sellers: true,
          description: "test",
          currency: "NRs",
          price: 1500,
          review_number: 1200,
          review_url: "test",
          image_url: "test"
        }
      ]
    });
  expect(status).toBe(201);
  expect(typeof body).toEqual("object");
  expect(body.org_id).toEqual("testorg1");
  expect(body.packages[0].region).toEqual("Kathmandu");
  expect(body.packages[0].itinerary).toEqual([
    {
      day: 2,
      mode: "drive",
      from: "drive",
      to: "test",
      duration_hrs: 24
    }
  ]);
  expect(body.packages[0].destination.dest_id).toEqual("testdest1");
  expect(body.packages[0].destination.seasons).toEqual(["test1", "test2"]);
  expect(body.packages[0].destination.accomodation).toEqual("hotel");
  expect(body.packages[0].destination.group_size).toEqual(5);
  expect(body.packages[0].destination.starting_point).toEqual("start point");
  expect(body.packages[0].destination.end_point).toEqual("end point");
  expect(body.packages[0].destination.difficulty_level).toEqual("Medium");
  expect(body.packages[0].destination.altitude).toEqual(1900);
  expect(body.packages[0].departures[0].price).toEqual(150);
  expect(body.packages[0].departures[0].availability).toEqual("yes");
  expect(body.packages[0].best_sellers).toEqual(true);
  expect(body.packages[0].description).toEqual("test");
  expect(body.packages[0].currency).toEqual("NRs");
  expect(body.packages[0].price).toEqual(1500);
  expect(body.packages[0].review_number).toEqual(1200);
  expect(body.packages[0].review_url).toEqual("test");
  expect(body.packages[0].image_url).toEqual("test");
});

test("POST /agent 401", async () => {
  const { status } = await request(app()).post(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /agent 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(Array.isArray(body.rows)).toBe(true);
  expect(Number.isNaN(body.count)).toBe(false);
});

test("GET /agent 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}`);
  expect(status).toBe(401);
});

test("GET /agent/:id 200 (master)", async () => {
  const { status, body } = await request(app())
    .get(`${apiRoot}/${agentPackage.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(200);
  expect(typeof body).toEqual("object");
  expect(body.id).toEqual(agentPackage.id);
});

test("GET /agent/:id 401", async () => {
  const { status } = await request(app()).get(`${apiRoot}/${agentPackage.id}`);
  expect(status).toBe(401);
});

test("GET /agent/:id 404 (master)", async () => {
  const { status } = await request(app())
    .get(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});

test("DELETE /agent/:id 204 (master)", async () => {
  const { status } = await request(app())
    .delete(`${apiRoot}/${agentPackage.id}`)
    .query({ access_token: masterKey });
  expect(status).toBe(204);
});

test("DELETE /agent/:id 401", async () => {
  const { status } = await request(app()).delete(
    `${apiRoot}/${agentPackage.id}`
  );
  expect(status).toBe(401);
});

test("DELETE /agent/:id 404 (master)", async () => {
  const { status } = await request(app())
    .delete(apiRoot + "/123456789098765432123456")
    .query({ access_token: masterKey });
  expect(status).toBe(404);
});

