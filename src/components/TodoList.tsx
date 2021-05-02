import React from 'react';
import { IToDo } from '../interfaces';

type TodoListProps = {
    todos: IToDo[] //массив с интерфейсами IToDo
    onToggle(id: number): void
    // onRemove(id: number): void 
    onRemove: (id:number) => void
}

export const TodoList: React.FC<TodoListProps> = ({
    todos, onToggle, onRemove
}) => {
    if(todos.length === 0){
        return <p className="canter">Пока дел нет</p>
    }
    return(
        <ul>
            {todos.map((todo) => {
                const classes = ['todo'];
                if(todo.completed) {
                    classes.push('completed')
                }
                return (
                    <li className={classes.join(' ')} key={todo.id}>
                            <label> 
                            <input 
                                type="checkbox" 
                                checked={todo.completed}
                                onChange={() => onToggle(todo.id)}
                                />
                            <span>{todo.title}</span>
                            <i
                                onClick={(event) => {
                                    event.preventDefault();
                                    onRemove(todo.id)
                                }}
                                className="material-icons red-text"
                            >delete</i> 
                        </label>
                </li>
                )
            })}
        </ul>
    )
}