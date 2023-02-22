import React, { useState } from "react";
import OverViewClient from "./OverViewClient";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { editClientValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import { useEffect } from "react";
const ClientInfo = (props) => {
  const [data, setData] = useState([]);
  const [resetData, setResetData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editClientValidation),
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  useEffect(() => {
    async function getData() {
      const results = await AxiosApi.get(`client/${props?.id}`, headersCors);
      const resps = results?.data[0];
      reset(resps);
      setResetData(resps);
      setData(resps);
    }
    getData();
  }, [props?.id]);

  const onSubmit = () => {
    const jsondata = {
      name: data.name,
      client_code: data.client_code,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.put(`/client/${props.id}`, jsondata);
      const resp = result.data;
      if (resp.detail === "Successfully Updated") {
        setRenderComponent(true);
      }
    }
    postData();
  };

  props?.reRenderCmponent(renderComponent);
  return (
    <div>
      <div class="pagetitle" style={{ fontSize: "14px" }}>
        <section class="section profile">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <ul className="nav nav-tabs nav-tabs-bordered" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-overview"
                        aria-selected="true"
                        role="tab"
                      >
                        Overview
                      </button>
                    </li>

                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        data-bs-toggle="tab"
                        data-bs-target="#profile-edit"
                        aria-selected="false"
                        role="tab"
                        tabindex="-1"
                      >
                        Edit Client
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content pt-2 modalView"
                    style={{ marginLeft: "20px" }}
                  >
                    <div
                      className="tab-pane fade profile-overview active show"
                      id="profile-overview"
                      role="tabpanel"
                    >
                      <OverViewClient data={data} />
                    </div>
                    <div
                      className="tab-pane fade profile-edit "
                      id="profile-edit"
                      role="tabpanel"
                    >
                      <form
                        className="row g-3 mt-2"
                        onSubmit={handleSubmit(onSubmit)}
                      >
                        <div className="col-md-6">
                          <label className="form-label">Client Id<span
                        style={{ color: "red", fontSize: 16, fontWeight: 600 }}
                      >
                        *
                      </span> (Alphanumeric)</label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors.client_code,
                            })}
                            {...register("client_code", {
                              value: data?.client_code,
                            })}
                            name="client_code"
                            onChange={inputEvent}
                            placeholder="Client Id"
                            value={data?.client_code}
                          />
                          <small className="invalid-feedback">
                            {errors.client_code?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Client Name<span
                        style={{ color: "red", fontSize: 16, fontWeight: 600 }}
                      >
                        *
                      </span> (max 100 characters)</label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors.name,
                            })}
                            {...register("name", {
                              value: data?.name,
                            })}
                            name="name"
                            onChange={inputEvent}
                            placeholder="First Name"
                            value={data?.name}
                          />
                          <small className="invalid-feedback">
                            {errors.name?.message}
                          </small>
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss={
                              data?.name === "" || data?.client_code === ""
                                ? ""
                                : "modal"
                            }
                          >
                            Save changes
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ClientInfo;
