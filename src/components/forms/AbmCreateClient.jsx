import React, { useState } from "react";
import axios from "axios";
import crudUrl from "../../crudCrud/config.js";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { toast, ToastContainer } from "react-toastify";

const AbmCreateClient = () => {
  const [newClient, setNewClient] = useState({ status: "false" });

  const postClient = async () => {
    const crudId = crudUrl();
    await axios
      .post(`https://crudcrud.com/api/${crudId}/clients`, newClient)
      .then(() => {
        toast.success("Cliente creado", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      });
  };

  const handleOnChange = (e) => {
    console.log(newClient);
    console.log(e.target.name);
    console.log(e.target.value);
    if (e.target.name === "status") {
      e.target.value === "false"
        ? (e.target.value = "true")
        : (e.target.value = "false");
    }
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
    console.log(newClient);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    postClient();
    setNewClient({ status: "false" });
    document.getElementById("createCLient").reset();
  };

  const { nameClient, surname, rut, phone } = newClient;
  return (
    <div className="container my-3">
      <h2>Crear Cliente</h2>
      <form id="createCLient" onSubmit={handleOnSubmit}>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Nombre:
            <Form.Control
              onChange={handleOnChange}
              type="text"
              name="nameClient"
              value={nameClient}
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
              value={surname}
              required
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3 col col-12 col-lg-6">
          <Form.Label className="w-100">
            Tipo:
            <Form.Check
              onChange={handleOnChange}
              id="company"
              type="radio"
              name="type"
              value="company"
              label="Empresa"
              required
            />
            <Form.Check
              onChange={handleOnChange}
              id="fConsumer"
              type="radio"
              name="type"
              value="fConsumer"
              label="Consumidor Final"
              required
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
              value={newClient.type === "company" ? rut : ""}
              required={newClient.type === "fConsumer" ? false : true}
              disabled={newClient.type === "fConsumer" ? true : false}
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
              value={phone}
              required
            />
          </Form.Label>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="w-50">
            <Form.Check
              onChange={handleOnChange}
              type="switch"
              name="status"
              value={newClient.status === "false" ? "false" : "true"}
              label="Cliente Activo"
            />
          </Form.Label>
        </Form.Group>

        <Button variant="success" type="submit">
          Agregar cliente
        </Button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default AbmCreateClient;
