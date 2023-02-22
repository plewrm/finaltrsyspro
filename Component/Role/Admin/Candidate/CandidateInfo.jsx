import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import {
  editCandidateProfileDetailsValidation,
  editCandidateProfileSummaryValidation,
  editCandidateExperienceValidation,
  editCandidateEducationValidation,
  editCandidateCertificateValidation,
  editCandidateSkillsValidation,
  editCandidateDocumentsValidation,
  // editCandidateChargesAvailabilityValidation,
} from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import GridLoader from "react-spinners/GridLoader";
import AxiosApi, {
  BaseURL,
  headersCors,
  headers,
} from "../../../../Utils/AxiosApi";
import { useEffect } from "react";
import EditExperience from "./EditExperience";
import UploadDocuments from "./UploadDocuments";
import OverView from "./OverViewCandidate";
import {
  experience_years_array,
  experience_months_array,
  months_array,
  years_array,
  reasonJobChange_array,
  noticePeriod_array,
  document_array,
} from "../../../../Utils/JsonData";
import Multiselect from "multiselect-react-dropdown";
import { useMemo } from "react";
import { memo } from "react";

const CandidateInfo = (props) => {
  const [loading, setLoading] = useState(true);
  const [renderComponent, setRenderComponent] = useState(false);
  const [viewData, setViewData] = useState([]);
  const [getCountry, setGetCountry] = useState([]);
  const [getState, setGetState] = useState(null);
  const [getCity, setGetCity] = useState(null);
  const [getCurrency, setGetCurrency] = useState(null);
  const [getExpertise, setGetExpertise] = useState(null);
  const [getMemberExpertise, setGetMemberExpertise] = useState(null);
  const [getIndustry, setGetIndustry] = useState(null);
  const [getCandidateIndustry, setGetCandidateIndustry] = useState([]);
  const [showEndDate, setShowEndDate] = useState(false);
  const [checked, setChecked] = useState(false);
  const [file, setFile] = useState(null);

  const [selectedValueFunctional, setSeletedValueFunctional] = useState([]);
  const [selectedValueTechnology, setSeletedValueTechnology] = useState([]);

  const {
    register: register_profile,
    handleSubmit: handleSubmit_profile,
    reset: reset_profile,
    formState: { errors: errors_profile },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateProfileDetailsValidation),
  });
  const {
    register: register_summary,
    handleSubmit: handleSubmit_summary,
    reset: reset_summary,
    formState: { errors: errors_summary },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateProfileSummaryValidation),
  });
  const {
    register: register_experience,
    handleSubmit: handleSubmit_experience,
    reset: reset_experience,
    formState: { errors: errors_experience },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateExperienceValidation),
  });
  const {
    register: register_education,
    handleSubmit: handleSubmit_education,
    reset: reset_education,
    formState: { errors: errors_education },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateEducationValidation),
  });
  const {
    register: register_certification,
    handleSubmit: handleSubmit_certification,
    reset: reset_certification,
    formState: { errors: errors_certification },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateCertificateValidation),
  });
  const {
    register: register_skills,
    handleSubmit: handleSubmit_skills,
    reset: reset_skills,
    formState: { errors: errors_skills },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateSkillsValidation),
  });
  const {
    watch,
    register: register_documents,
    handleSubmit: handleSubmit_document,
    reset: reset_documents,
    formState: { errors: errors_documents },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateDocumentsValidation),
  });

  // const {
  //   register: register_charges_availability,
  //   handleSubmit: handleSubmit_charges_availability,
  //   reset: reset_charges_availability,
  //   formState: { errors: errors_charges_availability },
  // } = useForm({
  //   mode: "onTouched",
  //   resolver: yupResolver(editCandidateChargesAvailabilityValidation),
  // });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    // resolver: yupResolver(editCandidateChargesAvailabilityValidation),
  });
  const inputEvent = (event) => {
    const { name, value } = event.target;
    if (name === "country_id") {
      if (event.target.value !== "") {
        async function getState() {
          await AxiosApi.get(
            `state/country/${event.target.value}`,
            headersCors
          ).then((resultState) => {
            async function getState() {
              await AxiosApi.get(
                `city/state/${resultState.data[0]?.id}`,
                headersCors
              ).then((resultCity) => {
                setViewData({
                  ...viewData,
                  country_id: event.target.value,
                  state_id: resultState.data[0]?.id,
                  city_id: resultCity.data[0]?.id,
                });
              });
            }
            getState();
          });
        }
        getState();
      }
    }
    if (name === "state_id") {
      if (event.target.value !== "") {
        async function getState() {
          await AxiosApi.get(
            `city/state/${event.target.value}`,
            headersCors
          ).then((resultCity) =>
            setViewData({
              ...viewData,
              state_id: event.target.value,
              city_id: resultCity.data[0]?.id,
            })
          );
        }
        getState();
      }
    }
    if (name === "category") {
      if (event.target.checked) {
        setViewData({
          ...viewData,
          end_month: 0,
          end_year: 0,
          acceptCategory: true,
        });
      } else {
        setViewData({
          ...viewData,
          end_month: 1,
          end_year: new Date().getFullYear(),
          acceptCategory: false,
        });
      }
    }
    if (name === "open_for_travel_input") {
      if (event.target.checked) {
        setViewData({
          ...viewData,
          open_for_travel: 1,
        });
      } else {
        setViewData({
          ...viewData,
          open_for_travel: 0,
        });
      }
    }
    if (name === "open_for_relocation_input") {
      if (event.target.checked) {
        setViewData({
          ...viewData,
          open_for_relocation: 1,
        });
      } else {
        setViewData({
          ...viewData,
          open_for_relocation: 0,
        });
      }
    }
    if (name === "prefers_weekdays_input") {
      if (event.target.checked) {
        setViewData({
          ...viewData,
          prefers_weekdays: 1,
        });
      } else {
        setViewData({
          ...viewData,
          prefers_weekdays: 0,
        });
      }
    }
    if (name === "prefers_weekends_input") {
      if (event.target.checked) {
        setViewData({
          ...viewData,
          prefers_weekends: 1,
        });
      } else {
        setViewData({
          ...viewData,
          prefers_weekends: 0,
        });
      }
    }

    setViewData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };

  // console.log("file", file);
  useMemo(() => {
    setLoading(true);
    ///// Country
    async function getCountryData() {
      await AxiosApi.get(`country/`, headersCors)
        .then((result) => setGetCountry(result?.data))
        .catch((error) => console.log("Get Country Error", error));
    }
    getCountryData();
    ////// Currency
    async function getCurrencyData() {
      await AxiosApi.get(`currency/`, headersCors)
        .then((result) => setGetCurrency(result?.data))
        .catch((error) => console.log("Get Currency Error", error));
    }
    getCurrencyData();
    ////// Member Expertise

    async function getExpertiesData() {
      await AxiosApi.get(`memberexpertises/`, headersCors)
        .then((resp) => setGetMemberExpertise(resp?.data))
        .catch((error) => console.log("Get Expertises Error", error));
    }
    getExpertiesData();
    ////// Expertise

    async function getExpertiesData() {
      await AxiosApi.get(`allexpertises/`, headersCors)
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
      await AxiosApi.get(`candidates/${props?.id?.id}`, headersCors)
        .then((result) => {
          reset_profile(result?.data[0]);
          setViewData(result?.data[0]);
        })
        .catch((errors) => console.log("Get Candidate Error", errors));
      setLoading(false);
    }

    getViewData();
    // setLoading(false);
  }, [props?.id?.id, renderComponent]);
  /////// Sate
  useMemo(() => {
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

    getState();
  }, [viewData?.country_id]);

  useMemo(() => {
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

  const onSubmit_profile = () => {
    const jsondata = {
      ...viewData,
    };

    async function postData() {
      const result = await AxiosApi.put(
        `/candidates/${props?.id?.id}`,
        jsondata
      );
      if (result?.data?.detail === "Successfully Updated") {
        alert("Successfully Updated");
        props?.reRenderCmponent(true);
      }
    }
    postData();
  };
  const onSubmit_summary = () => {
    const jsondata = {
      ...viewData,
    };
    const jsondata_Industries = {
      industry_id: viewData?.industry_id,
    };

    async function postData() {
      await AxiosApi.put(`/candidates/${props?.id?.id}`, jsondata).then(
        (result) =>
          result?.data?.detail === "Successfully Updated"
            ? (AxiosApi.put(
                `/candidateindustry/${props?.id?.id}`,
                jsondata_Industries
              ),
              alert("Successfully Updated"))
            : alert("Not Updated")
      );
    }
    postData();
  };

  const onSubmit_experience = () => {
    const jsondataExperience = {
      ...viewData,
      category: viewData?.acceptCategory ? 1 : 2,
    };
    async function postData() {
      const result = await AxiosApi.put(
        `/candidates/experience/${props?.id?.id}/${viewData?.experience_id}`,
        jsondataExperience
      );
      const resp = result?.data;
      if (resp?.detail === "Successfully Updated") {
        alert("Successfully Updated");
        props?.reRenderCmponent(true);
      }
    }
    postData();
  };
  const onSubmit_education = () => {
    const jsondataEducation = {};
    async function postData() {
      // const result = await AxiosApi.put(
      //   `/candidates/experience/${props?.id?.id}/${viewData?.experience_id}`,
      //   jsondataExperience
      // );
      // const resp = result?.data;
      // if (resp?.detail === "Successfully Updated") {
      //   alert("updated");
      // }
    }
    postData();
  };
  const onSubmit_certification = () => {
    const jsondataEducation = {};
    async function postData() {
      // const result = await AxiosApi.put(
      //   `/candidates/experience/${props?.id?.id}/${viewData?.experience_id}`,
      //   jsondataExperience
      // );
      // const resp = result?.data;
      // if (resp?.detail === "Successfully Updated") {
      //   alert("updated");
      // }
    }
    postData();
  };
  const onSubmit_charges_availability = () => {
    const jsondata = {
      ...viewData,
    };

    async function postData() {
      await AxiosApi.put(`/candidates/${props?.id?.id}`, jsondata).then(
        (result) =>
          result?.data?.detail === "Successfully Updated"
            ? (alert("Successfully Updated"), props?.reRenderCmponent(true))
            : alert("Not Updated Charges & Availability")
      );
    }
    postData();
  };
  const onSubmit_Skills = () => {
    const jsondataSkill = {
      skills_other: viewData?.skills_other,
    };
    async function postData() {
      const result = await AxiosApi.put(
        `/candidates/candidate/skills/${props?.id?.id}`,
        jsondataSkill
      );
      if (result?.data === "updated") {
        alert("Successfully Updated");
        props?.reRenderCmponent(true);
      }
    }
    postData();
  };
  const onSelect_Functional = (selectedList, selectedItem) => {
    setSeletedValueFunctional(selectedList);
  };
  const onRemove_Functional = (selectedList, selectedItem) => {
    setSeletedValueFunctional(selectedList);
  };
  const onSelect_Technology = (selectedList, selectedItem) => {
    setSeletedValueTechnology(selectedList);
  };
  const onRemove_Technology = (selectedList, selectedItem) => {
    setSeletedValueTechnology(selectedList);
  };
  const handleFileChange = (event) => {
    event.preventDefault();
    // console.log(event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const onSubmit_documents = () => {
    async function postData() {
      // event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);

      // await AxiosApi.put(`/documents/${props?.id?.id}/${viewData?.file_type}`, "", {
      //   formData,
      // });
      fetch(`${BaseURL}/documents/${props?.id?.id}/${viewData?.file_type}`, {
        method: "PUT",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          alert("Successfully Updated");
          props?.reRenderCmponent(true);
        });
    }
    postData();
  };
  return loading ? (
    <div className="textcnt">
      <GridLoader color={"#5062F2"} loading={loading} size={10} />
    </div>
  ) : (
    <>
      <div className="pagetitle">
        <section className="section profile">
          <div className="row">
            <div class="col-xl-12 mt-2">
              <div class="card">
                <div class="card-body ">
                  {/* <!-- Vertical Pills Tabs --> */}
                  <div class="d-flex align-items-start ">
                    <div
                      class="nav flex-column nav-pills me-3"
                      id="v-pills-tab"
                      role="tablist"
                      aria-orientation="vertical"
                    >
                      <button
                        class="nav-link mt-2 active"
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#overview"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Overview
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#personaldetails"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Personal Details
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#profileSummary"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Profile Summary
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#experience"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Experience
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#education"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Education
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#certification"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Certification
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#skills"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Skills
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#chargeAvailability"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Charges & Availability
                      </button>
                      <button
                        class="nav-link mt-2 "
                        id="v-pills-home-tab"
                        data-bs-toggle="pill"
                        data-bs-target="#document"
                        type="button"
                        role="tab"
                        aria-controls="v-pills-home"
                        aria-selected="true"
                      >
                        Documents
                      </button>
                    </div>
                    <div
                      class="tab-content"
                      id="v-pills-tabContent"
                      style={{
                        maxHeight: "60vh",
                        overflowY: "scroll",
                        overflowX: "hidden",
                      }}
                    >
                      <div
                        class="tab-pane profile-overview fade show active"
                        id="overview"
                        role="tabpanel"
                        aria-labelledby="v-pills-home-tab"
                      >
                        <OverView viewData={viewData} />
                      </div>
                      <div
                        class="tab-pane profile-edit profile-overview fade"
                        id="personaldetails"
                        role="tabpanel"
                        aria-labelledby="v-pills-profile-tab"
                      >
                        <div class="card-header fw-bold">Personal Details</div>
                        <div class="card-header-sub-title">
                          Some information about yourself, fields with * marked
                          are mandatory
                        </div>
                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_profile(onSubmit_profile)}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
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
                                "is-invalid": errors_profile.first_name_old,
                              })}
                              {...register_profile("first_name_old", {
                                value: viewData?.first_name_old,
                              })}
                              name="first_name_old"
                              onChange={inputEvent}
                              placeholder="First Name"
                              value={viewData?.first_name_old}
                            />
                            <small className="invalid-feedback">
                              {errors_profile.first_name_old?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Last Name<span className="astrik">*</span><span className="cal_black">(max 100 characters)</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_profile.last_name_old,
                              })}
                              {...register_profile("last_name_old", {
                                value: viewData?.last_name_old,
                              })}
                              name="last_name_old"
                              onChange={inputEvent}
                              placeholder="Last Name"
                              value={viewData?.last_name_old}
                            />
                            <small className="invalid-feedback">
                              {errors_profile.last_name_old?.message}
                            </small>
                          </div>

                          {/* <================  Contact Details ==============>  */}
                          {/* <h5 class="card-title">Contact Details</h5> */}
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Email
                            </label>
                            <input
                              className="form-control"
                              value={viewData?.email_old}
                              disabled
                            />
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Phone
                            </label>
                            <input
                              className="form-control"
                              value={`+${viewData?.primary_phone_country_id} - ${viewData?.phone}`}
                              disabled
                            />
                          </div>

                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Alternet Email<span className="cal_black"> (Optional)</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_profile.email2,
                              })}
                              {...register_profile("email2", {
                                value: viewData?.email2,
                              })}
                              name="email2"
                              onChange={inputEvent}
                              placeholder="email2"
                              value={viewData?.email2}
                            />
                            <small className="invalid-feedback">
                              {errors_profile.email2?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Alternate phone country
                            </label>
                            <select
                              className="form-control"
                              name="alternate_phone_country_id"
                              onChange={inputEvent}
                              placeholder="alternate_phone_country_id"
                              value={viewData?.alternate_phone_country_id}
                            >
                              {getCountry?.map((val) => (
                                <option value={val?.calling_code}>
                                  +{val?.calling_code}
                                </option>
                              ))}
                            </select>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Alternate Phone<span className="cal_black"> (Optional)</span>
                            </label>
                            <input
                              className="form-control"
                              name="phone2"
                              onChange={inputEvent}
                              placeholder="phone2"
                              value={viewData?.phone2}
                            />
                          </div>
                          {/* <================  Postal Address ==============>  */}
                          {/* <h5 class="card-title">Postal Address</h5> */}

                          <div className="col-md-8">
                            <label for="inputEmail5" className="form-label">
                              Address<span className="cal_black">(Optional, max 2000 characters) </span>
                            </label>
                            <textarea
                              className="form-control"
                              name="address"
                              onChange={inputEvent}
                              placeholder="address"
                              value={viewData?.address}
                            />
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Zip Code<span className="cal_black">(Optional, max 20 characters) </span>
                            </label>
                            <input
                              className="form-control"
                              name="zipcode"
                              onChange={inputEvent}
                              placeholder="zipcode"
                              value={viewData?.zipcode}
                            />
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Country<span className="astrik">*</span>
                            </label>
                            <select
                              className={classNames("form-control", {
                                "is-invalid": errors_profile.country_id,
                              })}
                              {...register_profile("country_id", {
                                value: viewData?.country_id,
                              })}
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
                            <small className="invalid-feedback">
                              {errors_profile.country_id?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              State<span className="astrik">*</span>
                            </label>
                            <select
                              className={classNames("form-control", {
                                "is-invalid": errors_profile.state_id,
                              })}
                              {...register_profile("state_id", {
                                value: viewData?.state_id,
                              })}
                              name="state_id"
                              onChange={inputEvent}
                              placeholder="state_id"
                              value={viewData?.state_id}
                            >
                              {getState?.map((val) => (
                                <option value={val?.id}>{val?.name}</option>
                              ))}
                            </select>
                            <small className="invalid-feedback">
                              {viewData.state_id === ""
                                ? errors_profile.state_id?.message
                                : ""}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              City<span className="astrik">*</span>
                            </label>
                            <select
                              className={classNames("form-control", {
                                "is-invalid": errors_profile.city_id,
                              })}
                              {...register_profile("city_id", {
                                value: viewData?.city_id,
                              })}
                              name="city_id"
                              onChange={inputEvent}
                              placeholder="city_id"
                              value={viewData?.city_id}
                            >
                              {getCity?.map((val) => (
                                <option value={val?.id}>{val?.name}</option>
                              ))}
                            </select>
                            <small className="invalid-feedback">
                              {errors_profile.city_id?.message}
                            </small>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Profile Details
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit  fade"
                        id="profileSummary"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Personal Summary</div>
                        <div class="card-header-sub-title">
                          Provide a small summary that will be shared with the
                          clients, fields with * marked are mandatory
                        </div>
                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_summary(onSubmit_summary)}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Profile Heading<span className="astrik">*</span><span className="cal_black">(20 - 150 characters) </span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_summary.profile_headline,
                              })}
                              {...register_summary("profile_headline", {
                                value: viewData?.profile_headline,
                              })}
                              name="profile_headline"
                              onChange={inputEvent}
                              placeholder="profile_headline"
                              value={viewData?.profile_headline}
                            />
                            <small className="invalid-feedback">
                              {errors_summary.profile_headline?.message}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Experience<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <select
                                    className={classNames("form-control", {
                                      "is-invalid":
                                        errors_summary.experience_years,
                                    })}
                                    {...register_summary("experience_years", {
                                      value: viewData?.experience_years,
                                    })}
                                    name="experience_years"
                                    onChange={inputEvent}
                                    placeholder="experience_years"
                                    value={viewData?.experience_years}
                                  >
                                    {experience_years_array.map((data) => (
                                      <option value={data?.value}>
                                        {data?.name}
                                      </option>
                                    ))}
                                  </select>
                                  <small className="invalid-feedback">
                                    {errors_summary.experience_years?.message}
                                  </small>
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Years
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <select
                                    className={classNames("form-control", {
                                      "is-invalid":
                                        errors_summary.experience_months,
                                    })}
                                    {...register_summary("experience_months", {
                                      value: viewData?.experience_months,
                                    })}
                                    name="experience_months"
                                    onChange={inputEvent}
                                    placeholder="experience_months"
                                    value={viewData?.experience_months}
                                  >
                                    {experience_months_array.map((data) => (
                                      <option value={data?.value}>
                                        {data?.name}
                                      </option>
                                    ))}
                                  </select>
                                  <small className="invalid-feedback">
                                    {errors_summary.experience_months?.message}
                                  </small>
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Months
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Industry<span className="astrik">*</span><span className="cal_black">(Select industry) </span>
                            </label>
                            <select
                              className={classNames("form-control", {
                                "is-invalid": errors_summary.industry_id,
                              })}
                              {...register_summary("industry_id", {
                                value: viewData?.industry_id,
                              })}
                              onChange={inputEvent}
                              name="industry_id"
                              value={viewData?.industry_id}
                              // disabled
                            >
                              <option value="">Choose...</option>
                              {getIndustry?.map((val) => (
                                <option value={val?.id}>{val?.name}</option>
                              ))}
                            </select>
                            <small className="invalid-feedback">
                              {errors_summary.industry_id?.message}
                            </small>
                          </div>
                          <div className="col-md-8">
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
                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Profile Summary<span className="astrik">*</span><span className="cal_black"> (100 - 2000 characters)</span>
                            </label>
                            <textarea
                              className={classNames("form-control", {
                                "is-invalid": errors_summary.profile_summary,
                              })}
                              {...register_summary("profile_summary", {
                                value: viewData?.profile_summary,
                              })}
                              name="profile_summary"
                              onChange={inputEvent}
                              placeholder="profile_summary"
                              value={viewData?.profile_summary}
                            />
                            <small className="invalid-feedback">
                              {errors_summary.profile_summary?.message}
                            </small>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Profile Summary
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="experience"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Experience</div>

                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_experience(
                            onSubmit_experience
                          )}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Role<span className="astrik">*</span> <span className="cal_black">(2-100 characters) </span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_experience.role,
                              })}
                              {...register_experience("role", {
                                value: viewData?.role,
                              })}
                              name="role"
                              onChange={inputEvent}
                              placeholder="Role"
                              value={viewData?.role}
                            />
                            <small className="invalid-feedback">
                              {errors_experience.role?.message}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Organization<span className="astrik">*</span> <span className="cal_black">(2-100 characters) </span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_experience.organization,
                              })}
                              {...register_experience("organization", {
                                value: viewData?.organization,
                              })}
                              name="organization"
                              onChange={inputEvent}
                              placeholder="Organization"
                              value={viewData?.organization}
                            />
                            <small className="invalid-feedback">
                              {errors_experience.organization?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check form-switch">
                              <input
                                {...register_experience("category")}
                                name="category"
                                type="checkbox"
                                className="form-check-input"
                                onChange={inputEvent}
                                // className="form-check-input"
                                //checked={getValues.acceptTerm}
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheckDefault"
                              >
                                I am currently working in this role
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Start Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid": errors_experience.start_month,
                                  })}
                                  {...register_experience("start_month", {
                                    value: viewData?.start_month,
                                  })}
                                  name="start_month"
                                  onChange={inputEvent}
                                  placeholder="start_month"
                                  value={viewData?.start_month}
                                >
                                  <option value="">Choose...</option>
                                  {months_array.map((data) => (
                                    <option value={data?.value}>
                                      {data?.name}
                                    </option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_experience.start_month?.message}
                                </small>
                              </div>
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid": errors_experience.start_year,
                                  })}
                                  {...register_experience("start_year", {
                                    value: viewData?.start_year,
                                  })}
                                  name="start_year"
                                  onChange={inputEvent}
                                  placeholder="start_year"
                                  value={viewData?.start_year}
                                >
                                  <option value="">Choose...</option>
                                  {years_array.map((data) => (
                                    <option value={data}>{data}</option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_experience.start_year?.message}
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              End Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              {!viewData?.acceptCategory ? (
                                <>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors_experience.end_month,
                                      })}
                                      {...register_experience("end_month", {
                                        value: viewData?.end_month,
                                      })}
                                      name="end_month"
                                      onChange={inputEvent}
                                      placeholder="end_month"
                                      value={viewData?.end_month}
                                    >
                                      <option value="">Choose...</option>
                                      {months_array.map((data) => (
                                        <option value={data?.value}>
                                          {data?.name}
                                        </option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {errors_experience.end_month?.message}
                                    </small>
                                  </div>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors_experience.end_year,
                                      })}
                                      {...register_experience("end_year", {
                                        value: viewData?.end_year,
                                      })}
                                      name="end_year"
                                      onChange={inputEvent}
                                      placeholder="end_year"
                                      value={viewData?.end_year}
                                    >
                                      <option value="">Choose...</option>
                                      {years_array.map((data) => (
                                        <option value={data}>{data}</option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {errors_experience.end_year?.message}
                                    </small>
                                  </div>
                                </>
                              ) : (
                                <div className="col-md-6">
                                  <span className="astrik">*</span>Present
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Details <span className="cal_black"> (2-100 characters)</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="description"
                              onChange={inputEvent}
                              placeholder="Details"
                              value={viewData?.description}
                            />
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Experience
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="education"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Education</div>

                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_education(onSubmit_education)}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Degree/Major<span className="astrik">*</span><span className="cal_black">(2-100 characters)</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_education.degree,
                              })}
                              {...register_education("degree", {
                                value: viewData?.degree,
                              })}
                              name="degree"
                              onChange={inputEvent}
                              placeholder="degree"
                              value={viewData?.degree}
                            />
                            <small className="invalid-feedback">
                              {errors_education.degree?.message}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              College/University/Institution<span className="cal_black">(2-100 characters)</span>
                              <span className="astrik">*</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_education.institute,
                              })}
                              {...register_education("institute", {
                                value: viewData?.institute,
                              })}
                              name="institute"
                              onChange={inputEvent}
                              placeholder="institute"
                              value={viewData?.institute}
                            />
                            <small className="invalid-feedback">
                              {errors_education.institute?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check form-switch">
                              <input
                                {...register_education("category1")}
                                name="category1"
                                type="checkbox"
                                className="form-check-input"
                                onChange={inputEvent}
                                // className="form-check-input"
                                //checked={getValues.acceptTerm}
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheckDefault"
                              >
                                I am currently enrolled
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Start Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid": errors_education.start_month,
                                  })}
                                  {...register_education("start_month", {
                                    value: viewData?.start_month,
                                  })}
                                  name="start_month"
                                  onChange={inputEvent}
                                  placeholder="start_month"
                                  value={viewData?.start_month}
                                >
                                  <option value="">Choose...</option>
                                  {months_array.map((data) => (
                                    <option value={data?.value}>
                                      {data?.name}
                                    </option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_education.start_month?.message}
                                </small>
                              </div>
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid": errors_education.start_year,
                                  })}
                                  {...register_education("start_year", {
                                    value: viewData?.start_year,
                                  })}
                                  name="start_year"
                                  onChange={inputEvent}
                                  placeholder="start_year"
                                  value={viewData?.start_year}
                                >
                                  <option value="">Choose...</option>
                                  {years_array.map((data) => (
                                    <option value={data}>{data}</option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_education.start_year?.message}
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              End Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              {!viewData?.acceptCategory ? (
                                <>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors_education.end_month,
                                      })}
                                      {...register_education("end_month", {
                                        value: viewData?.end_month,
                                      })}
                                      name="end_month"
                                      onChange={inputEvent}
                                      placeholder="end_month"
                                      value={viewData?.end_month}
                                    >
                                      <option value="">Choose...</option>
                                      {months_array.map((data) => (
                                        <option value={data?.value}>
                                          {data?.name}
                                        </option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {errors_education.end_month?.message}
                                    </small>
                                  </div>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid": errors_education.end_year,
                                      })}
                                      {...register_education("end_year", {
                                        value: viewData?.end_year,
                                      })}
                                      name="end_year"
                                      onChange={inputEvent}
                                      placeholder="end_year"
                                      value={viewData?.end_year}
                                    >
                                      <option value="">Choose...</option>
                                      {years_array.map((data) => (
                                        <option value={data}>{data}</option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {errors_education.end_year?.message}
                                    </small>
                                  </div>
                                </>
                              ) : (
                                <div className="col-md-6">
                                  <span className="astrik">*</span>Currently
                                  Enrolled
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Details<span className="cal_black">(max 2000 characters)</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="description"
                              onChange={inputEvent}
                              placeholder="Details"
                              value={viewData?.description}
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Education
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="certification"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Certification</div>

                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_certification(
                            onSubmit_certification
                          )}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Certification <span className="astrik">*</span><span className="cal_black"> (2-200 characters)</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_certification.degree,
                              })}
                              {...register_certification("degree", {
                                value: viewData?.degree,
                              })}
                              name="degree"
                              onChange={inputEvent}
                              placeholder="degree"
                              value={viewData?.degree}
                            />
                            <small className="invalid-feedback">
                              {errors_certification.degree?.message}
                            </small>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Issuing Authority <span className="cal_black">(2-100 characters)</span>
                              <span className="astrik">*</span>
                            </label>
                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors_certification.institute,
                              })}
                              {...register_certification("institute", {
                                value: viewData?.institute,
                              })}
                              name="institute"
                              onChange={inputEvent}
                              placeholder="institute"
                              value={viewData?.institute}
                            />
                            <small className="invalid-feedback">
                              {errors_certification.institute?.message}
                            </small>
                          </div>
                          <div className="col-md-4">
                            <div class="form-check form-switch">
                              <input
                                {...register_certification("category2")}
                                name="category2"
                                type="checkbox"
                                className="form-check-input"
                                onChange={inputEvent}
                                // className="form-check-input"
                                //checked={getValues.acceptTerm}
                              />
                              <label
                                class="form-check-label"
                                for="flexSwitchCheckDefault"
                              >
                                This certificate does not expire
                              </label>
                            </div>
                          </div>
                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Issue Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid":
                                      errors_certification.issue_month,
                                  })}
                                  {...register_certification("issue_month", {
                                    value: viewData?.issue_month,
                                  })}
                                  name="issue_month"
                                  onChange={inputEvent}
                                  placeholder="issue_month"
                                  value={viewData?.issue_month}
                                >
                                  <option value="">Choose...</option>
                                  {months_array.map((data) => (
                                    <option value={data?.value}>
                                      {data?.name}
                                    </option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_certification.issue_month?.message}
                                </small>
                              </div>
                              <div className="col-md-6">
                                <select
                                  className={classNames("form-control", {
                                    "is-invalid":
                                      errors_certification.issue_year,
                                  })}
                                  {...register_certification("issue_year", {
                                    value: viewData?.issue_year,
                                  })}
                                  name="issue_year"
                                  onChange={inputEvent}
                                  placeholder="issue_year"
                                  value={viewData?.issue_year}
                                >
                                  <option value="">Choose...</option>
                                  {years_array.map((data) => (
                                    <option value={data}>{data}</option>
                                  ))}
                                </select>
                                <small className="invalid-feedback">
                                  {errors_certification.issue_year?.message}
                                </small>
                              </div>
                            </div>
                          </div>

                          <div className="col-md-4">
                            <label for="inputEmail5" className="form-label">
                              Expiration Date<span className="astrik">*</span>
                            </label>
                            <div className="row">
                              {!viewData?.acceptCategory ? (
                                <>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors_certification.expiration_month,
                                      })}
                                      {...register_certification(
                                        "expiration_month",
                                        {
                                          value: viewData?.expiration_month,
                                        }
                                      )}
                                      name="expiration_month"
                                      onChange={inputEvent}
                                      placeholder="expiration_month"
                                      value={viewData?.expiration_month}
                                    >
                                      <option value="">Choose...</option>
                                      {months_array.map((data) => (
                                        <option value={data?.value}>
                                          {data?.name}
                                        </option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {
                                        errors_certification.expiration_month
                                          ?.message
                                      }
                                    </small>
                                  </div>
                                  <div className="col-md-6">
                                    <select
                                      className={classNames("form-control", {
                                        "is-invalid":
                                          errors_certification.expiration_year,
                                      })}
                                      {...register_certification(
                                        "expiration_year",
                                        {
                                          value: viewData?.expiration_year,
                                        }
                                      )}
                                      name="expiration_year"
                                      onChange={inputEvent}
                                      placeholder="expiration_year"
                                      value={viewData?.expiration_year}
                                    >
                                      <option value="">Choose...</option>
                                      {years_array.map((data) => (
                                        <option value={data}>{data}</option>
                                      ))}
                                    </select>
                                    <small className="invalid-feedback">
                                      {
                                        errors_certification.expiration_year
                                          ?.message
                                      }
                                    </small>
                                  </div>
                                </>
                              ) : (
                                <div className="col-md-6">
                                  <span className="astrik">*</span>No Expiry
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Details<span className="cal_black">(max 2000 characters)</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="description"
                              onChange={inputEvent}
                              placeholder="Details"
                              value={viewData?.description}
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Certification
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="skills"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Skills</div>

                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit(onSubmit_Skills)}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Functional <span className="cal_black">(select functionality)</span>
                            </label>
                            <Multiselect
                              options={getExpertise.filter(
                                (val) => val.category_id === 1
                              )} // Options to display in the dropdown
                              selectedValues={selectedValueTechnology} // Preselected value to persist in dropdown
                              onSelect={onSelect_Functional} // Function will trigger on select event
                              onRemove={onRemove_Functional} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                              showCheckbox={true}
                            />
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Technology <span className="cal_black">(select technology)</span>
                            </label>

                            <Multiselect
                              options={getExpertise.filter(
                                (val) => val.category_id === 2
                              )} // Options to display in the dropdown
                              selectedValues={selectedValueTechnology} // Preselected value to persist in dropdown
                              onSelect={onSelect_Technology} // Function will trigger on select event
                              onRemove={onRemove_Technology} // Function will trigger on remove event
                              displayValue="name" // Property name to display in the dropdown options
                              showCheckbox={true}
                            />
                          </div>
                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Other Skills <span className="cal_black">(max 500 characters)</span>
                            </label>
                            <textarea
                              className="form-control"
                              name="skills_other"
                              onChange={inputEvent}
                              placeholder="Details"
                              value={viewData?.skills_other}
                            />
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Skills
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="chargeAvailability"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">
                          Charges & Availability
                        </div>
                        <div class="card-header-sub-title">
                          Tell about your expected compensation and charges
                        </div>
                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit(onSubmit_charges_availability)}
                        >
                          {/* <h5 class="card-title">Personal Details</h5> */}

                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Availability <span className="cal_black">(max 48 hours)</span>
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="availability"
                                    onChange={inputEvent}
                                    placeholder="availability"
                                    value={viewData?.availability}
                                    min="0"
                                  />
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Hours per week
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mt-2">
                                  <div class="form-check form-switch">
                                    <input
                                      name="prefers_weekdays_input"
                                      type="checkbox"
                                      className="form-check-input"
                                      onChange={inputEvent}
                                      checked={
                                        viewData?.prefers_weekdays
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexSwitchCheckDefault"
                                    >
                                      Weekdays
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mt-2">
                                  <div class="form-check form-switch">
                                    <input
                                      name="prefers_weekends_input"
                                      type="checkbox"
                                      className="form-check-input"
                                      onChange={inputEvent}
                                      checked={
                                        viewData?.prefers_weekends
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexSwitchCheckDefault"
                                    >
                                      Weekend
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Consulting Rate <span className="cal_black">(upto 5 figures)</span>
                            </label>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="input-group mb-3">
                                  <select
                                    className="form-control"
                                    name="currency_id"
                                    onChange={inputEvent}
                                    placeholder="currency_id"
                                    value={viewData?.currency_id}
                                  >
                                    {getCurrency?.map((val) => (
                                      <option
                                        value={val?.id}
                                        selected={val[0]?.id}
                                      >
                                        {val?.currency_code} ({val.name})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="consulting_rate"
                                    onChange={inputEvent}
                                    placeholder="consulting_rate"
                                    value={viewData?.consulting_rate}
                                    min="0"
                                  />
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Per hour
                                  </span>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mt-2">
                                  <div class="form-check form-switch">
                                    <input
                                      name="open_for_travel_input"
                                      type="checkbox"
                                      className="form-check-input"
                                      onChange={inputEvent}
                                      checked={
                                        viewData?.open_for_travel ? true : false
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexSwitchCheckDefault"
                                    >
                                      Open for travel
                                    </label>
                                  </div>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mt-2">
                                  <div class="form-check form-switch">
                                    <input
                                      name="open_for_relocation_input"
                                      type="checkbox"
                                      className="form-check-input"
                                      onChange={inputEvent}
                                      checked={
                                        viewData?.open_for_relocation
                                          ? true
                                          : false
                                      }
                                    />
                                    <label
                                      class="form-check-label"
                                      for="flexSwitchCheckDefault"
                                    >
                                      Open for relocation
                                    </label>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Current CTC <span className="cal_black"> (upto 9 figures)</span> 
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <select
                                    className="form-control"
                                    name="current_ctc_currency_id"
                                    onChange={inputEvent}
                                    placeholder="current_ctc_currency_id"
                                    value={viewData?.current_ctc_currency_id}
                                  >
                                    {getCurrency?.map((val) => (
                                      <option
                                        value={val?.id}
                                        selected={val[0]?.id}
                                      >
                                        {val?.currency_code} ({val.name})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="current_ctc"
                                    onChange={inputEvent}
                                    placeholder="current_ctc"
                                    value={
                                      viewData?.current_ctc === null
                                        ? 0
                                        : viewData?.current_ctc
                                    }
                                    min="0"
                                  />
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Per annum
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-6">
                            <label for="inputEmail5" className="form-label">
                              Expected CTC <span className="cal_black"> (upto 9 figures)</span> 
                            </label>
                            <div className="row">
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <select
                                    className="form-control"
                                    name="expected_ctc_currency_id"
                                    onChange={inputEvent}
                                    placeholder="expected_ctc_currency_id"
                                    value={viewData?.expected_ctc_currency_id}
                                  >
                                    {getCurrency?.map((val) => (
                                      <option
                                        value={val?.id}
                                        selected={val[0]?.id}
                                      >
                                        {val?.currency_code} ({val.name})
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-6">
                                <div class="input-group mb-3">
                                  <input
                                    type="number"
                                    className="form-control"
                                    name="expected_ctc"
                                    onChange={inputEvent}
                                    placeholder="expected_ctc"
                                    value={
                                      viewData?.expected_ctc === null
                                        ? 0
                                        : viewData?.expected_ctc
                                    }
                                    min="0"
                                  />
                                  <span
                                    class="input-group-text"
                                    id="basic-addon2"
                                  >
                                    Per annum
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Reason for Change & Notice Period
                            </label>
                            <div className="row">
                              <div className="col-md-3">
                                <div class="input-group mb-3">
                                  <select
                                    className="form-control"
                                    name="job_change_reason_id"
                                    onChange={inputEvent}
                                    placeholder="job_change_reason_id"
                                    value={viewData?.job_change_reason_id}
                                  >
                                    {reasonJobChange_array?.map((val) => (
                                      <option
                                        value={val?.value}
                                        selected={val[0]?.value}
                                      >
                                        {val?.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                              <div className="col-md-3">
                                <div class="input-group mb-3">
                                  <select
                                    className="form-control"
                                    name="notice_period"
                                    onChange={inputEvent}
                                    placeholder="notice_period"
                                    value={viewData?.notice_period}
                                  >
                                    {noticePeriod_array?.map((val) => (
                                      <option
                                        value={val?.value}
                                        selected={val[2]?.value}
                                      >
                                        {val?.name}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Save Charges & Availability
                            </button>
                          </div>
                        </form>
                      </div>
                      <div
                        class="tab-pane profile-edit fade"
                        id="document"
                        role="tabpanel"
                        aria-labelledby="v-pills-messages-tab"
                      >
                        <div class="card-header fw-bold">Documents yogen</div>

                        <form
                          className="row g-3 mt-2"
                          style={{ marginLeft: "2px" }}
                          onSubmit={handleSubmit_document(onSubmit_documents)}
                        >
                          <div className="col-md-12">
                            <label for="inputEmail5" className="form-label">
                              Upload Document
                            </label>
                            <div className="row">
                              {viewData.cv_displayname === "" ? (
                                <>
                                  <div className="col-md-3">
                                    <div class="input-group mb-3">
                                      <select
                                        className={classNames("form-control", {
                                          "is-invalid":
                                            errors_documents.file_type,
                                        })}
                                        {...register_documents("file_type", {
                                          value: viewData?.file_type,
                                        })}
                                        name="file_type"
                                        onChange={inputEvent}
                                        placeholder="file_type"
                                        value={viewData?.file_type}
                                      >
                                        <option value="">Choose...</option>
                                        {document_array.map((data) => (
                                          <option value={data?.value}>
                                            {data?.name}
                                          </option>
                                        ))}
                                      </select>
                                      <small className="invalid-feedback">
                                        {errors_documents.file_type?.message}
                                      </small>
                                    </div>
                                  </div>
                                  <div className="col-md-4">
                                    <div class="input-group mb-3">
                                      <input
                                        className={classNames("form-control", {
                                          "is-invalid": errors_documents.file,
                                        })}
                                        {...register_documents("file", {
                                          value: viewData?.file,
                                        })}
                                        name="file"
                                        type="file"
                                        placeholder="Alternate Email"
                                        onChange={handleFileChange}
                                      />
                                      <small className="invalid-feedback">
                                        {errors_documents.file?.message}
                                      </small>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="col-md-9">
                                    <div class="input-group mb-3">
                                      <a
                                        type="button"
                                        class="btn btn-outline-primary"
                                        href={`${BaseURL}/documents/download/media/documents/candidate/cv/${viewData.cv_displayname}/`}
                                      >
                                        <i class="bi bi-download me-2"></i>
                                        {viewData?.cv_displayname}
                                      </a>
                                      <button
                                        type="button"
                                        class="btn btn-outline-danger"
                                        onClick={() => {
                                          setViewData({
                                            ...viewData,
                                            cv_displayname: "",
                                          });
                                        }}
                                      >
                                        <i class="bi bi-trash"></i> change
                                      </button>
                                    </div>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                          <div className="text-center">
                            <button
                              type="submit"
                              className="btn btn-success mt-2"
                            >
                              Upload Document
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                  {/* <!-- End Vertical Pills Tabs --> */}
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
        </section>
      </div>
    </>
  );
};

export default memo(CandidateInfo);
