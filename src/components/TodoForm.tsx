import React, { useState, useRef } from 'react';

interface TodoFormProps {
    onAdd(title:string): void
}

export const TodoForm: React.FC<TodoFormProps> = props => {
    //<{}> - ожидаем объект props (также в аргументах), со свойством onAdd (возвращает void), принимает в себя title типа string

    // const [title, setTitle] = useState<string>(''); 
    //стейт должен быть стрингой
    // const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => { //тип ивента React.ChangeEvent. HTML - generic тип поля input
    //     setTitle(event.target.value);
    // }



    //С помощью хука useRef
    //реф - ссылка, которую нужно привязать к ивенту с помощью атрибута ref
    const ref = useRef<HTMLInputElement>(null);


    const keyPressHandler = (event: React.KeyboardEvent) => { //тип нажатия кнопки клавиантуры
        if(event.key === 'Enter'){
            // console.log(title)
            // setTitle('');

            props.onAdd(ref.current!.value);

            // console.log(ref.current!.value); //! - мы уверены, что всё будет хорошо
            ref.current!.value = '';
        }
    }

    return (
        <div className="input-field mt2">
            <input 
            // onChange={changeHandler}
            // value={title} 
            ref={ref}
            type="text" 
            id="title" 
            placeholder="Введите название дела"
            onKeyPress={keyPressHandler}
            />
            <label htmlFor="title" className="active">
                Введите название дела
            </label>
        </div>
    )
}
 