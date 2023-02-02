import create from 'zustand';
import { Todo } from 'types/Todo';

interface TodoListState {
  todoList: Todo[];
  setTodoList: (value: Todo[]) => void;
}

const useTodoListStore = create<TodoListState>()((set) => ({
  todoList: [],
  setTodoList: (value) => set({ todoList: value }),
}));
export default useTodoListStore;
