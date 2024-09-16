import mongoose from 'mongoose';

const testSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  wpm: { 
    type: Number, 
    required: true 
  },
  accuracy: { 
    type: Number, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  textSource: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'TextSource', 
    required: true 
  },
  duration: { 
    type: Number, 
    required: true 
  },
  mistakes: { 
    type: Number, 
    default: 0 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

testSchema.index({ user: 1, createdAt: -1 });

const Test = mongoose.model('Test', testSchema);

export default Test;