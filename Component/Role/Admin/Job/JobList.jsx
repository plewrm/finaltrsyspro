import React, { useEffect, useState } from "react";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import ToolkitProviderTable from "../../../../Utils/ToolkitProviderTable";
import Navbar from "../../../Navbar";
import Sidebar from "../../../Sidebar";
import JobInfo from "./JobInfo";
import AddJob from "./AddJob";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { textFilter } from "react-bootstrap-table2-filter";
const JobTypeList = [
  {
    value: "1",
    name: "Full-Tme",
  },
  {
    value: "2",
    name: "Part-Time",
  },
  {
    value: "3",
    name: "Only-Weekend",
  },
  {
    value: "4",
    name: "Permanent",
  },
  {
    value: "5",
    name: "Temporary",
  },
];
const JobList = () => {
  const [tableData, setTableData] = useState([]);
  const [tableDataClient, setTableDataClient] = useState([]);
  const [id, setId] = useState();
  const [loadComponentEdit, setLoadComponentEdit] = useState(false);
  const [loadComponentAdd, setLoadComponentAdd] = useState(false);
  const [filterValue, setFilterValue] = useState("");
  const [isMainOpen, setIsMainOpen] = useState(true);
  const toggle = () => setIsMainOpen(!isMainOpen);

  useEffect(() => {
    async function getData() {
      const result = await AxiosApi("job/get_jobs", headersCors);
      const resp = result?.data;
      const resultClient = await AxiosApi("client", headersCors);
      const respClient = resultClient?.data;
      setTableData(resp);
      setTableDataClient(respClient);
    }
    getData();
  }, [loadComponentAdd, loadComponentEdit]);

  const actionDetailsButton = (cell, row) => {
    if (row?.id) {
      return (
        <>
          <OverlayTrigger overlay={<Tooltip id="tooltip">View/Edit</Tooltip>}>
            <button
              type="button"
              class="btn btn-outline-secondary border-0 mx-2 btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#ExtraLargeModal"
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
    // {
    //   dataField: "id",
    //   text: "Id",
    // },
    {
      dataField: "title",
      text: "Title",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "client_id",
      text: "Client Name",
      formatter: (cell, row) => {
        if (row.id) {
          return tableDataClient?.map((val) => {
            return val?.id === row?.client_id ? val.name : "";
          });
        }
      },
      filter: textFilter({
        defaultValue: filterValue,
      }),

      sort: true,
    },
    {
      dataField: "job_type",
      text: "Job Type",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      formatter: (cell, row) => {
        if (row.id) {
          return JobTypeList?.map((val) => {
            return parseInt(val?.value) === row?.job_type ? val.name : "";
          });
        }
      },
      sort: true,
    },
    {
      dataField: "min_experience",
      text: "Min Exp",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "max_experience",
      text: "Max Exp",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      formatter: (cell, row) => (
        <span>{row.status ? "Active" : "Inactive"}</span>
      ),
      dataField: "status",
      text: "Status",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },

    {
      formatter: actionDetailsButton,
      dataField: "btn",
      text: "Action",
    },
  ];
  // const renderCompAdd = (data) => {
  //   setLoadComponentAdd(data);
  // };
  // const renderCompEdit = (data) => {
  //   setLoadComponentEdit(data);
  // };
  const handleFilterValue = () => {
    setFilterValue([]);
  };
  return (
    <div>
      <Navbar />

      <Sidebar onClick={toggle}/>

      <main id="main" className="main" 
            style={{ fontSize: "14px",marginLeft: isMainOpen ? "100px" : "300px" }}
            >
        <div className="pagetitle">
          <div className="addbtn">
            <h1>Job List</h1>

            {/* <NavLink to="/addnewclients">
              <button type="button" className="btn btn-primary btn-sm mb-2">
                Add New Client
              </button>
            </NavLink> */}
            <OverlayTrigger overlay={<Tooltip id="tooltip">Add Job</Tooltip>}>
              <button
                type="button"
                className="btn btn-primary btn-sm mb-2"
                data-bs-toggle="modal"
                data-bs-target="#AddLargeModal"
                //target="_blank"
                //onClick={() => setData(row?.id)}
              >
                Add Job
              </button>
            </OverlayTrigger>
          </div>
          <ToolkitProviderTable
            tableData={tableData}
            columns={columns}
            onClick={handleFilterValue}
          />
        </div>
      </main>
      {/* ==================== Add Modal ======================= */}

      <div
        className="modal fade"
        id="AddLargeModal"
        tabindex="-1"
        aria-hidden="true"
        style={{ display: "none" }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Add New Job </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <AddJob
              reRenderCmponent={(data) => {
                setLoadComponentAdd(data);
              }}
            />
          </div>
        </div>
      </div>
      {/* ==================== View Modal ======================= */}
      <div
        className="modal fade"
        id="ExtraLargeModal"
        tabindex="-1"
        aria-hidden="true"
        // style={{ display: "none" }}
      >
        <div className="modal-dialog modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Job Info </h5>
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
              <JobInfo
                id={id}
                clientData={tableDataClient}
                JobTypeList={JobTypeList}
                reRenderCmponent={(data) => {
                  setLoadComponentEdit(data);
                }}
              />
            )}
          </div>
        </div>
      </div>
      {/* ==================== Edit Modal ======================= */}
    </div>
  );
};

export default JobList;
