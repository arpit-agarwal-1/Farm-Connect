const mongoose = require('mongoose');

const livestockSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true,
    description: "Represents the name of the livestock"
  },
  species: {
    type: String,
    required: true,
    description: "Represents the species of the livestock"
  },
  age: {
    type: Number,
    required: true,
    description: "Represents the age of the livestock"
  },
  breed: {
    type: String,
    required: true,
    description: "Represents the breed of the livestock"
  },
  healthCondition: {
    type: String,
    required: true,
    description: "Represents the health condition of the livestock"
  },
  location: {
    type: String,
    required: true,
    description: "Represents the location of the livestock"
  },
  vaccinationStatus: {
    type: String,
    required: true,
    description: "Represents the vaccination status of the livestock"
  },
  attachment: {
    type: String,
    required: true,
    description: "Represents any attachments related to the livestock"
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    description: "Represents the ID of the user who owns the livestock"
  }
},{ timestamps: true });

module.exports = mongoose.model('Livestock', livestockSchema);

