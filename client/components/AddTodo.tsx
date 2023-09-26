import React, { useState } from 'react'
import { ENDPOINT, Todo } from "../src/App"
import { KeyedMutator } from "swr";
import { IoArrowBackOutline } from 'react-icons/io5'

interface Form {
  title: string;
  body: string;
}

const AddTodo = ({ mutate }: { mutate: KeyedMutator<Todo[] | any> }) => {

  const [open, setOpen] = useState(false)
  const [form, setForm] = useState([
    {
      values: {
        title: "",
        body: ""
      }
    }
  ])

  const handleClose = async () => {
    setOpen(false)
  }

  const handleStateChange = async (name: string, value: string) => {
    setForm((prevForm) => {
      const updatedForm: any = [...prevForm]; 
      updatedForm[0].values[name] = value; 
      return updatedForm; 
    });
  };

  const createTodo = async (title: string, body: string) => {
    try {
      const updated = await fetch(`${ENDPOINT}/api/todos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          body: body
        })
      })
  
      mutate(updated)
      setForm([
        {
          values: {
            title: "",
            body: ""
          }
        }
      ])
      setOpen(false) 
    } catch (error) {
      throw new Error
    }
  } 

  return (
    <div className='add-todo-container'>
      {open === true ? (
        <div>
          <form onSubmit={(e: React.SyntheticEvent) => {
            e.preventDefault()
            createTodo(form[0].values.title, form[0].values.body)
          }}>
            <span className='title'>
              <IoArrowBackOutline size={20} onClick={handleClose} />
              <h2>Criar Tarefa</h2>
            </span>
            <label htmlFor="todoName">Título <span>*</span></label>
            <input type="text" name="title" id="title" placeholder='O que você deseja fazer?' autoComplete='off' maxLength={40} minLength={2} onChange={(e) => handleStateChange("title", e.target.value)} required />
            <label htmlFor="todoName">Descrição <span>*</span></label>
            <input type="text" name="body" id="body" placeholder='Descreva as atividades a serem realizadas' autoComplete='off' onChange={(e) => handleStateChange("body", e.target.value)} maxLength={40} minLength={2} required />

            <button type='submit'>
              Adicionar Tarefa
            </button>

          </form>
        </div>
      ) : (
        <></>
      )}

      <button onClick={() => setOpen(true)}>
        Adicionar tarefa
      </button>
    </div>
  )
}

export default AddTodo