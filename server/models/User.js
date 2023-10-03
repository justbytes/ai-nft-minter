const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    images_generated: {
      type: Number,
      default: 0,
    },
    nfts_minted: {
      type: Number,
      default: 0,
    },
  }
  //   set this to use virtual below
  //   {
  //     toJSON: {
  //       virtuals: true,
  //     },
  //   }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// custom method to increment the amount of images generated
userSchema.methods.incrementImageCount = function () {
  this.images_generated += 1;
  return this.save();
};

userSchema.methods.incrementNftCount = function () {
  this.nfts_minted += 1;
  return this.save();
};

// -------- Future development -----------
// when we query a user, we'll also get another field called `nftCount` with the number of saved/created nfts they have
// userSchema.virtual('bookCount').get(function () {
//   return this.savedBooks.length;
// });

const User = model('User', userSchema);

module.exports = User;
