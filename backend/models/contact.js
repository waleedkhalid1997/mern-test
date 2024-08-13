const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const contactSchema = new Schema(
  {
    name: {
      type: Schema.Types.String,
      index: true,
      sparse: true,
    },
    email: {
      type: Schema.Types.String,
      index: true,
      sparse: true,
      unique: true,
      required: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']

    },
    description: {
      type: Schema.Types.String,
    },
  },
  {
    timestamps: true,
  },
  { collection: "contacts" }
);

module.exports = mongoose.model("Contact", contactSchema);