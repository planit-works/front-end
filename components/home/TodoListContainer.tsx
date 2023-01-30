import TodoItem from './TodoItem';
import { Todo } from 'types/Todo';
import TodoItemPlus from './TodoItemPlus';
import { useEffect, useState } from 'react';
import { getLocalStorage } from '../../utils/localStorage';
import useTodoListStore from 'store/todoStore';
export default function TodoListContainer() {
  const sample: Todo = { id: '1', title: '독서하기', done: false };
  const todoListState = useTodoListStore();
  useEffect(() => {
    const todos = getLocalStorage('todo-list');
    if (!todos) return;
    todoListState.setTodoList(JSON.parse(todos));
  }, []);

  return (
    <div>
      <p className="text-4xl font-bold">Todo</p>
      <ul className="mx-3 my-2">
        <li>
          <TodoItem todo={sample} />
        </li>
        {todoListState.todoList &&
          todoListState.todoList.map((todo) => {
            return (
              <li key={todo.id}>
                <TodoItem todo={todo} />
              </li>
            );
          })}
      </ul>
      <div className="mx-3">
        <TodoItemPlus />
      </div>
    </div>
  );
}
