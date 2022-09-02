const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const crypto = require('crypto');
const bcrypt = require('bcryptjs');

// name, email, photo, password, passwordConfirm
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    index: true,
    unique: true,
    trim: true,
    maxlengh: [40, 'The maximum length is 40 characters'],
    minlength: [5, 'The minimum length is 5 characters'],
    // validate: [validator.isAlpha, 'Name should contain only charaters'],
  },

  email: {
    type: String,
    required: [true, 'A tour must have a email'],
    unique: true,
    trim: true,
    lowercase: true,
    maxlengh: [40, 'The maximum length is 40 characters'],
    minlength: [5, 'The minimum length is 5 characters'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },

  photo: {
    type: String,
    //   required: [true, 'A tour must have a photo'],
  },

  role: {
    type: String,
    enum: ['admin', 'guide', 'lead-guide', 'user'],
    default: 'user',
  },

  password: {
    type: String,
    trim: true,
    required: [true, 'Please provide a password'],
    maxlengh: [40, 'The maximum length is 40 characters'],
    minlength: [5, 'The minimum length is 5 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    trim: true,
    required: [true, 'Please provide a password Confirm'],
    maxlengh: [40, 'The maximum length is 40 characters'],
    minlength: [5, 'The minimum length is 5 characters'],
    validate: {
      // This only works on CREATE and SAVE !
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same.',
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  this.passwordConfirm = undefined;

  next();
});

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  this.passwordResetExpires = Date.now() + 1000 * 10 * 60;

  return resetToken;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      JWTTimestampthis.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }

  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
