import React, {useState} from 'react';
import {Todo} from "../@types/sportstore";

interface TodoProps {
    todo: Todo;
}

function TodoCard({ todo }: TodoProps) {
    const [checked, setChecked] = useState(todo.completed);

    return (
        <div>
            {todo.title}
            <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
            />
        </div>
    );
}
export default TodoCard;