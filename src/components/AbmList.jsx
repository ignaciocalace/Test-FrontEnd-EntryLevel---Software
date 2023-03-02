import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import crudUrl from "../crudCrud/config.js";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";

const AbmList = ({ client, getClients }) => {
  const crudId = crudUrl();
  const deleteUser = async (id) => {
    await axios
      .delete(`https://crudcrud.com/api/${crudId}/clients/${id}`)
      .then((res) => {
        getClients();
        toast.error("Cliente eliminado", {
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
  return (
    <tr>
      <td className="align-middle">
        {client.nameClient + " " + client.surname}
      </td>
      {client.type === "fConsumer" ? (
        <td className="align-middle">Consumidor final</td>
      ) : (
        <td className="align-middle">Empresa</td>
      )}
      <td className="align-middle">{client.phone}</td>
      <td className="col-md-4 text-center">
        <Link to={`/${client._id}`}>
          <Button variant="primary" className="my-2 my-md-0">
            Seleccionar
          </Button>
        </Link>

        <Button
          variant="danger"
          className="mx-2"
          onClick={() => deleteUser(client._id)}
        >
          Borrar
        </Button>
      </td>
    </tr>
  );
};

export default AbmList;
