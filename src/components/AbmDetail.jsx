import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import crudUrl from "../crudCrud/config.js";
import AbmForm from "./forms/AbmForm";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { ToastContainer } from "react-toastify";

const AbmDetail = () => {
  const [client, setClient] = useState({});
  const [edit, setEdit] = useState(false);
  const [update, setUpdate] = useState(false);
  const { cid } = useParams();

  useEffect(() => {
    const crudId = crudUrl();
    const url = `https://crudcrud.com/api/${crudId}/clients/${cid}`;
    axios.get(url).then((res) => {
      setClient(res.data);
    });
  }, [cid, update]);

  return (
    <div className="container my-3">
      {edit ? (
        <AbmForm
          client={client}
          setEdit={setEdit}
          setUpdate={setUpdate}
          update={update}
        />
      ) : (
        <div className="mb-3 col col-12 col-lg-6">
          <Card className="w-100">
            <Card.Header>
              {client.nameClient + " " + client.surname}
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <ListGroup>
                  {client.type === "company" ? (
                    <ListGroup.Item> Rut: {client.rut}</ListGroup.Item>
                  ) : (
                    ""
                  )}
                  <ListGroup.Item>
                    Tipo:
                    {client.type === "fConsumer"
                      ? " Consumidor final"
                      : " Empresa"}
                  </ListGroup.Item>
                  <ListGroup.Item>Telefono: {client.phone}</ListGroup.Item>
                  <ListGroup.Item>
                    Este cliente se encuentra
                    {client.status === "true" ? " activo" : " inactivo"}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Text>
              <Button onClick={() => setEdit(!edit)} variant="primary">
                Editar cliente
              </Button>
            </Card.Body>
          </Card>
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

export default AbmDetail;
