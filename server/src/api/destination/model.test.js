import { Destination } from '.'

let destination

beforeEach(async () => {
  destination = await Destination.create({ dest_id: 'test', seasons: 'test', accomodation: 'test', group_size: 'test', starting_point: 'test', end_point: 'test', difficulty_level: 'test', altitude: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = destination.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(destination.id)
    expect(view.dest_id).toBe(destination.dest_id)
    expect(view.seasons).toBe(destination.seasons)
    expect(view.accomodation).toBe(destination.accomodation)
    expect(view.group_size).toBe(destination.group_size)
    expect(view.starting_point).toBe(destination.starting_point)
    expect(view.end_point).toBe(destination.end_point)
    expect(view.difficulty_level).toBe(destination.difficulty_level)
    expect(view.altitude).toBe(destination.altitude)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = destination.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(destination.id)
    expect(view.dest_id).toBe(destination.dest_id)
    expect(view.seasons).toBe(destination.seasons)
    expect(view.accomodation).toBe(destination.accomodation)
    expect(view.group_size).toBe(destination.group_size)
    expect(view.starting_point).toBe(destination.starting_point)
    expect(view.end_point).toBe(destination.end_point)
    expect(view.difficulty_level).toBe(destination.difficulty_level)
    expect(view.altitude).toBe(destination.altitude)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
