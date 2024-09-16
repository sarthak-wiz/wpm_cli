import mongoose from 'mongoose';

const textSourceSchema = new mongoose.Schema({
  text: { 
    type: String, 
    required: true 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'], 
    required: true 
  },
  category: { 
    type: String, 
    required: true 
  },
  author: { 
    type: String, 
    default: 'Unknown' 
  },
  source: { 
    type: String, 
    default: 'Custom' 
  },
  timesUsed: { 
    type: Number, 
    default: 0 
  },
  isActive: { 
    type: Boolean, 
    default: true 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

textSourceSchema.index({ difficulty: 1, category: 1 });

const TextSource = mongoose.model('TextSource', textSourceSchema);

export default TextSource;