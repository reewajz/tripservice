import mongoose, { Schema } from "mongoose";

const currency = ["$", "NRs", "Euro"];
const accomodationenum = ["hotel", "tea", "house", "lodge"];
const difficultyenum = ["Difficult", "Medium", "East"];
const modeenum = ["drive","fly","walk"];
const schemaOptions = {
  createdAt: "created_on",
  updatedAt: "last_modified_on"
};
const destinationSchema = new Schema(
  {
    dest_id: {
      type: String,
      required: true,
      minlength: [2, "length too small"],
      maxlength: [10, "length must not be greater than 10"]
    },
    seasons: {
      type: [String],
      required: true,
      validate: {
        validator: function(array) {
          return array.every(v => typeof v === "string" || v.length <= 15);
        }
      }
    },
    accomodation: {
      type: String,
      required: true,
      minlength: [4, "length too small"],
      maxlength: [15, "length must not be greater than 15"],
      enum: accomodationenum
    },
    group_size: {
      type: Number,
      required: true,
      min: 1,
      max: 50
    },
    starting_point: {
      type: String,
      required: true,
      minlength: [5, "length too small"],
      maxlength: [25, "size must not be greater than 25"]
    },
    end_point: {
      type: String,
      required: true,
      minlength: [5, "length too small"],
      maxlength: [25, "length must not be greater than 25"]
    },
    difficulty_level: {
      type: String,
      required: true,
      minlength: [4, "level too small"],
      maxlength: [15, "level must not be greater than 15"],
      enum: difficultyenum
    },
    altitude: {
      type: Number,
      required: true,
      min: 1500,
      max: 10000
    },
    created_by: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      }
    ],
    modified_by: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "User"
      }
    ]
  },
  {
    timestamps: schemaOptions,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

const itinerarySchema = new Schema(
  {
    day: {
      type: Number,
      required: true
    },
    mode: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 10,
      enum:modeenum
    },
    from: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25
    },
    to: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 20
    },
    duration_hrs: {
      type: Number,
      required: false,
      min: 1,
      max: 24
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
        delete ret.id;
      }
    }
  }
);

const departureSchema = new Schema(
  {
    price: {
      type: Number,
      required: false,
      min: 1
    },
    availability: {
      type: String,
      required: true
    },
    start_date: {
      type: Date,
      required: true
    },
    end_date: {
      type: Date,
      required: false
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
        delete ret.id;
      }
    }
  }
);

const packageSchema = new Schema(
  {
    region: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 25
    },
    itinerary: [
      {
        type: itinerarySchema,
        required: false
      }
    ],
    departures: [
      {
        type: departureSchema,
        required: false
      }
    ],
    destination: 
      {
        type: destinationSchema,
        required: true
      }
    ,
    best_sellers: {
      type: Boolean,
      required: false
    },
    description: {
      type: String,
      required: false
    },
    currency: {
      type: String,
      enum: currency,
      required: false
    },
    price: {
      type: Number,
      required: false
    },
    review_number: {
      type: Number,
      required: false
    },
    review_url: {
      type: String,
      required: false
    },
    image_url: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
        delete ret.id;
      }
    }
  }
);

const agentPackageSchema = new Schema(
  {
    org_id: {
      type: String,
      required: false
    },
    packages: {
      type: [packageSchema],
      required: true,
      unique: true,
      validate: [arrayLimit, `{PATH} should be in between 1 and 50`]
    }
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (obj, ret) => {
        delete ret._id;
      }
    }
  }
);

agentPackageSchema.methods = {
  view(full) {
    const view = {
      // simple view
      id: this.id,
      org_id: this.org_id,
      packages: this.packages,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      created_by: this.created_by
    };

    return full
      ? {
          ...view
          // add properties for a full view
        }
      : view;
  }
};

function arrayLimit(val) {
  return val.length > 0 && val.length < 51;
}

const model = mongoose.model("AgentPackage", agentPackageSchema,'agent_packages');

export const schema = model.schema;
export default model;
