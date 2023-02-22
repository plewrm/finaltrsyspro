import React, { useEffect, useState } from "react";
import { Navigate, NavLink, Outlet, useNavigate } from "react-router-dom";
import AxiosApi from "../Utils/AxiosApi";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { loginValidation } from "../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import ToolkitProviderTable from "../Utils/ToolkitProviderTable";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(loginValidation),
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
  const onLoginButtonClicked = () => {
    const jsondata = {
      username: data.userName,
      password: data.userPassword,
      // username: "akshayyyy@gmail.com",
      // password: "akshayyy",
    };
    async function postData() {
      const result = await AxiosApi.post("login", jsondata);
      const resp = result.data;
      if (resp.detail === "Login Successfully") {
        localStorage.setItem("loggedin", JSON.stringify(resp));
        navigate("/dashboard");
      } else {
        alert("Invalid Credentials");
      }
    }
    postData();
  };

  ///// NAvigate to dashboard page
  // useEffect(() => {
  //   const LocalStorageData = JSON?.parse(localStorage.getItem("loggedin"));
  //   LocalStorageData?.token && navigate("/dashboard");
  // }, []);
  if (localStorage.getItem("loggedin")) {
    return <Navigate to={"/dashboard"} />;
  }
  const columns = [
    {
      dataField: "email",
      text: "Emacwceil",
      sort: true,
    },
    {
      dataField: "postId",
      text: "cwew",
    },
  ];
  return (
    <>
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
                  {/* <!-- End Logo --> */}

                  <div class="card mb-3">
                    <div class="card-body">
                      <div class="pt-4 pb-2">
                        <h5 class="card-title text-center pb-0 fs-4">
                          Login to Your Account
                        </h5>
                        <p class="text-center small">
                          Enter your username & password to login
                        </p>
                      </div>

                      <form
                        class="row g-3 needs-validation"
                        onSubmit={handleSubmit(onLoginButtonClicked)}
                        novalidate
                      >
                        <div class="col-12">
                          <label for="yourUsername" class="form-label">
                            Username
                          </label>
                          <div class="input-group has-validation">
                            <span
                              class="input-group-text"
                              id="inputGroupPrepend"
                            >
                              @
                            </span>

                            <input
                              className={classNames("form-control", {
                                "is-invalid": errors.userName,
                              })}
                              {...register("userName", {
                                value: data.userName,
                              })}
                              name="userName"
                              onChange={inputEvent}
                              placeholder="Username"
                              value={data.userName}
                              // autoSave
                            />
                            <div class="invalid-feedback">
                              Please enter your username.
                            </div>
                          </div>
                        </div>

                        <div class="col-12">
                          <label for="yourPassword" class="form-label">
                            Password
                          </label>
                          <input
                            // className="form-control form-control-sm"
                            className={classNames("form-control", {
                              "is-invalid": errors.userPassword,
                            })}
                            {...register("userPassword", {
                              value: data.userPassword,
                            })}
                            name="userPassword"
                            onChange={inputEvent}
                            placeholder="Password"
                            value={data.userPassword}
                            type="password"
                            //autoSave
                          />
                          <div class="invalid-feedback">
                            Please enter your password!
                          </div>
                        </div>

                        {/* <div class="col-12">
                          <div class="form-check">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              name="remember"
                              value="true"
                              id="rememberMe"
                            />
                            <label class="form-check-label" for="rememberMe">
                              Remember me
                            </label>
                          </div>
                        </div> */}
                        <div class="col-12">
                          <button class="btn btn-primary w-100" type="submit">
                            Login
                          </button>
                        </div>
                        <div class="col-12">
                          <p class="small mb-0">
                            Don't have account?{" "}
                            <NavLink to="Signup">Create an account</NavLink>
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
    </>
  );
};

export default Login;
