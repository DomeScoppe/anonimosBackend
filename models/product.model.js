const { model, Schema } = require("mongoose");

const schema = new Schema({
  name: String,
  type: String,
  description: String,
  price: Number,
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: "Restaurant",
  },
});

const Product = model("Product", schema);

module.exports = {
  Product,
};
