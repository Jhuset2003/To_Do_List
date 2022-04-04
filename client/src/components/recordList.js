import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Record = (props) => (
  <tr>
    <td>{props.record.name}</td>
    <td>{props.record.position}</td>
    <td>{props.record.level}</td>
    <td>
      <Link className="btn btn-success" to={`/edit/${props.record._id}`}> Editar </Link>&nbsp;&nbsp; 
      <button className="btn  btn-danger"
        onClick={() => {
          props.deleteRecord(props.record._id);
        }}
      >
          Completa
      </button>
    </td>
  </tr>
);

export default function RecordList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`https://mern-start2.herokuapp.com/record`,);

      if (!response.ok) {
        const message = `An error occured: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();
      setRecords(records);
    }

    getRecords();

    return; 
  }, [records.length]);

  
  async function deleteRecord(id) {
    await fetch(`https://mern-start2.herokuapp.com/${id}`, {
     method: "DELETE"
    });

    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }


  function recordList() {
    return records.map((record) => {
      return (
        <Record
          record={record}
          deleteRecord={() => deleteRecord(record._id)}
          key={record._id}
        />
      );
    });
  }

  
  return (
    <div>
      <h3>Lista de tareas</h3>
      <table className="table table-bordered table-primary" style={{ marginTop: 20 }}>
        <thead className="table-success">
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Prioridad</th>
            <th>Acción</th>
          </tr>
        </thead>
        <tbody>{recordList()}</tbody>
      </table>
    </div>
  );
}