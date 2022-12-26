const { model, Schema, mongoose } = require('mongoose');

const jobSchema = new Schema(
  {
    company: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: [
        'interview',
        'declined',
        'pending',
        'offer',
        'accepted',
        'rejected',
      ],
      default: 'pending',
    },
    createdBy: {
      // Using the User model id as a value to the createdBy field
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

const Job = model('Job', jobSchema);

module.exports = Job;
