import { AgentPackage } from ".";

let agentPackage;

beforeEach(async () => {
  agentPackage = await AgentPackage.create({
    "org_id":"modeltest",
    "packages":[{
      "region":"Kathmandu",
      "itinerary":[{
        "day":2,
        "mode":"hunger",
        "from":"testdest",
        "to":"testdest",
        "duration_hrs":"24"
      }],
      "depature":[{
        "price":150,
        "availability":"yes"
      }],
      "destination":[
        {
    "dest_id":"desttest",
    "seasons":["test1","test2"],
    "accomodation":"hotel",
    "group_size":5,
    "starting_point":"start point",
    "end_point":"end point",
    "difficulty_level":"Medium",
    "altitude":1900,
    "created_by":"5e14a10d0e97f01b0faa9f77",
    "modified_by":"5e14a10d0e97f01b0faa9f77"
    
  }],
      "best_sellers":true,
      "description":"test",
      "currency":"NRs",
      "price":1500,
      "review_number":1200,
      "review_url":"rev",
      "image_url":"img"
    }]
  });
});

describe("view", () => {
  it("returns simple view", () => {
    const view = agentPackage.view();
    expect(typeof view).toBe("object");
    expect(view.id).toBe(agentPackage.id);
    expect(view.org_id).toBe(agentPackage.org_id);
    expect(view.packages).toBe(agentPackage.packages);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });

  it("returns full view", () => {
    const view = agentPackage.view(true);
    expect(typeof view).toBe("object");
    expect(view.id).toBe(agentPackage.id);
    expect(view.org_id).toBe(agentPackage.org_id);
    expect(view.packages).toBe(agentPackage.packages);
    expect(view.createdAt).toBeTruthy();
    expect(view.updatedAt).toBeTruthy();
  });
});
