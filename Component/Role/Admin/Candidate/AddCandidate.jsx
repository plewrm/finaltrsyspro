import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { addCandidateValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
const AddCandidate = (props) => {
  const [renderComponent, setRenderComponent] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [getCountry, setGetCountry] = useState([]);
  const [getState, setGetState] = useState(null);
  const [getCity, setGetCity] = useState(null);
  const [getCurrency, setGetCurrency] = useState(null);
  const [getExpertise, setGetExpertise] = useState(null);
  const [getIndustry, setGetIndustry] = useState(null);
  const [file, setFile] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addCandidateValidation),
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    setViewData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  const [uploadfile, setFiles] = useState([]);
  const filestore = (e) => {
    inputEvent(e);
    setFiles(e.target.files[0]);
    const formData = new FormData();
    formData.append("cv", e.target.files[0]);
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    setFile(event.target.files[0]);
  };
  useEffect(() => {
    ///// Country
    async function getCountryData() {
      await AxiosApi.get(`country/`, headersCors)
        .then((result) => setGetCountry(result?.data))
        .catch((error) => console.log("Get Country Error", error));
    }
    getCountryData();
    ////// Currency
    async function getCurrencyData() {
      await (await AxiosApi.get(`currency/`, headersCors))
        .then((result) => setGetCurrency(result?.data))
        .catch((error) => console.log("Get Currency Error", error));
    }
    getCurrencyData();
    ////// Member Expertise

    async function getExpertiesData() {
      await AxiosApi.get(`expertises/`, headersCors)
        .then((resp) => setGetExpertise(resp?.data))
        .catch((error) => console.log("Get Expertises Error", error));
    }
    getExpertiesData();
    //////  Industry
    async function getIndustriesData() {
      const viewResults_Industry = await AxiosApi.get(`industry/`, headersCors);
      const viewResps_Industry = viewResults_Industry?.data;
      setGetIndustry(viewResps_Industry);
    }
    getIndustriesData();
    async function getViewData() {
      ///// Candidate
      await AxiosApi.get(`candidates/${props?.id}`, headersCors)
        .then((result) => {
          reset(result?.data[0]);
          setViewData(result?.data[0]);
        })
        .catch((errors) => console.log("Get Candidate Error", errors));
    }
    getViewData();
  }, []);
  useEffect(() => {
    async function getState() {
      await AxiosApi.get(
        `state/country/${viewData?.country_id}`,
        headersCors
      ).then((result) =>
        setGetState(result?.data).catch((error) =>
          console.log("Get State Error", error)
        )
      );
    }
    if (viewData?.country_id) {
      getState();
    }
  }, [viewData?.country_id]);
  /////// City

  useEffect(() => {
    async function getCity() {
      await AxiosApi.get(`city/state/${viewData?.state_id}`, headersCors).then(
        (result) =>
          setGetCity(result?.data).catch((error) =>
            console.log("Get City Error", error)
          )
      );
    }
    getCity();
  }, [viewData?.state_id]);
  const onSubmit = () => {
    alert();
    const jsondata = {
      ...viewData,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.post(`/candidates/create`, jsondata);
      const resp = result?.data;
      // const result_Experties = await AxiosApi.post(
      //   `/expertises/${props?.id}`,
      //   jsondata_Experties
      // );
      // const result_Industries = await AxiosApi.post(
      //   `/industry/${props?.id}`,
      //   jsondata_Industries
      // );
      // const result_Experience = await AxiosApi.post(
      //   `/candidates/experience/${props?.id}/${
      //     viewData?.experience_id === null ? 0 : viewData?.experience_id
      //   }`,
      //   jsondata_Experience
      // );
      // const formData = new FormData();
      // formData.append("file", file);
      // console.log("formData", formData);
      // fetch(`${BaseURL}documents/${props?.id}/cv/`, {
      //   method: "POST",
      //   body: formData,
      // });
      if (resp.detail === "Successfully Registered") {
        setRenderComponent(true);
        reset();
        setViewData([]);
      }
    }
    postData();
  };

  props?.reRenderCmponent(renderComponent);

  return (
    <div>
      <div class="pagetitle">
        <section class="section profile">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  {/* <!-- Multi Columns Form --> */}
                  <form
                    className="row g-3 mt-2 profile-edit"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <h5 class="card-title">Personal Details</h5>
                    <div className="col-md-4">
                      <label for="inputEmail5" className="form-label">
                        Salutation
                      </label>
                      <select
                        className="form-control"
                        onChange={inputEvent}
                        name="salutation"
                        value={viewData?.salutation}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Mr.</option>
                        <option value="2">Mrs.</option>
                        <option value="3">Ms.</option>
                        <option value="4">Dr.</option>
                        <option value="5">Prfo</option>
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label for="inputEmail5" className="form-label">
                        First Name <span className="astrik">*</span>
                        <span className="cal_black">(max 100 characters)</span>
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.first_name_old,
                        })}
                        {...register("first_name_old", {
                          value: viewData?.first_name_old,
                        })}
                        name="first_name_old"
                        onChange={inputEvent}
                        placeholder="First Name"
                        value={viewData?.first_name_old}
                      />
                      <small className="invalid-feedback">
                        {errors.first_name_old?.message}
                      </small>
                    </div>
                    <div className="col-md-4">
                      <label for="inputEmail5" className="form-label">
                        Last Name<span className="cal_black">(max 100 characters)</span>
                      </label>
                      <input
                        className="form-control"
                        name="last_name_old"
                        onChange={inputEvent}
                        placeholder="Last Name"
                        value={viewData?.last_name_old}
                      />
                    </div>

                    {/* <================  Contact Details ==============>  */}
                    <h5 class="card-title">Contact Details</h5>

                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Email<span className="astrik">*</span>
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.email_old,
                        })}
                        {...register("email_old", {
                          value: viewData?.email_old,
                        })}
                        name="email_old"
                        onChange={inputEvent}
                        placeholder="email_old"
                        value={viewData?.email_old}
                      />
                      <small className="invalid-feedback">
                        {errors.email_old?.message}
                      </small>
                    </div>

                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Alternet Email <span className="cal_black"> (Optional)</span>
                      </label>
                      <input
                        className="form-control"
                        name="email2"
                        onChange={inputEvent}
                        placeholder="email2"
                        value={viewData?.email2}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Primary phone country<span className="astrik">*</span>
                      </label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.primary_phone_country_id,
                        })}
                        {...register("primary_phone_country_id", {
                          value: viewData?.primary_phone_country_id,
                        })}
                        onChange={inputEvent}
                        name="primary_phone_country_id"
                        value={viewData?.primary_phone_country_id}
                        // disabled
                      >
                        <option value="">Choose...</option>
                        {getCountry?.map((val) => (
                          <option value={val?.id}>{val?.name}</option>
                        ))}
                      </select>
                      <small className="invalid-feedback">
                        {errors.primary_phone_country_id?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Phone<span className="astrik">*</span>
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.phone,
                        })}
                        {...register("phone", {
                          value: viewData?.phone,
                        })}
                        name="phone"
                        onChange={inputEvent}
                        placeholder="phone"
                        value={viewData?.phone}
                      />
                      <small className="invalid-feedback">
                        {errors.phone?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Alternate phone country
                        <span className="astrik">*</span>
                      </label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.alternate_phone_country_id,
                        })}
                        {...register("alternate_phone_country_id", {
                          value: viewData?.alternate_phone_country_id,
                        })}
                        name="alternate_phone_country_id"
                        onChange={inputEvent}
                        placeholder="alternate_phone_country_id"
                        value={viewData?.alternate_phone_country_id}
                      >
                        <option value="">Choose...</option>
                        {getCountry?.map((val) => (
                          <option value={val?.calling_code}>{val?.name}</option>
                        ))}
                      </select>
                      <small className="invalid-feedback">
                        {errors.alternate_phone_country_id?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Alternate Phone 
                        {/* <span className="astrik">*</span> */} <span className="cal_black"> (Optional)</span>
                      </label>
                      <input
                      className="form-control"
                        // className={classNames("form-control", {
                        //   "is-invalid": errors.phone2,
                        // })}
                        {...register("phone2", {
                          value: viewData?.phone2,
                        })}
                        name="phone2"
                        onChange={inputEvent}
                        placeholder="phone2"
                        value={viewData?.phone2}
                      />
                      {/* <small className="invalid-feedback">
                        {errors.phone2?.message}
                      </small> */}
                    </div>
                    {/* <================  Postal Address ==============>  */}
                    <h5 class="card-title">Postal Address</h5>

                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Address<span className="astrik">*</span><span className="cal_black">(Optional, max 2000 characters) </span>
                      </label>
                      <textarea
                        className={classNames("form-control", {
                          "is-invalid": errors.address,
                        })}
                        {...register("address", {
                          value: viewData?.address,
                        })}
                        name="address"
                        onChange={inputEvent}
                        placeholder="address"
                        value={viewData?.address}
                      />
                      <small className="invalid-feedback">
                        {errors.address?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Country
                      </label>
                      <select
                        className="form-control"
                        name="country_id"
                        onChange={inputEvent}
                        placeholder="country_id"
                        value={viewData?.country_id}
                      >
                        <option value="">Choose...</option>
                        {getCountry?.map((val) => (
                          <option value={val?.id}>{val?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        State
                      </label>
                      <select
                        className="form-control"
                        name="state_id"
                        onChange={inputEvent}
                        placeholder="state_id"
                        value={viewData?.state_id}
                      >
                        <option value="">Choose...</option>
                        {getState?.map((val) => (
                          <option value={val?.id}>{val?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        City
                      </label>
                      <select
                        className="form-control"
                        name="city_id"
                        onChange={inputEvent}
                        placeholder="city_id"
                        value={viewData?.city_id}
                      >
                        <option value="">Choose...</option>
                        {getCity?.map((val) => (
                          <option value={val?.id}>{val?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Zip Code <span className="astrik">*</span><span className="cal_black">(Optional, max 20 characters) </span>
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.zipcode,
                        })}
                        {...register("zipcode", {
                          value: viewData?.zipcode,
                        })}
                        name="zipcode"
                        onChange={inputEvent}
                        placeholder="zipcode"
                        value={viewData?.zipcode}
                      />
                      <small className="invalid-feedback">
                        {errors.zipcode?.message}
                      </small>
                    </div>
                    {/* <!================ Profile Summary ============> */}
                    <h5 class="card-title">Profile Summary</h5>
                    <div className="col-md-12">
                      <label for="inputEmail5" className="form-label">
                        Profile Heading <span className="cal_black">(20 - 150 characters) </span>
                      </label>
                      <input
                        className="form-control"
                        name="profile_headline"
                        onChange={inputEvent}
                        placeholder="profile_headline"
                        value={viewData?.profile_headline}
                      />
                    </div>
                    <div className="col-md-12">
                      <label for="inputEmail5" className="form-label">
                        Profile Summary <span className="cal_black">(100 - 2000 characters) </span> 
                      </label>
                      <textarea
                        className="form-control"
                        name="profile_summary"
                        onChange={inputEvent}
                        placeholder="profile_summary"
                        value={viewData?.profile_summary}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Experience <span className="cal_black"> (in Years)</span>
                      </label>
                      <input
                        className="form-control"
                        name="experience_years"
                        onChange={inputEvent}
                        placeholder="experience_years"
                        value={viewData?.experience_years}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Experience 
                        <span className="cal_black">(in Months)</span>
                      </label>
                      <input
                        className="form-control"
                        name="experience_months"
                        onChange={inputEvent}
                        placeholder="experience_months"
                        value={viewData?.experience_months}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Other Industry<span className="cal_black">(max 500 characters) </span> 
                      </label>
                      <input
                        className="form-control"
                        name="industry_other"
                        onChange={inputEvent}
                        placeholder="industry_other"
                        value={viewData?.industry_other}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Other Skills
                      </label>
                      <textarea
                        className="form-control"
                        name="skills_other"
                        onChange={inputEvent}
                        placeholder="skills_other"
                        value={viewData?.skills_other}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Linkedin <span className="cal_black">(Optional, max 150 characters) </span> 
                      </label>
                      <input
                        className="form-control"
                        name="linkedin"
                        onChange={inputEvent}
                        placeholder="linkedin"
                        value={viewData?.linkedin}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Upload your CV <span className="cal_black"> (PDF, DOC) - upto 2 MB</span>
                      </label>
                      <input
                        className="form-control"
                        name="file"
                        type="file"
                        placeholder="Alternate Email"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        CV Displayname
                      </label>
                      <input
                        className="form-control"
                        name="cv_displayname"
                        onChange={inputEvent}
                        placeholder="cv_displayname"
                        value={viewData?.cv_displayname}
                      />
                    </div>
                    {/* <!============ Charges & Availability ============> */}
                    <h5 class="card-title">Charges & Availability</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Availability <span className="cal_black">(hrs/week) max 48 hours </span> 
                      </label>
                      <input
                        className="form-control"
                        name="availability"
                        onChange={inputEvent}
                        placeholder="availability"
                        value={viewData?.availability}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Currency
                      </label>
                      <select
                        className="form-control"
                        name="currency_id"
                        onChange={inputEvent}
                        placeholder="currency_id"
                        value={viewData?.currency_id}
                      >
                        <option value="">Choose...</option>
                        {getCurrency?.map((val) => (
                          <option value={val?.id}>{val?.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Consulting rate <span className="cal_black">(upto 5 figures) </span> 
                      </label>
                      <input
                        className="form-control"
                        name="consulting_rate"
                        onChange={inputEvent}
                        placeholder="consulting_rate"
                        value={viewData?.consulting_rate}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Billing rate
                      </label>
                      <input
                        className="form-control"
                        name="billing_rate"
                        onChange={inputEvent}
                        placeholder="billing_rate"
                        value={viewData?.billing_rate}
                      />
                    </div>
                    <div className="col-lg-3 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="open_for_travel"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              open_for_travel: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={viewData?.open_for_travel ? true : false}
                        />
                        <label class="form-check-label">Open for travel</label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="open_for_relocation"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              open_for_relocation: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={viewData?.open_for_relocation ? true : false}
                        />
                        <label class="form-check-label">
                          Open for relocation
                        </label>
                      </div>
                    </div>

                    <div className="col-lg-3 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="prefers_weekdays"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              prefers_weekdays: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={viewData?.prefers_weekdays ? true : false}
                        />
                        <label class="form-check-label">Prefers weekdays</label>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="prefers_weekends"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              prefers_weekends: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={viewData?.prefers_weekends ? true : false}
                        />
                        <label class="form-check-label">Prefers weekends</label>
                      </div>
                    </div>
                    {/* <!================ Genral ==============> */}
                    <h5 class="card-title">Genral</h5>
                    <div className="col-md-12">
                      <label for="inputEmail5" className="form-label">
                        Remarks
                      </label>
                      <textarea
                        className="form-control"
                        name="remarks"
                        onChange={inputEvent}
                        placeholder="remarks"
                        value={viewData?.remarks}
                      />
                    </div>
                    {/* <!=============== Activation Status =============> */}
                    <h5 class="card-title">Activation Status</h5>
                    <div className="col-lg-3 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="is_email_verified"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              is_email_verified: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.is_email_verified === 1 ? true : false
                          }
                        />
                        <label class="form-check-label">
                          Is email verified
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="is_activation_complete"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              is_activation_complete: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.is_activation_complete === 1
                              ? true
                              : false
                          }
                        />
                        <label class="form-check-label">
                          Is activation complete
                        </label>
                      </div>
                    </div>
                    {/* <!============== Show Expert on Home Page ==============> */}
                    <h5 class="card-title">Show Expert on Home Page</h5>
                    <div className="col-lg-6 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="show_on_homepage"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              show_on_homepage: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.show_on_homepage === 1 ? true : false
                          }
                        />
                        <label class="form-check-label">Show on homepage</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Image
                      </label>
                      <input
                        className="form-control"
                        name="image"
                        onChange={inputEvent}
                        placeholder="image"
                        value={viewData?.image}
                      />
                    </div>
                    <div className="col-md-12">
                      <label for="inputEmail5" className="form-label">
                        Home title
                      </label>
                      <input
                        className="form-control"
                        name="home_title"
                        onChange={inputEvent}
                        placeholder="home_title"
                        value={viewData?.home_title}
                      />
                    </div>
                    <div className="col-md-12">
                      <label for="inputEmail5" className="form-label">
                        Home summary
                      </label>
                      <textarea
                        className="form-control"
                        name="home_summary"
                        onChange={inputEvent}
                        placeholder="home_summary"
                        value={viewData?.home_summary}
                      />
                    </div>
                    {/* <!============ System Related ================> */}
                    <h5 class="card-title">System Related</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Member type
                      </label>
                      <select
                        className="form-control"
                        onChange={inputEvent}
                        name="member_type"
                        value={viewData?.member_type}
                      >
                        <option value="">Choose...</option>
                        <option value="1" selected="">
                          Member
                        </option>
                        <option value="2">Project Publisher</option>
                        <option value="3">Both</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Profile status
                      </label>
                      <select
                        className="form-control"
                        onChange={inputEvent}
                        name="profile_status"
                        value={viewData?.profile_status}
                      >
                        <option value="">Choose...</option>
                        <option value="6">Active</option>
                        <option value="8">Black Listed</option>
                        <option value="7">Inactive</option>
                        <option value="5">Pending Change Approval</option>
                        <option value="1" selected="">
                          Pending Profile Completion
                        </option>
                        <option value="2">Pending Verification</option>
                        <option value="4">Rejected</option>
                        <option value="3">Verified</option>
                      </select>
                    </div>
                    <div className="col-lg-4 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="is_industry_expert"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              is_industry_expert: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.is_industry_expert === 1 ? true : false
                          }
                        />
                        <label class="form-check-label">
                          Is industry expert
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="is_functional_expert"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              is_functional_expert: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.is_functional_expert === 1 ? true : false
                          }
                        />
                        <label class="form-check-label">
                          Is functional expert
                        </label>
                      </div>
                    </div>
                    <div className="col-lg-4 col-md-4 label">
                      <div class="form-check">
                        <input
                          class="form-check-input"
                          type="checkbox"
                          name="is_technology_expert"
                          onChange={(e) =>
                            setViewData({
                              ...viewData,
                              is_technology_expert: e.target.checked ? 1 : 0,
                            })
                          }
                          checked={
                            viewData?.is_technology_expert === 1 ? true : false
                          }
                        />
                        <label class="form-check-label">
                          Is technology expert
                        </label>
                      </div>
                    </div>
                    {/* <!============ Reference Related  ===================> */}
                    <h5 class="card-title">Reference Related</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Referral code
                      </label>
                      <input
                        className="form-control"
                        name="referral_code"
                        onChange={inputEvent}
                        placeholder="referral_code"
                        value={viewData?.referral_code}
                      />
                    </div>
                    {/* <!=============== Network Member Job ==============> */}
                    <h5 class="card-title">Network Member Job</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Job
                      </label>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Application Status
                      </label>
                    </div>
                    {/* <!============== Member Expert ===============> */}
                    <h5 class="card-title">Member Expert</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Experties
                      </label>
                      <select
                        className={classNames("form-control", {
                          "is-invalid": errors.expertise_id,
                        })}
                        {...register("expertise_id", {
                          value: viewData?.expertise_id,
                        })}
                        onChange={inputEvent}
                        name="expertise_id"
                        value={viewData?.expertise_id}
                      >
                        <option value="">Choose...</option>
                        {getExpertise?.map((val) => (
                          <option value={val?.expertise_id}>
                            {val?.expertise_name}
                          </option>
                        ))}
                      </select>
                      <small className="invalid-feedback">
                        {errors.expertise_id?.message}
                      </small>
                    </div>
                    {/* <!=============== Member Experience ==============> */}
                    <h5 class="card-title">Member Experience</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Role<span className="cal_black"> (2-100 characters)</span> 
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.role,
                        })}
                        {...register("role", {
                          value: viewData?.role,
                        })}
                        name="role"
                        onChange={inputEvent}
                        placeholder="Role"
                        value={viewData?.role}
                      />
                      <small className="invalid-feedback">
                        {errors.role?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Organization <span className="cal_black">(2-100 characters) </span>
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.organization,
                        })}
                        {...register("organization", {
                          value: viewData?.organization,
                        })}
                        name="organization"
                        onChange={inputEvent}
                        placeholder="Organization"
                        value={viewData?.organization}
                      />
                      <small className="invalid-feedback">
                        {errors.organization?.message}
                      </small>
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Description
                      </label>
                      <input
                        className="form-control"
                        name="description"
                        onChange={inputEvent}
                        placeholder="description"
                        value={viewData?.description}
                      />
                    </div>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Category
                      </label>
                      <select
                        className="form-control"
                        onChange={inputEvent}
                        name="category"
                        // value={viewData?.profile_status}
                      >
                        <option value="">Choose...</option>
                        <option value="1">Education</option>
                        <option value="2" selected="">
                          Experience
                        </option>

                        <option value="3">Certification</option>
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label for="inputEmail5" className="form-label">
                        Start Month
                      </label>

                      <input
                        className="form-control"
                        name="start_month"
                        onChange={inputEvent}
                        placeholder="start_month"
                        value={viewData?.start_month}
                      />
                    </div>
                    <div className="col-md-3">
                      <label for="inputEmail5" className="form-label">
                        Start Year
                      </label>

                      <input
                        className="form-control"
                        name="start_year"
                        onChange={inputEvent}
                        placeholder="start_year"
                        value={viewData?.start_year}
                      />
                    </div>
                    <div className="col-md-3">
                      <label for="inputEmail5" className="form-label">
                        End Month
                      </label>
                      <input
                        className="form-control"
                        name="end_month"
                        onChange={inputEvent}
                        placeholder="end_month"
                        value={viewData?.end_month}
                      />
                    </div>
                    <div className="col-md-3">
                      <label for="inputEmail5" className="form-label">
                        End Year
                      </label>

                      <input
                        className="form-control"
                        name="end_year"
                        onChange={inputEvent}
                        placeholder="end_year"
                        value={viewData?.end_year}
                      />
                    </div>
                    {/* <!==============  Member Industries ====================> */}
                    <h5 class="card-title">Member Industries</h5>
                    <div className="col-md-6">
                      <label for="inputEmail5" className="form-label">
                        Industries<span className="cal_black">(Select industry or enter if not in the list) </span> 
                      </label>
                      <select
                        className="form-control"
                        onChange={inputEvent}
                        name="industry_id"
                        value={viewData?.industry_id}
                        // disabled
                      >
                        <option value="">Choose...</option>
                        {getIndustry?.map((val) => (
                          <option value={val?.industry_id}>
                            {val?.industry_name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="text-center"></div>
                    <div className="modal-footer">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        // data-bs-dismiss={
                        //   renderComponent === true ? "" : "modal"
                        // }
                      >
                        Save changes
                      </button>
                    </div>
                  </form>
                  {/* <!-- End Multi Columns Form --> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AddCandidate;
