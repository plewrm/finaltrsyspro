import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { addJobValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import { useEffect } from "react";
const AddJob = (props) => {
  const [data, setData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);
  const [clientData, setClientData] = useState([]);
  const [getCountry, setGetCountry] = useState([]);
  const [getState, setGetState] = useState(null);
  const [getCity, setGetCity] = useState(null);
  const [getJobSkills, setGetJobSkills] = useState([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addJobValidation),
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
    async function getClientApiData() {
      const clientResult = await AxiosApi("client", headersCors);
      const clientResp = clientResult.data;
      setClientData(clientResp);
    }
    getClientApiData();

    ///// Country
    async function getCountryData() {
      await AxiosApi.get(`/country/`, headersCors)
        .then((result) => setGetCountry(result?.data))
        .catch((error) => console.log("Get Country Error", error));
    }
    getCountryData();
  }, []);

  /////// Sate
  useEffect(() => {
    async function getState() {
      await AxiosApi.get(`state/`, headersCors).then((result) =>
        setGetState(result?.data).catch((error) =>
          console.log("Get State Error", error)
        )
      );
    }
    if (data?.country_id) {
      getState();
    }
  }, [data?.country_id]);

  /////// City

  useEffect(() => {
    async function getCity() {
      await AxiosApi.get(`city/state/${data?.state_id}`, headersCors).then(
        (result) =>
          setGetCity(result?.data).catch((error) =>
            console.log("Get City Error", error)
          )
      );
    }
    getCity();
  }, [data?.state_id]);

  /////// Job Skills

  useEffect(() => {
    async function getJobSkills() {
      await AxiosApi.get("/jobskills/", headersCors).then((result) =>
        setGetJobSkills(result?.data).catch((error) =>
          console.log("Get Job Skills Error", error)
        )
      );
    }
    getJobSkills();
  }, [data?.state_id]);
  const onSubmit = () => {
    const jsondata = {
      title: data.job_title,
      slug: data.slug,
      description: data.job_desc,
      client_id: data.client_id === "" ? null : data.client_id,
      job_type: data.job_type,
      min_experience: data.min_exp,
      max_experience: data.max_exp,
      display_order: data.display_order,
      display_date: data.display_date + "T09:51:43.869Z",
      country_id: data.country_id,
      state_id: data.state_id,
      city_id: data.city_id,
      must_have_jobskill_id: data.must_have_jobskill_id,
      nice_to_have_jobskill_id: data.nice_to_have_jobskill_id,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.post("job", jsondata);
      const resp = result.data;
      console.log("resp", resp);
      if (resp.detail === "Successfully registered") {
        setRenderComponent(true);
        reset();
        setData([]);
      }
    }
    postData();
  };
  const onReset = () => {
    reset();
    setData([]);
  };

  props?.reRenderCmponent(renderComponent);

  return (
    <section className="section profile" style={{ fontSize: "14px" }}>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title"> </h5>

              {/* <!-- Multi Columns Form --> */}
              <form
                className="row g-3 profile-edit"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="row mb-3">
                  <label for="inputEmail" className="col-sm-2 col-form-label">
                    Job Title <span className="astrik">*</span>
                    <span className="cal_black">(Job title here)</span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="job_title"
                      className={classNames("form-control", {
                        "is-invalid": errors.job_title,
                      })}
                      {...register("job_title", {
                        value: data.job_title,
                      })}
                      placeholder="Enter job title"
                      onChange={inputEvent}
                    />
                    <small className="invalid-feedback">
                      {errors.job_title?.message}
                    </small>
                  </div>
                  <label for="inputEmail" className="col-sm-2 col-form-label">
                    Slug <span className="astrik">*</span>
                    <span className="cal_black">
                      (Slug are unique identity)
                    </span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="slug"
                      className={classNames("form-control", {
                        "is-invalid": errors.slug,
                      })}
                      {...register("slug", {
                        value: data.slug,
                      })}
                      placeholder="Enter Slug"
                      onChange={inputEvent}
                    />
                    <small className="invalid-feedback">
                      {errors.slug?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label for="inputEmail" className="col-sm-2 col-form-label">
                    Job Description
                    <span className="astrik">*</span>
                    <span className="cal_black">(100-2000 characters)</span>
                  </label>
                  <div className="col-sm-10">
                    <textarea
                      type="text"
                      name="job_desc"
                      className={classNames("form-control", {
                        "is-invalid": errors.job_desc,
                      })}
                      {...register("job_desc", {
                        value: data.job_desc,
                      })}
                      placeholder="Enter Job Description"
                      onChange={inputEvent}
                    />
                    <small className="invalid-feedback">
                      {errors.job_desc?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-md-2 col-form-label">
                    Client
                    <span className="cal_black"> (Optional)</span>
                  </label>
                  <div className="col-md-4">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.client_id,
                      })}
                      onChange={inputEvent}
                      name="client_id"
                      value={data.client_id}
                    >
                      <option value="">--Select--</option>
                      {clientData.map((val) => (
                        <option value={val.id}>{val.name}</option>
                      ))}
                    </select>
                  </div>
                  <label className="col-md-2 col-form-label">
                    Job Type
                    <span className="cal_black">
                      (Select prefered job type)
                    </span>
                    <span className="astrik">*</span>
                  </label>
                  <div className="col-md-4">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.job_type,
                      })}
                      {...register("job_type", {
                        value: data.job_type,
                      })}
                      onChange={inputEvent}
                      name="job_type"
                      value={data.job_type}
                    >
                      <option value="">--Select--</option>
                      <option value="1">Full-Tme</option>
                      <option value="2">Part-Time </option>
                      <option value="3">Only-Weekend</option>
                      <option value="4">Permanent</option>
                      <option value="5">Temporary</option>
                    </select>
                    <small className="invalid-feedback">
                      {errors.job_type?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Min Exp <span className="cal_black">(in yrs) </span> 
                    <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="min_exp"
                      className={classNames("form-control", {
                        "is-invalid": errors.min_exp,
                      })}
                      {...register("min_exp", {
                        value: data.min_exp,
                      })}
                      // placeholder="1"
                      onChange={inputEvent}
                      maxLength="2"
                    />
                    <small className="invalid-feedback">
                      {errors.min_exp?.message}
                    </small>
                  </div>

                  <label className="col-sm-2 col-form-label">
                    Max Exp <span className="cal_black"> (in yrs)</span>
                    <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="max_exp"
                      className={classNames("form-control", {
                        "is-invalid": errors.max_exp,
                      })}
                      {...register("max_exp", {
                        value: data.max_exp,
                      })}
                      // placeholder="15"
                      onChange={inputEvent}
                      maxLength={2}
                    />
                    <small className="invalid-feedback">
                      {errors.max_exp?.message}
                    </small>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Display Order <span className="cal_black">(Enter orders in numeric) </span>
                    <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      type="text"
                      name="display_order"
                      className={classNames("form-control", {
                        "is-invalid": errors.display_order,
                      })}
                      {...register("display_order", {
                        value: data.display_order,
                      })}
                      placeholder="Enter job title"
                      onChange={inputEvent}
                    />
                    <small className="invalid-feedback">
                      {errors.display_order?.message}
                    </small>
                  </div>
                  <label className="col-sm-2 col-form-label">
                    Display Date
                    <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <input
                      className={classNames("form-control", {
                        "is-invalid": errors.display_date,
                      })}
                      {...register("display_date", {
                        value: data.display_date,
                      })}
                      onChange={inputEvent}
                      name="display_date"
                      value={data.display_date}
                      type="date"
                    />
                    <small className="invalid-feedback">
                      {errors.display_date?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Country <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.country_id,
                      })}
                      {...register("country_id", {
                        value: data.country_id,
                      })}
                      name="country_id"
                      onChange={inputEvent}
                      placeholder="country_id"
                      value={data?.country_id}
                    >
                      <option value="">Choose...</option>
                      {getCountry?.map((val) => (
                        <option value={val?.id}>{val?.name}</option>
                      ))}
                    </select>
                    <small className="invalid-feedback">
                      {errors.country_id?.message}
                    </small>
                  </div>
                  <label className="col-sm-2 col-form-label">
                    State <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.state_id,
                      })}
                      {...register("state_id", {
                        value: data.state_id,
                      })}
                      name="state_id"
                      onChange={inputEvent}
                      placeholder="state_id"
                      value={data?.state_id}
                    >
                      <option value="">Choose...</option>
                      {getState?.map((val) => (
                        <option value={val?.id}>{val?.name}</option>
                      ))}
                    </select>
                    <small className="invalid-feedback">
                      {errors.state_id?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    City <span className="astrik">*</span>
                  </label>
                  <div className="col-sm-4">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.city_id,
                      })}
                      {...register("city_id", {
                        value: data.city_id,
                      })}
                      name="city_id"
                      onChange={inputEvent}
                      placeholder="city_id"
                      value={data?.city_id}
                    >
                      <option value="">Choose...</option>
                      {getCity?.map((val) => (
                        <option value={val?.id}>{val?.name}</option>
                      ))}
                    </select>
                    <small className="invalid-feedback">
                      {errors.city_id?.message}
                    </small>
                  </div>
                </div>
                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Must have skill <span className="cal_black"> (Select skills you have)</span>
                    <span className="astrik">*</span>
                  </label>
                  <br />
                  <br />
                  <div className="col-sm-10">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.must_have_jobskill_id,
                      })}
                      {...register("must_have_jobskill_id", {
                        value: data.must_have_jobskill_id,
                      })}
                      name="must_have_jobskill_id"
                      onChange={inputEvent}
                      placeholder="must_have_jobskill_id"
                      value={data?.must_have_jobskill_id}
                    >
                      <option value="">Choose...</option>
                      {getJobSkills?.map((val) => (
                        <option value={val?.id}>{val?.name}</option>
                      ))}
                    </select>
                    <small className="invalid-feedback">
                      {errors.must_have_jobskill_id?.message}
                    </small>
                  </div>
                </div>

                <div className="row mb-3">
                  <label className="col-sm-2 col-form-label">
                    Nice to have skill<span className="cal_black">(Select skills you have) </span> 
                    <span className="astrik">*</span>
                  </label>
                  <br />
                  <br />
                  <div className="col-sm-10">
                    <select
                      className={classNames("form-control", {
                        "is-invalid": errors.nice_to_have_jobskill_id,
                      })}
                      {...register("nice_to_have_jobskill_id", {
                        value: data.nice_to_have_jobskill_id,
                      })}
                      name="nice_to_have_jobskill_id"
                      onChange={inputEvent}
                      placeholder="nice_to_have_jobskill_id"
                      value={data?.nice_to_have_jobskill_id}
                    >
                      <option value="">Choose...</option>
                      {getJobSkills?.map((val) => (
                        <option value={val?.id}>{val?.name}</option>
                      ))}
                    </select>
                    <small className="invalid-feedback">
                      {errors.nice_to_have_jobskill_id?.message}
                    </small>
                  </div>
                </div>

                <div className="modal-footer">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    // data-bs-dismiss={
                    //   data?.title === "" ||
                    //   data?.slug === "" ||
                    //   data?.description === "" ||
                    //   data?.display_date === "" ||
                    //   data?.display_order === "" ||
                    //   data?.job_type === "" ||
                    //   data?.max_experience === "" ||
                    //   data?.min_experience === "" ||
                    //   data?.client_id === "" ||
                    //   data?.country_id === "" ||
                    //   data?.state_id === "" ||
                    //   data?.city_id === "" ||
                    //   data?.must_have_jobskill_id === "" ||
                    //   data?.nice_to_have_skill_id === ""
                    //     ? ""
                    //     : "modal"
                    // }
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    className="btn btn-secondary"
                    onClick={onReset}
                  >
                    Reset
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                </div>
              </form>

              {/* <!-- End Multi Columns Form --> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AddJob;
