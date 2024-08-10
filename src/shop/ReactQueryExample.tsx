import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {useState} from "react";
import {addTodo, fetchTodos} from "../api";
import TodoCard from "./TodoCard";


function ReactQueryExample() {
    const queryClient = useQueryClient();

    const [search, setSearch] = useState("");
    const [title, setTitle] = useState("");

    const {data: todos, isLoading, isError, error} =
        useQuery({
            queryKey: ["todos", {search}],  // "todos" is a cache key (unique key)
            queryFn: () => fetchTodos(search),
            staleTime: Infinity,
        });

    const {mutateAsync: addTodoMutation} = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["todos"]});  // invalidate cache key and re-fetch the data from the API sever
        },
    });

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <h2 className="text-center">{error.message}</h2>;
    }

    return (
        <div>
            <div>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <button
                    onClick={async () => {
                        try {
                            await addTodoMutation({title});
                            setTitle("");
                        } catch (e) {
                            console.log(e);
                        }
                    }}
                >
                    Add Todo
                </button>
            </div>
            {todos?.map((todo) => (
                <TodoCard key={todo.id} todo={todo}/>
            ))}
        </div>
    );
}

export default ReactQueryExample;