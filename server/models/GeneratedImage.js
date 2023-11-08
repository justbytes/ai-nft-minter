const { Schema } = require('mongoose');

const generatedImageSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  prompt: {
    type: String,
    required: true,
  },
});

module.exports = generatedImageSchema;
