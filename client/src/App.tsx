import "./index.css"
import useSWR from "swr"
import AddTodo from "../components/AddTodo"
import { useState } from "react";
import {IoCheckmarkOutline} from 'react-icons/io5'

// FETCH BASE URL
export const ENDPOINT = "http://localhost:4000"

export interface Todo {
  id: number;
  title: string;
  body: string;
  done: boolean;
}

export default function App() {

  const [tasks, setTasks] = useState([])

  const fetchData = async (url: string) => {
    try {
      const result = await fetch(`${ENDPOINT}${url}`)
      const response = await result.json()
      setTasks(response)
    } catch (error) {
      throw new Error
    }
  }

  const martkToDoDone = async (id: number) => {
    const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
      method: "PATCH"
    }).then((r) => r.json())

    mutate(updated)
  }

  const { data, mutate } = useSWR<Todo[] | void>("/api/todos", fetchData)

  return (
    <h1 className="bg-container">
      <div className="main-container">
        <h1>Taskify</h1>
        <h5>Controle suas tarefas diárias, garatindo maior produtividade</h5>
        <div>
          {tasks.map((item: any) => (
            <div key={item.id} className="todo-item">
              <div className="action">
                {item.done === true ? (
                  <IoCheckmarkOutline size={20} className="done" />
                ) : (
                  <IoCheckmarkOutline size={20} onClick={martkToDoDone(item.id)}/>
                )}
              </div>
              <div className="info">
                <h2>{item.title } </h2>
                <p>{item.body} Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae officia nam quaerat illum ipsa similique? Minima libero explicabo, consectetur iste sapiente autem impedit dolore reprehenderit repellat dolores necessitatibus, natus quod!</p>
              </div>
            </div>
          ))}
        </div>
        <AddTodo mutate={mutate} />
      </div>
    </h1>
  )
}

