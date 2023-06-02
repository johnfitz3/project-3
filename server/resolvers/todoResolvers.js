const Todo = require('../models/todoResolvers.s');

const resolvers = {
  Query: {
    todos: async () => {
      try {
        const todos = await Todo.find();
        return todos;
      } catch (error) {
        throw new Error('Error retrieving todos');
      }
    },
  },
  Mutation: {
    createTodo: async (_, { title, description }) => {
      try {
        const todo = new Todo({
          title,
          description,
        });
        await todo.save();
        return todo;
      } catch (error) {
        throw new Error('Error creating todo');
      }
    },
  },
};

module.exports = resolvers;
