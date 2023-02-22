import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { addCandidateValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi from "../../../../Utils/AxiosApi";
const AddCandidate = (props) => {
  const [renderComponent, setRenderComponent] = useState(false);
  const [data, setData] = useState([]);
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
    setData((preValue) => {
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

  const onSubmit = () => {
    const jsondata = {
      first_name_old: data.first_name_old,
      last_name_old: data.last_name_old,
      phone: data.phone,
      email_old: data.email_old,
      password: data.password,
      address: data.address,
      zipcode: data.zipcode,
      linkedin: data.linkedin,
      experience_years: data.experience_years,
      experience_months: data.experience_months,
      profile_summary: data.profile_summary,
      profile_headline: data.profile_headline,
      phone2: data.phone2,
      email2: data.email2,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.post(`/candidates/create`, jsondata);
      const resp = result?.data;
      if (resp.detail === "Successfully Registered") {
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
    <div>
      <div class="pagetitle">
        <section class="section">
          <div class="row">
            <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  {/* <!-- Multi Columns Form --> */}
                  <form class="row g-3 mt-2" onSubmit={handleSubmit(onSubmit)}>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        First Name
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.first_name_old,
                        })}
                        {...register("first_name_old", {
                          value: data?.first_name_old,
                        })}
                        name="first_name_old"
                        onChange={inputEvent}
                        placeholder="First Name"
                        value={data?.first_name_old}
                      />
                      <small className="invalid-feedback">
                        {errors.first_name_old?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Last Name
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.last_name_old,
                        })}
                        {...register("last_name_old", {
                          value: data?.last_name_old,
                        })}
                        name="last_name_old"
                        onChange={inputEvent}
                        placeholder="Last Name"
                        value={data?.last_name_old}
                      />
                      <small className="invalid-feedback">
                        {errors.last_name_old?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Phone
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.phone,
                        })}
                        {...register("phone", {
                          value: data?.phone,
                        })}
                        name="phone"
                        onChange={inputEvent}
                        placeholder="Phone"
                        value={data?.phone}
                      />
                      <small className="invalid-feedback">
                        {errors.phone?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Email
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.email_old,
                        })}
                        {...register("email_old", {
                          value: data?.email_old,
                        })}
                        name="email_old"
                        onChange={inputEvent}
                        placeholder="Email Id"
                        value={data?.email_old}
                      />
                      <small className="invalid-feedback">
                        {errors.email_old?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Password
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.password,
                        })}
                        {...register("password", {
                          value: data?.password,
                        })}
                        name="password"
                        onChange={inputEvent}
                        placeholder="Email Id"
                        value={data?.password}
                      />
                      <small className="invalid-feedback">
                        {errors.password?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Address
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.address,
                        })}
                        {...register("address", {
                          value: data?.address,
                        })}
                        name="address"
                        onChange={inputEvent}
                        placeholder="Address"
                        value={data?.address}
                      />
                      <small className="invalid-feedback">
                        {errors.address?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Zip Code
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.zipcode,
                        })}
                        {...register("zipcode", {
                          value: data?.zipcode,
                        })}
                        name="zipcode"
                        onChange={inputEvent}
                        placeholder="Zip Code"
                        value={data?.zipcode}
                      />
                      <small className="invalid-feedback">
                        {errors.zipcode?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Linkedin
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.linkedin,
                        })}
                        {...register("linkedin", {
                          value: data?.linkedin,
                        })}
                        name="linkedin"
                        onChange={inputEvent}
                        placeholder="Linkedin"
                        value={data?.linkedin}
                      />
                      <small className="invalid-feedback">
                        {errors.linkedin?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Experience Years
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.experience_years,
                        })}
                        {...register("experience_years", {
                          value: data?.experience_years,
                        })}
                        name="experience_years"
                        onChange={inputEvent}
                        placeholder="Experience Years"
                        value={data?.experience_years}
                      />
                      <small className="invalid-feedback">
                        {errors.experience_years?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Experience Months
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.experience_months,
                        })}
                        {...register("experience_months", {
                          value: data?.experience_months,
                        })}
                        name="experience_months"
                        onChange={inputEvent}
                        placeholder="Experience Months"
                        value={data?.experience_months}
                      />
                      <small className="invalid-feedback">
                        {errors.experience_months?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Profile Summary
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.profile_summary,
                        })}
                        {...register("profile_summary", {
                          value: data?.profile_summary,
                        })}
                        name="profile_summary"
                        onChange={inputEvent}
                        placeholder="Profile Summary"
                        value={data?.profile_summary}
                      />
                      <small className="invalid-feedback">
                        {errors.profile_summary?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Profile Headline
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.profile_headline,
                        })}
                        {...register("profile_headline", {
                          value: data?.profile_headline,
                        })}
                        name="profile_headline"
                        onChange={inputEvent}
                        placeholder="profile_headline"
                        value={data?.profile_headline}
                      />
                      <small className="invalid-feedback">
                        {errors.profile_headline?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Alternate Phone
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.phone2,
                        })}
                        {...register("phone2", {
                          value: data?.phone2,
                        })}
                        name="phone2"
                        onChange={inputEvent}
                        placeholder="Alternate Phone"
                        value={data?.phone2}
                      />
                      <small className="invalid-feedback">
                        {errors.phone2?.message}
                      </small>
                    </div>
                    <div class="col-md-6">
                      <label for="inputEmail5" class="form-label">
                        Alternate Email
                      </label>
                      <input
                        className={classNames("form-control", {
                          "is-invalid": errors.email2,
                        })}
                        {...register("email2", {
                          value: data?.email2,
                        })}
                        name="email2"
                        onChange={inputEvent}
                        placeholder="Alternate Email"
                        value={data?.email2}
                      />
                      <small className="invalid-feedback">
                        {errors.email2?.message}
                      </small>
                    </div>

                    <div class="text-center"></div>
                    <div class="modal-footer">
                      <button type="submit" class="btn btn-primary">
                        Save changes
                      </button>

                      <button
                        type="reset"
                        class="btn btn-secondary"
                        onClick={onReset}
                      >
                        Reset
                      </button>
                      <button
                        type="button"
                        class="btn btn-danger"
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
      </div>
    </div>
  );
};

export default AddCandidate;
