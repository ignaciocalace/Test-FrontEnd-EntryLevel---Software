import { useEffect, useState } from "react";
import AbmList from "./AbmList.jsx";
import axios from "axios";
import crudUrl from "../crudCrud/config.js";
import Table from "react-bootstrap/Table";
import { ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

const AbmListContainer = () => {
  const [clients, setClients] = useState([]);

  const getClients = async () => {
    const crudId = crudUrl();
    axios.get(`https://crudcrud.com/api/${crudId}/clients`).then((res) => {
      setClients(res.data);
    });
  };

  useEffect(() => {
    getClients();
  }, []);

  const clientMap = () => {
    return clients.map((client) => (
      <AbmList key={client._id} client={client} getClients={getClients} />
    ));
  };

  return (
    <div className="container">
      {clients?.length > 0 ? (
        <Table striped bordered hover className="my-3">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Teléfono</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{clientMap()}</tbody>
        </Table>
      ) : (
        <div className=" text-center">
          <h2 className=" my-5">No hay clientes registrados</h2>
          <Link to={`/createClient`}>
            <Button variant="primary" className="my-2 my-md-0">
              Crear Cliente
            </Button>
          </Link>
        </div>
      )}
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

export default AbmListContainer;
