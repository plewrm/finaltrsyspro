import React from "react";

const OverViewClient = ({ data }) => {
  return (
    <div>
      <div className="row">
        <div className="col-lg-4 col-md-4 label">Client Id : </div>
        <div className="col-lg-4 col-md-4">{data?.client_code}</div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 label ">Client Name :</div>
        <div className="col-lg-4 col-md-8">{data?.name}</div>
      </div>
    </div>
  );
};

export default OverViewClient;
