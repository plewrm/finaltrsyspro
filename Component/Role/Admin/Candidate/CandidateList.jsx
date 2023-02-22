import React, { useState, useEffect, useMemo } from "react";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import Navbar from "../../../Navbar";
import Sidebar from "../../../Sidebar";
import CandidateInfo from "./CandidateInfo";
import AddCandidate from "./AddCandidate";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import MaterialTable from "../../../../Utils/MaterialTable";
import { Box, Button } from '@mui/material';
import cellEditFactory from 'react-bootstrap-table2-editor';

const Example = () => {
  const [tableData, setTableData] = useState([]);
  const [id, setId] = useState({});
  const [loading, setLoading] = useState(false);
  const [loadComponentEditProfileDetails, setLoadComponentProfileDetails] =
    useState(false);
  const [getSendData, setGetSendData] = useState([]);
  const [loadComponentAdd, setLoadComponentAdd] = useState(false);
  const [isMainOpen, setIsMainOpen] = useState(true);
  const toggle = () => setIsMainOpen(!isMainOpen);


  useEffect(() => {
    async function getData() {
      setLoading(true);
      const result = await AxiosApi("candidates", headersCors);
      const resp = result?.data;
      setTableData(resp);
      setLoading(false);
    }

    getData();
  }, [loadComponentEditProfileDetails, loadComponentAdd]);

  const columnData = useMemo(
    () => [
      // {
      //   accessorKey: "id",
      //   header: "ID",
      //   size: 40,
      // },
      {
        accessorFn: (row) => `${row.first_name_old} ${row.last_name_old}`,
        header: "Name",
        size: 150,
      },
      {
        accessorKey: "email_old",
        header: "email",
        size: 120,
        // enableColumnFilter: false,
      },
      {
        accessorKey: "skills_other",
        // accessorFn: (row) => row?.skills_other?.split(",")?.map((item) => <p style={{backgroundColor:"green", width:"fit-content",height:"fit-content", borderRadius:"3px", margin:"5px", padding:"5px"}}>{item}</p>),
        header: "Skills",
        size: 220,
        columnFilterModeOptions:[
          'startsWith',
          'endsWith',
          'contains'
        ],
        Cell: ({ cell }) => (
          <Box
            component="span"
            sx={(theme) => ({ 
              borderRadius: '0.25rem',
              color: '#fff',
             p: '0.25rem',
              display:"flex",
              flexWrap: "wrap",
              width:"15rem"

            })}
          >
            
            {cell?.getValue()?.split(",")?.map((item) =>
            
             <p style={{backgroundColor:"lightgrey",color:"black", width:"fit-content",height:"fit-content", borderRadius:"3px", margin:"2px", padding:"5px"}}>
              {item}
              </p>)
}
          </Box>
        )
        
      },
      {
        accessorKey: "phone",
        header: "Phone",
        size: 220,
      },
      {
        accessorFn: (row) =>
          `${
            row.experience_years === null || row.experience_years === 0
              ? ""
              : row.experience_years + " Year's"
          }  ${
            row.experience_months === null || row.experience_months == 0
              ? ""
              : row.experience_months + " Month's"
          } `,
        header: "Experience",
        size: 220,
        columnFilterModeOptions: [
          "equals",
          "between",
          "betweenInclusive",
          "greaterThan",
          "greaterThanOrEqualTo",
          "lessThan",
          "lessThanOrEqualTo",
        ],
      },
    ],
    []
  );
  return (
    <>
      <Navbar />
      <Sidebar onClick={toggle} />
      <main id="main" className="main" 
            style={{ fontSize: "14px",marginLeft: isMainOpen ? "100px" : "300px" }}
            >
        <div className="pagetitle">
          <div className="addbtn">
            <h1>Candidate List</h1>

            {/* <NavLink to="/addnewclients">
              <button type="button" className="btn btn-primary btn-sm mb-2">
                Add New Client
              </button>
            </NavLink> */}
            <OverlayTrigger
              overlay={<Tooltip id="tooltip">Add Candidate</Tooltip>}
            >
              <button
                type="button"
                className="btn btn-primary btn-sm mb-2"
                data-bs-toggle="modal"
                data-bs-target="#AddCandidateModal"
                target="_blank"
                // onClick={() => setData(row?.id)}
              >
                Add Candidate
              </button>
            </OverlayTrigger>
          </div>
          <MaterialTable
            columnData={columnData}
            tableData={tableData}
            loading={loading}
            getSendID={(camdidateId, candidateFirstName, candidateLastName) =>
              setId({
                id: camdidateId,
                name: `${candidateFirstName} ${candidateLastName}`,
              })
            }
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
        <div class="modal-dialog modal-xl">
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

            <AddCandidate
              reRenderCmponent={(data) => setLoadComponentAdd(data)}
            />
          </div>
        </div>
      </div>
      {/* =============================Modal====================== */}
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
              <h5 class="modal-title">{id?.name}</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            {id.id === undefined ? (
              ""
            ) : (
              <CandidateInfo
                // tableData={tableData[3]}
                id={id}
                reRenderCmponent={(data) => {
                  setLoadComponentProfileDetails(data);
                }}
              />
            )}
          </div>
        </div>
        {/* ==================== View Modal ======================= */}
      </div>
    </>
  );
};

export default Example;
