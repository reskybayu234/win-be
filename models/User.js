import mongoose from "mongoose";
// import mongoosePaginate from "mongoose-paginate-v2";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    gender : {
        type : String,
        required : true
    },
    password: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Number,
    },
    updatedAt: {
      type: Number,
    },
  },
  {
    timestamps: {
      currentTime: () => Math.floor(Date.now() / 1000),
    },
  }
);

// Schema.plugin(mongoosePaginate);

const User = mongoose.model("User", Schema);
export default User;
