import mongoose, { Schema } from 'mongoose'

const destinationSchema = new Schema({
  dest_id: {
    type: String
  },
  seasons: {
    type: String
  },
  accomodation: {
    type: String
  },
  group_size: {
    type: String
  },
  starting_point: {
    type: String
  },
  end_point: {
    type: String
  },
  difficulty_level: {
    type: String
  },
  altitude: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

destinationSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      dest_id: this.dest_id,
      seasons: this.seasons,
      accomodation: this.accomodation,
      group_size: this.group_size,
      starting_point: this.starting_point,
      end_point: this.end_point,
      difficulty_level: this.difficulty_level,
      altitude: this.altitude,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Destination', destinationSchema)

export const schema = model.schema
export default model
