import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Category name is required'],
    unique: true,
    trim: true,
    maxlength: [50, 'Category name cannot exceed 50 characters']
  },
  slug: {
    type: String,
    unique: true
  },
  description: {
    type: String,
    maxlength: [200, 'Description cannot exceed 200 characters']
  }
}, {
  timestamps: true
});

// Generate slug before saving
categorySchema.pre('save', function(next) {
  this.slug = this.name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '');
  next();
});

const Category = mongoose.model('Category', categorySchema);
export default Category;