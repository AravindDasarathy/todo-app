import mongoose from 'mongoose';

/* sample todo:
    {
      "title": "Complete Assignment",
      "description": "Web UX Assignment 6 to be completed before Wednesday",
      "due_date": "2022-10-18",
      "time": "17:00"
    }
*/

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: 'The title field is required.'
  },
  description: {
    type: String,
    required: 'The description field is required.'
  },
  due_date: {
    type: String,
    required: 'The due date field is required.'
  },
  time: {
    type: String,
    required: 'The time field is required.'
  },
  isCompleted: {
    type: Boolean,
    default: false
  }
}, {
  versionKey: false,
  timestamps: true
});

/*
  * The 'toJSON' method of schema is used to generate the resource for the schema
  * We can add custom keys to the resource by adding them to the 'toJSON' method
*/
schema.method('toJSON', function() {
  const { __v, _id, createdAt, updatedAt, ...object } = this.toObject();

  object.id = _id;
  object.createdDate = createdAt;
  object.lastModifiedDate = updatedAt;

  return object;
});

const Todo = mongoose.model('todo', schema);

export default Todo;