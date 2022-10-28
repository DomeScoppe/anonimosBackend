const { model, Schema } = require("mongoose");

const schema = new Schema({
  email: String,
  password: String,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const User = model("User", schema);

module.exports = {
  User,
  schema,
};
