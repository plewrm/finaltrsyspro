import React from "react";

const OverViewJob = ({ data, clientData, JobTypeList }) => {
  console.log("clientData", JobTypeList);
  return (
    <div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Title : </div>
        <div className="col-lg-4 col-md-4">{data?.title}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Description :</div>
        <div className="col-lg-9 col-md-8">{data?.description}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Client Name :</div>
        <div className="col-lg-9 col-md-8">
          {clientData.map((val) =>
            val?.id === data?.client_id ? val.name : ""
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Job Type :</div>
        <div className="col-lg-9 col-md-8">
          {JobTypeList.map((val) =>
            parseInt(val?.value) === data?.job_type ? val.name : ""
          )}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Created Datetime: :</div>
        <div className="col-lg-4 col-md-4">
          {data?.created_datetime?.slice(0, 10)}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Display on Website :</div>
        <div className="col-lg-4 col-md-4">
          {data?.display_on_website ? "Yes" : "No"}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Updated Datetime :</div>
        <div className="col-lg-4 col-md-4">
          {data?.updated_datetime?.slice(0, 10)}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Experience :</div>
        <div className="col-lg-4 col-md-4">
          Max: {data?.max_experience} , Min:
          {data?.min_experience}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Status : </div>
        <div className="col-lg-4 col-md-4">
          {data?.status ? "Active" : "Inactive"}
        </div>
      </div>
    </div>
  );
};

export default OverViewJob;
