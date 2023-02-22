import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import AxiosApi from "../Utils/AxiosApi";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { signupValidation } from "../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
const Signup = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(signupValidation),
  });
  const [data, setData] = useState([]);

  const inputEvent = (event) => {
    const { name, value } = event.target;
    setData((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  const onSubmitButton = () => {
    const jsondata = {
      salutation: data.saluation,
      first_name_old: data.firstName,
      last_name_old: data.lastName,
      phone: data.phone,
      password: data.password,
      email_old: data.email,
      profile_status: 0,
      is_email_verified: 0,
    };
    async function postData() {
      const result = await AxiosApi.post("candidates", jsondata);
      const resp = result.data;
      if (resp.detail === "Successfully registered") {
        alert(resp.detail);
        navigate("/login");
      } else {
        alert("Invalid Credentials");
      }
    }
    postData();
  };
  return (
    <main>
      <div class="container">
        <section class="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div class="container">
            <div class="row justify-content-center">
              <div class="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div class="d-flex justify-content-center py-4">
                  <a
                    href="index.html"
                    class="logo d-flex align-items-center w-auto"
                  >
                    <img src="assets/img/logo.png" alt="" />
                    <span class="d-none d-lg-block">ATS</span>
                  </a>
                </div>

                <div class="card mb-4">
                  <div class="card-body">
                    <div class="pt-4 pb-2">
                      <h5 class="card-title text-center pb-0 fs-4">
                        Create an Account
                      </h5>
                      <p class="text-center small">
                        Enter your personal details to create account
                      </p>
                    </div>

                    <form
                      class="row g-3 needs-validation"
                      onSubmit={handleSubmit(onSubmitButton)}
                      novalidate
                    >
                      <div class="col-md-12">
                        <label for="inputState" class="form-label">
                          Saluation
                        </label>
                        <select
                          className={classNames("form-control", {
                            "is-invalid": errors.saluation,
                          })}
                          {...register("saluation", {
                            value: data.saluation,
                          })}
                          onChange={inputEvent}
                          name="saluation"
                          value={data.saluation}
                        >
                          <option value="">Choose...</option>
                          <option value="1">Mr.</option>
                          <option value="2">Mrs.</option>
                          <option value="3">Ms.</option>
                          <option value="4">Dr.</option>
                          <option value="5">Prfo</option>
                        </select>
                        <small className="invalid-feedback">
                          {errors.saluation?.message}
                        </small>
                      </div>
                      <div class="col-12">
                        <label for="yourName" class="form-label">
                          First Name
                        </label>
                        <input
                          className={classNames("form-control", {
                            "is-invalid": errors.firstName,
                          })}
                          {...register("firstName", {
                            value: data.firstName,
                          })}
                          name="firstName"
                          onChange={inputEvent}
                          placeholder="First Name"
                          value={data.firstName}
                          // autoSave
                        />
                        <small className="invalid-feedback">
                          {errors.firstName?.message}
                        </small>
                      </div>
                      <div class="col-12">
                        <label for="yourName" class="form-label">
                          Last Name
                        </label>
                        <input
                          className={classNames("form-control", {
                            "is-invalid": errors.lastName,
                          })}
                          {...register("lastName", {
                            value: data.lastName,
                          })}
                          name="lastName"
                          onChange={inputEvent}
                          placeholder="Last Name"
                          value={data.lastName}
                          // autoSave
                        />
                        <small className="invalid-feedback">
                          {errors.lastName?.message}
                        </small>
                      </div>
                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Phone No
                        </label>
                        <input
                          type="phone"
                          className={classNames("form-control", {
                            "is-invalid": errors.phone,
                          })}
                          {...register("phone", {
                            value: data.phone,
                          })}
                          onChange={inputEvent}
                          name="phone"
                          maxLength="10"
                          value={data.phone}
                          placeholder="Phone No"
                          // disabled
                        />
                        <small className="invalid-feedback">
                          {errors.phone?.message}
                        </small>
                      </div>
                      <div class="col-12">
                        <label for="yourEmail" class="form-label">
                          Your Email
                        </label>
                        <input
                          className={classNames("form-control", {
                            "is-invalid": errors.email,
                          })}
                          {...register("email", {
                            value: data.email,
                          })}
                          name="email"
                          onChange={inputEvent}
                          placeholder="Email"
                          value={data.email}
                          // autoSave
                        />
                        <small className="invalid-feedback">
                          {errors.email?.message}
                        </small>
                      </div>

                      <div class="col-12">
                        <label for="yourPassword" class="form-label">
                          Password
                        </label>
                        <input
                          // className="form-control form-control-sm"
                          className={classNames("form-control", {
                            "is-invalid": errors.password,
                          })}
                          {...register("password", {
                            value: data.password,
                          })}
                          name="password"
                          onChange={inputEvent}
                          placeholder="Password"
                          value={data.password}
                          type="password"
                          //autoSave
                        />
                        <small className="invalid-feedback">
                          {errors.password?.message}
                        </small>
                      </div>

                      {/* <div class="col-12">
                        <div class="form-check">
                          <input
                            class="form-check-input"
                            name="terms"
                            type="checkbox"
                            value=""
                            id="acceptTerms"
                            // required
                          />
                          <label class="form-check-label" for="acceptTerms">
                            I agree and accept the{" "}
                            <a href="#">terms and conditions</a>
                          </label>
                          <div class="invalid-feedback">
                            You must agree before submitting.
                          </div>
                        </div>
                      </div> */}
                      <div class="col-12">
                        <button class="btn btn-primary w-100" type="submit">
                          Create Account
                        </button>
                      </div>
                      <div class="col-12">
                        <p class="small mb-0">
                          Already have an account?{" "}
                          <NavLink to="/login">Log in</NavLink>
                        </p>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Signup;
