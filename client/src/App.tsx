import "./index.css"
import useSWR from "swr"
import AddTodo from "../components/AddTodo"
import { useEffect, useState } from "react";
import { IoCheckmarkOutline } from 'react-icons/io5'

// FETCH BASE URL
export const ENDPOINT = "http://localhost:4000"

export interface Todo {
  id: number;
  title: string;
  done: boolean;
  body: string;
}

export default function App() {

  const [tasks, setTasks] = useState([])

  const fetchData = async () => {
    try {
      const result = await fetch(`${ENDPOINT}/api/todos`)
      const response = await result.json()
      setTasks(response)
    } catch (error) {
      throw new Error
    }
  }

  const markToDone = async (id: number) => {
    try {
      const updated = await fetch(`${ENDPOINT}/api/todos/${id}/done`, {
        method: "PATCH"
      })
    } catch (error) {
      throw new Error
    }
  }

  useEffect(() => {
    fetchData()
  }, [tasks])

  return (
    <h1 className="bg-container">
      <div className="main-container">
        <div>
        <h1>Taskify</h1>
        <h5>Controle suas tarefas diárias, garatindo maior produtividade</h5>
        <div>
          {tasks.map((item: any) => (
            <div key={item.id} className="todo-item">
              {item.done === true ? (
                <div className="action done" onClick={() => markToDone(item.id)}>
                  <IoCheckmarkOutline size={25} />
                </div>
              ) : (
                <div className="action false" onClick={() => markToDone(item.id)}>
                  <IoCheckmarkOutline size={25} />
                </div>
              )}
              <div className="info">
                <h2>{item.title} </h2>
                <p>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
        </div>
        <AddTodo />
      </div>
    </h1>
  )
}

