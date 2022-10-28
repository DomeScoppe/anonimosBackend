const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  address: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
});

const Restaurant = model("Restaurant", schema);

module.exports = {
  Restaurant,
};
