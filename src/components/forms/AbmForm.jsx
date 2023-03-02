import { React, useState } from "react";
import axios from "axios";
import crudUrl from "../../crudCrud/config.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

export default function AbmForm({ client, setEdit, setUpdate, update }) {
  const [clientModified, setClientModified] = useState({ ...client });

  const putClient = async () => {
    const crudId = crudUrl();
    const cid = client._id;
    await axios
      .put(`https://crudcrud.com/api/${crudId}/clients/${cid}`, clientModified)
      .then(() => {
        console.log(clientModified);
        setEdit(false);
        setUpdate(!update);
        toast.success("Usuario actualizado", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleOnChange = (e) => {
    if (e.target.name === "typeEnterprise" || e.target.name === "typeConsumer")
      e.target.name = "type";

    if (e.target.name === "status") {
      e.target.value === "false"
        ? (e.target.value = "true")
        : (e.target.value = "false");
    }

    setClientModified({
      ...clientModified,
      [e.target.name]: e.target.value,
    });
    console.log(clientModified);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    //toast
    delete clientModified._id;
    putClient();
  };
  return (
    <div className="container my-3">
      <form onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Nombre:
            <Form.Control
              onChange={handleOnChange}
              type="text"
              name="nameClient"
              value={clientModified.nameClient}
              required
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Apellido:
            <Form.Control
              onChange={handleOnChange}
              type="text"
              name="surname"
              value={clientModified.surname}
              required
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label>
            Tipo:
            <Form.Check
              onChange={handleOnChange}
              id="company"
              type="radio"
              name="typeEnterprise"
              value="company"
              checked={clientModified.type === "company" ? true : false}
              label="Empresa"
            />
            <Form.Check
              onChange={handleOnChange}
              id="fConsumer"
              type="radio"
              name="typeConsumer"
              value="fConsumer"
              checked={clientModified.type === "fConsumer" ? true : false}
              label="Consumidor Final"
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Rut:
            <Form.Control
              onChange={handleOnChange}
              type="number"
              name="rut"
              value={
                clientModified.type === "company" ? clientModified.rut : ""
              }
              required={clientModified.type === "fConsumer" ? false : true}
              disabled={clientModified.type === "fConsumer" ? true : false}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Teléfono:
            <Form.Control
              onChange={handleOnChange}
              type="tel"
              name="phone"
              value={clientModified.phone}
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="w-50">
            <Form.Check
              onChange={handleOnChange}
              type="switch"
              name="status"
              value={clientModified.status === "false" ? "false" : "true"}
              label="Cliente Activo"
              checked={clientModified.status === "false" ? false : true}
            />
          </Form.Label>
        </Form.Group>
        <Button variant="secondary" onClick={() => setEdit(false)}>
          Atras
        </Button>
        <Button variant="success" type="submit" className="mx-3">
          Actualizar cliente
        </Button>
      </form>
    </div>
  );
}
