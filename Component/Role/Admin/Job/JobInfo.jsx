import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { editJobsValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import OverViewJob from "./OverViewJob";
const JobInfo = (props) => {
  const [data, setData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [activeModal, setActiveModal] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editJobsValidation),
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
      await AxiosApi.get(`job/${props?.id}`, headersCors)
        .then((result) => {
          setData(result?.data[0]);
          reset(result?.data[0]);
          setRenderComponent(false);
        })
        .catch((error) => console.log("Get Job Error", error));
    }
    getData();
  }, [props?.id]);

  

  const onSubmit = () => {
    const jsondata = {
      ...data,
      display_date: `${data.display_date}T05:35:20.343Z`,
    };
    async function postData() {
      // setRenderComponent(false);
      const result = await AxiosApi.put(`/job/${props?.id}`, jsondata);
      const resp = result?.data;
      if (resp?.detail === "Successfully registered") {
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
                        Edit Job
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
                      <OverViewJob
                        data={data}
                        clientData={props?.clientData}
                        JobTypeList={props?.JobTypeList}
                      />
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
                          <label for="inputEmail5" className="form-label">
                            Title<span className="astrik">*</span> <span className="cal_black">(Job title here) </span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.title,
                            })}
                            {...register("title", {
                              value: data?.title,
                            })}
                            name="title"
                            onChange={inputEvent}
                            placeholder="Title"
                            value={data?.title}
                          />
                          <small className="invalid-feedback">
                            {errors?.title?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Slug<span className="astrik">*</span> <span className="cal_black"> (Slug are unique identity)</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.slug,
                            })}
                            {...register("slug", {
                              value: data?.slug,
                            })}
                            name="slug"
                            onChange={inputEvent}
                            placeholder="Last Name"
                            value={data?.slug}
                          />
                          <small className="invalid-feedback">
                            {errors?.slug?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Description<span className="astrik">*</span> <span className="cal_black">(100 - 2000 characters) </span>
                          </label>
                          <textarea
                            className={classNames("form-control", {
                              "is-invalid": errors?.description,
                            })}
                            {...register("description", {
                              value: data?.description,
                            })}
                            name="description"
                            onChange={inputEvent}
                            placeholder="description"
                            value={data?.description}
                          />
                          <small className="invalid-feedback">
                            {errors?.description?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Client<span className="cal_black">(Optional) </span> 
                          </label>
                          <select
                            className="form-control"
                            onChange={inputEvent}
                            name="client_id"
                            value={data?.client_id}
                          >
                            <option value="">Choose...</option>
                            {props?.clientData?.map((val) => (
                              <option value={val.id}>{val.name}</option>
                            ))}
                          </select>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Job Type<span className="astrik">*</span> <span className="cal_black"> (Select prefered job type)</span>
                          </label>
                          <select
                            className={classNames("form-control", {
                              "is-invalid": errors?.job_type,
                            })}
                            {...register("job_type", {
                              value: data?.job_type,
                            })}
                            onChange={inputEvent}
                            name="job_type"
                            value={data?.job_type}
                          >
                            <option value="">Choose...</option>
                            {props?.JobTypeList?.map((val) => (
                              <option value={val.value}>{val.name}</option>
                            ))}
                          </select>
                          <small className="invalid-feedback">
                            {errors?.job_type?.message}
                          </small>
                        </div>
                        {/* <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Job Type<span className="astrik">*</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.job_type,
                            })}
                            {...register("job_type", {
                              value: data?.job_type,
                            })}
                            name="job_type"
                            onChange={inputEvent}
                            placeholder="job_type"
                            value={data?.job_type}
                          />
                          <small className="invalid-feedback">
                            {errors?.job_type?.message}
                          </small>
                        </div> */}
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Minimum Experience <span className="cal_black"> (in yrs)</span> 
                            <span className="astrik">*</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.min_experience,
                            })}
                            {...register("min_experience", {
                              value: data?.min_experience,
                            })}
                            name="min_experience"
                            onChange={inputEvent}
                            placeholder="min_experience"
                            value={data?.min_experience}
                          />
                          <small className="invalid-feedback">
                            {errors?.min_experience?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Maximum Experience <span className="cal_black"> (in yrs)</span>
                            <span className="astrik">*</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.max_experience,
                            })}
                            {...register("max_experience", {
                              value: data?.max_experience,
                            })}
                            name="max_experience"
                            onChange={inputEvent}
                            placeholder="max_experience"
                            value={data?.max_experience}
                          />
                          <small className="invalid-feedback">
                            {errors?.max_experience?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Display Order<span className="astrik">*</span> <span className="cal_black"> (Enter orders in numeric)</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.display_order,
                            })}
                            {...register("display_order", {
                              value: data?.display_order,
                            })}
                            name="display_order"
                            onChange={inputEvent}
                            placeholder="display_order"
                            value={data?.display_order}
                          />
                          <small className="invalid-feedback">
                            {errors?.display_order?.message}
                          </small>
                        </div>
                        <div className="col-md-6">
                          <label for="inputEmail5" className="form-label">
                            Display Date<span className="astrik">*</span>
                          </label>
                          <input
                            className={classNames("form-control", {
                              "is-invalid": errors?.display_date,
                            })}
                            {...register("display_date", {
                              value: data?.display_date,
                            })}
                            type="date"
                            name="display_date"
                            onChange={inputEvent}
                            placeholder="display_date"
                            value={data?.display_date}
                          />
                          <small className="invalid-feedback">
                            {errors?.display_date?.message}
                          </small>
                        </div>

                        <div className="text-center">
                          <button
                            type="submit"
                            className="btn btn-primary"
                            data-bs-dismiss={
                              renderComponent === false ? undefined : "modal"
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

export default JobInfo;
