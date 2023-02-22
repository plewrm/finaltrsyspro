import React, { useEffect, useState } from "react";
import Navbar from "../../Navbar";
import Sidebar from "../../Sidebar";
import AxiosApi, { headersCors } from "../../../Utils/AxiosApi";
import GridLoader from "react-spinners/GridLoader";
const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [isMainOpen, setIsMainOpen] = useState(true);
  const toggle = () => setIsMainOpen(!isMainOpen);
  const [data, setData] = useState({
    countCandidate: "",
    countJobs: "",
    countClients: "",
  });
  useEffect(() => {
    async function getData() {
      setLoading(true);
      const candidateResult = await AxiosApi.get("candidates", headersCors);
      const jobResult = await AxiosApi.get("job/get_jobs", headersCors);
      const clientResult = await AxiosApi.get("client", headersCors);
      setData({
        countCandidate: candidateResult?.data.length,
        countJobs: jobResult?.data.length,
        countClients: clientResult?.data.length,
      });
      setLoading(false);
    }
    getData();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="textcnt">
          <GridLoader color={"#5062F2"} loading={loading} size={10} />
        </div>
      ) : (
        <>
          <Navbar />
          <Sidebar onClick={toggle} />
          <main id="main" class="main"
            style={{ fontSize: "14px",marginLeft: isMainOpen ? "100px" : "300px" }}
          >
            <div class="pagetitle">
              <h1>Dashboard</h1>
              <nav>
                <ol class="breadcrumb">
                  <li class="breadcrumb-item">
                    <a href="index.html">Home</a>
                  </li>
                  <li class="breadcrumb-item active">Dashboard</li>
                </ol>
              </nav>
            </div>
            <section class="section dashboard">
              <div class="row">
                <div class="col-lg-8">
                  <div class="row">
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Candidates
                            {/* <span>| Today</span> */}
                          </h5>

                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-person"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{data?.countCandidate}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Jobs
                            {/* <span>| Today</span> */}
                          </h5>

                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-briefcase"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{data?.countJobs}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="col-xxl-4 col-md-6">
                      <div class="card info-card sales-card">
                        <div class="card-body">
                          <h5 class="card-title">
                            Clients
                            {/* <span>| Today</span> */}
                          </h5>

                          <div class="d-flex align-items-center">
                            <div class="card-icon rounded-circle d-flex align-items-center justify-content-center">
                              <i class="bi bi-person-badge"></i>
                            </div>
                            <div class="ps-3">
                              <h6>{data?.countClients}</h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </div>
  );
};

export default Dashboard;
