import React, { useState, useEffect } from "react";
import ToolkitProviderTable from "../../../../Utils/ToolkitProviderTable";
import AxiosApi, { headersCors, BaseURL } from "../../../../Utils/AxiosApi";
import Navbar from "../../../Navbar";
import Sidebar from "../../../Sidebar";
// import ViewCandidate from "./ViewCandidate";
import CandidateInfo from "./CandidateInfo";
import AddCandidate from "./AddCandidate";
import { textFilter } from "react-bootstrap-table2-filter";
import GridLoader from "react-spinners/GridLoader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

const CandidateList = () => {
  const [loading, setLoading] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState();
  const [loadComponentAdd, setLoadComponentAdd] = useState(false);
  const [loadComponentEdit, setLoadComponentEdit] = useState(false);
  const [filterValue, setFilterValue] = useState("");

  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await AxiosApi("candidates", headersCors);
      const resp = result?.data;
      // const resultExperience = await AxiosApi(
      //   `/candidates/experience/`,
      //   headersCors
      // );
      // const respExperience = resultExperience?.data;
      // const a3 = resp.map((t1) => ({
      //   ...t1,

      //   ...respExperience.find((t2) => t2.member_id === t1.id),
      // }));
      setTableData(resp);
      // console.log("here see", a3);
      setLoading(false);
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
          <OverlayTrigger overlay={<Tooltip id="tooltip">Download CV</Tooltip>}>
            <a href={`${BaseURL}/documents/download/${row.cv}/`}>
              <i class="bi bi-download me-3 fs-5"></i>
            </a>
          </OverlayTrigger>

          {/* <p style={{ marginLeft: 14 }}>
            {row.cv ? (
              <>
                <a href={`${BaseURL}/documents/download/${row.cv}/`}>
                  <i class="bi bi-download me-3 fs-5"></i>
                </a>
              </>
            ) : null}
          </p> */}
          {/* <OverlayTrigger overlay={<Tooltip id="tooltip">View</Tooltip>}>
            <button
              type="button"
              title="View"
              class="btn btn-outline-secondary border-0 mx-2 btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#ExtraLargeModals "
              //target="_blank"

              onClick={() => setId(row?.id)}
            >
             
            </button>
          </OverlayTrigger> */}
        </>
      );
    }
  };

  const columns = [
    {
      dataField: "id",
      text: "ID",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "first_name_old",
      text: "First Name",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "last_name_old",
      text: "Last Name",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "phone",
      text: "Phone",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "email_old",
      text: "Email",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "role",
      text: "Role",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    // {
    //   formatter: (cell, row) => {
    //     if (row.id) {
    //       return (
    //         <>
    //           <p>
    //             {row.cv ? (
    //               <>
    //                 <a href={`${BaseURL}/documents/download/${row.cv}/`}>
    //                   <i class="bi bi-download me-3 fs-5"></i>
    //                 </a>
    //               </>
    //             ) : null}
    //           </p>
    //         </>
    //       );
    //     }
    //   },
    //   text: "CV",
    // },
    {
      dataField: "address",
      text: "Address",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "experience_years",
      text: "Experience",
      filter: textFilter({
        defaultValue: filterValue,
      }),
      sort: true,
    },
    {
      dataField: "skills_other",
      text: "Skills",
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
  const renderCompAdd = (data) => {
    setLoadComponentAdd(data);
  };
  const renderCompEdit = (data) => {
    setLoadComponentEdit(data);
  };
  const handleFilterValue = () => {
    setFilterValue([]);
  };
  return (
    <div>
      {loading ? (
        <div className="textcnt">
          <GridLoader color={"#5062F2"} loading={loading} size={10} />
        </div>
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <main id="main" class="main" style={{ fontSize: "14px" }}>
            <div class="pagetitle">
              <div className="addbtn">
                <h1>Candidates List</h1>
                <button
                  type="button"
                  class="btn btn-primary btn-sm mb-2"
                  data-bs-toggle="modal"
                  data-bs-target="#AddCandidateModal"
                  //target="_blank"
                  //onClick={() => setData(row?.id)}
                >
                  Add Candidate
                </button>
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
            class="modal fade"
            id="AddCandidateModal"
            tabindex="-1"
            aria-hidden="true"
            style={{ display: "none" }}
          >
            <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Add New Candidate </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>

                <AddCandidate reRenderCmponent={renderCompAdd} />
              </div>
            </div>
          </div>
          {/* ==================== Edit Modal ======================= */}
          <div
            class="modal fade"
            id="ExtraLargeModal"
            tabindex="-1"
            aria-hidden="true"
            style={{ display: "none" }}
          >
            <div class="modal-dialog modal-xl">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title">Candidate Info </h5>
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
                  <CandidateInfo
                    // tableData={tableData[3]}
                    id={id}
                    reRenderCmponent={renderCompEdit}
                  />
                )}
              </div>
            </div>
            {/* ==================== View Modal ======================= */}
          </div>
        </>
      )}
    </div>
  );
};

export default CandidateList;
