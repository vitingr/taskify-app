import "./index.css"
import useSWR from "swr"
import AddTodo from "../components/AddTodo"

// FETCH BASE URL
export const ENDPOINT = "http://localhost:5173"

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export default function App() {

  const fetchData = async (url: string) => {
    fetch(`${ENDPOINT}${url}`).then((r) => r.json())
  }

  const martkToDoDone = async (id: number) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH"
    }).then((r) => r.json())

    mutate(updated)
  }

  const { data, mutate } = useSWR<Todo[] | any>("/api/todos", fetchData)

  return (
    <h1 className="bg-container">
      <div className="main-container">
        <h1>Taskfy</h1>
        <h5>Controle suas tarefas diárias, garatindo maior produtividade</h5>
        <div>
          {JSON.stringify(data)}
        </div>
        <AddTodo mutate={mutate} />
      </div>
    </h1>
  )
}

