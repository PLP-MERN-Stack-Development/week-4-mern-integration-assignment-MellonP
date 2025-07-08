import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  excerpt: {
    type: String,
    maxlength: [200, 'Excerpt cannot exceed 200 characters']
  },
  featuredImage: {
    public_id: String,
    url: String
  },
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category'
  }],
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  slug: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'published'
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add pagination plugin
postSchema.plugin(mongoosePaginate);

// Generate slug before saving
postSchema.pre('save', function(next) {
  this.slug = this.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  next();
});

const Post = mongoose.model('Post', postSchema);
export default Post;