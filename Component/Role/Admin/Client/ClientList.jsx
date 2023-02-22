import React, { useState, useEffect, useMemo } from "react";
import ToolkitProviderTable from "../../../../Utils/ToolkitProviderTable";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import Navbar from "../../../Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import Sidebar from "../../../Sidebar";
import AddClient from "./AddClient";
import { textFilter } from "react-bootstrap-table2-filter";
import ClientInfo from "./ClientInfo";
// import MaterialTable from "../../../../Utils/MaterialTable";

import MaterialReactTable from "material-react-table";
import { data } from "jquery";

const ClientList = (props) => {
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState();
  const [loadComponent, setLoadComponent] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [isMainOpen, setIsMainOpen] = useState(true);
  const toggle = () => setIsMainOpen(!isMainOpen);
  const [renderComponent, setRenderComponent] = useState(false);


  useEffect(() => {
    async function getData() {
      const result = await AxiosApi("client", headersCors);
      const resp = result.data;
      setTableData(resp);
    }
    getData();
  }, [loadComponent]);

  const handleSaveRow = ({ exitEditingMode, row, values }) => {
    tableData[row.index] = values;
    const jsondata = {
      name: values?.name,
      client_code:values?.client_code,
    };
    // setTableData([...tableData]);

    async function getData() {
     setRenderComponent(false);
     const result = await AxiosApi.put(`/client/${row?.original?.id}`, jsondata);
     setRenderComponent(true);

    }
    getData();
    console.log("see here", jsondata,values)
    exitEditingMode();
  };

  const onRowUpdate = (updatedRow, exitEditingMode, row, values, oldRow) =>
    new Promise(() => {
      tableData[row.index] = values;
      const values = oldRow.tableData.id;
      const updatedRows = [...data];
      updatedRow[index] = updatedRow;
      setTimeout(() => {
        setTableData([...tableData] ,updatedRows);
        exitEditingMode();
        resolve();
      }, 2000);
    });

  const columnData = useMemo(
    () => [
      {
        accessorKey: "client_code",
        header: "Client Code",
        size: 120,
      },
      {
        accessorKey: "name",
        header: "Client Name",
        size: 220,
      },
      // {
      //   accessorKey: "phone",
      //   header: "Phone",
      //   size: 220,
      // },
    ],
    []
  );
  const actionDetailsButton = (cell, row) => {
    if (row.id) {
      return (
        <>
          <OverlayTrigger overlay={<Tooltip id="tooltip">View/Edit</Tooltip>}>
            <button
              type="button"
              class="btn btn-outline-secondary border-0 mx-2 btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#basicModal"
              onClick={() => setId(row?.id)}
            >
              <i class="bi bi-eye"></i>
            </button>
          </OverlayTrigger>
        </>
      );
    }
  };
  const columns = [
    {
      dataField: "client_code",
      text: "Client Code",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "name",
      text: "Name",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      formatter: actionDetailsButton,
      dataField: "btn",
      text: "Action",
      csvExport: false,
    },
  ];
  const renderComp = (data) => {
    setLoadComponent(data);
  };
  const handleFilterValue = () => {
    setFilterValue([]);
  };
  // props?.reRenderCmponent(renderComponent);

  return (
    <div>
      <Navbar />
      <Sidebar onClick={toggle} />
      <main
        id="main"
        className="main"
        style={{ fontSize: "14px", marginLeft: isMainOpen ? "100px" : "300px" }}
      >
        <div className="pagetitle">
          <div className="addbtn">
            <h1>Clients List</h1>
            <button
              type="button"
              className="btn btn-primary btn-sm mb-2"
              data-bs-toggle="modal"
              data-bs-target="#basicModalAdd"
            >
              Add New Client
            </button>
          </div>

          <MaterialReactTable
            columns={columnData}
            data={tableData}
            enableEditing
            editingMode="row"
            onEditingRowSave={handleSaveRow}
            // onEditingRowSave={onRowUpdate}
          />
        </div>
      </main>

      {/* =================== Edit Modal=================== */}
      <div
        className="modal fade"
        id="basicModal"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Client Info </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {id === undefined ? (
              ""
            ) : (
              <ClientInfo id={id} reRenderCmponent={renderComp} />
            )}
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="basicModalAdd"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Client </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <AddClient reRenderCmponent={renderComp} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientList;
