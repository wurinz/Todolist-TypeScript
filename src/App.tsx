import { strict } from 'node:assert';
import React, {useState, useEffect} from 'react';
import { TodoForm } from './components/TodoForm';
import { TodoList } from './components/TodoList';
import { IToDo } from './interfaces';
import { Navbar } from './components/Navbar';

type TodoListProps = {
  todos: IToDo[] //массив с интерфейсами IToDo
  onToggle(id: number): void
  // onRemove(id: number): void 
  onRemove: (id:number) => void
}


// declare var confirm: (question: string) => boolean 

//если вдруг мы не хотим обращаться к методу confirm через глобальный объект
//тогда перенную можно задекларировать и вызвать вместо
//window.confirm() просто confirm()

const App: React.FC = () => { //FC - тип функциональной компоненты
  const [todos, setTodos] = useState<IToDo[]>([]); //по умолчанию тип never, поэтому нужно написать свой интерфейс для todo

  //забираем элементы в storage
    useEffect(() => {
      const saved = JSON.parse(localStorage.getItem('todos') || '[]') as IToDo[] //1 этап: забираем элементы в localStorage
      //проблема в том, что эта конструкция может вернуть null
      setTodos(saved)
    }, [])
  
    //2. сохраняем элементы
    useEffect(() => {
      localStorage.setItem('todos', JSON.stringify(todos))//пре
    }, [todos])
  
    const addHandler = (title: string) => {
      const newTodo: IToDo = {
        title: title, 
        id: Date.now(),
        completed: false
      }
      // setTodos([newTodo, ...todos]) //запись не всегда гарантирует что мы работаем с актуальным стейтом!!
      setTodos(prev => [newTodo, ...prev]) //создаём новый стейт, основываясь на старом
    }
  
    const toggleHandler = (id: number) => {
      setTodos(prev => 
        prev.map(todo => {
          if(todo.id === id){
            return { //необходимо вернуть новый объект - обновлённый стейт
              ...todo,
              completed: !todo.completed
            }
          }
        return todo
      }))
    }
  
    const removeHandler = (id: number) => {
      // setTodos(todos.filter(todo => todo.id !== id))
      const shouldRemove = window.confirm('Вы уверены что завершили дельце?')
      if(shouldRemove){
        setTodos(prev => prev.filter(todo => todo.id !== id))
      }
    }

  return <>
    <Navbar />
    <div className="container">
    <TodoForm onAdd={addHandler}/>

    <TodoList 
      todos={todos} 
      onRemove={removeHandler} 
      onToggle={toggleHandler}
    />
    </div>
  </>
}

export default App;

