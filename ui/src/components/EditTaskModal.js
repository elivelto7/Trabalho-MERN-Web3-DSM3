import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useForm } from "react-hook-form";
import { editTask } from '../services/TaskService'

export default function EditTaskModal({task, taskEdited}) {
    const [show, setShow] = useState(false);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const { register, handleSubmit } = useForm();
    const onSubmit = data => {
      editTask(data).then(response => {
        taskEdited(response);
        setShow(false);
    });
    };
  
    return (
      <>
        <Button variant="warning" onClick={handleShow}>
          Editar
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Tarefa</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="form-group col-md-3">
                  <label htmlFor="taskId">Id</label>
                  <input {...register("id")} type="text" className="form-control" defaultValue={task.id} name="id" id="id" disabled />
                </div>

            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="task">Tarefa</label>
                    <input {...register("task")} type="text" className="form-control" defaultValue={task.task} name="task" id="task" placeholder="Criar uma tarefa" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="assignee">Responsável</label>
                    <input {...register("assignee")} type="text" className="form-control" defaultValue={task.assignee} name="assignee" id="assignee" placeholder="Responsável" />
                </div>
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="status">Status:</label>
                    <select {...register("status")} name="status" defaultValue={task.status} className="form-control" id="status">
                        <option>Para iniciar</option>
                        <option>Em andamento</option>
                        <option>Concluída</option>
                    </select>
                </div>
            </div>
            <div className="btncenter">
              <input type="Enviar" className="btn btn-danger" />
            </div>
            </form>
          </Modal.Body>
          
        </Modal>
      </>
    );
}