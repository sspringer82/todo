import React from 'react';
import { Todo } from './Todo';

type Props = {
    todo: Todo
}

const ListItem: React.FC<Props> = ({todo}) => {
    return <div>
        <div>{todo.title}</div>
    </div>
}

export default ListItem;