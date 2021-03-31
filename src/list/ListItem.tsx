import React from 'react';
import { Todo } from '../Todo';

type Props = {
    todo: Todo,
    onDelete: (id:number) => void,
}

const ListItem: React.FC<Props> = ({todo, onDelete}) => {
    return <div>
        <div>{todo.title}</div>
        <button onClick={() => onDelete(todo.id)}>delete</button>
    </div>
}

export default ListItem;