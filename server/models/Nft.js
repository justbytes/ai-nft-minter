const { Schema } = require('mongoose');

const nftSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    type: String,
    required: true,
  },
  attributes: [
    {
      trait: {
        type: String,
      },
      value: {
        type: String,
      },
    },
  ],
});

module.exports = nftSchema;
