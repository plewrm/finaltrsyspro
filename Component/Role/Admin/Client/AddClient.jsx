import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { addNewClientValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi from "../../../../Utils/AxiosApi";
const AddClient = (props) => {
  const [data, setData] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(addNewClientValidation),
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
  const onSubmit = () => {
    const jsondata = {
      name: data.name,
      client_code: data.client_code,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.post("client", jsondata);
      const resp = result.data;

      if (resp === "Client Added Successfully") {
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
    <div className="pagetitle" style={{ fontSize: "14px" }}>
      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                {/* <!-- Multi Columns Form --> */}
                <form
                  className="row g-3 mt-2"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <div className="col-md-6">
                    <label for="inputEmail5" className="form-label">
                      Client Id  
                      <span
                        style={{ color: "red", fontSize: 16, fontWeight: 600 }}
                      >
                        *
                      </span>(Alphanumeric)
                    </label>
                    <input
                      className={classNames("form-control", {
                        "is-invalid": errors.client_code,
                      })}
                      {...register("client_code", {
                        value: data?.client_code,
                      })}
                      name="client_code"
                      onChange={inputEvent}
                      placeholder="Client Code"
                      value={data?.client_code}
                    />
                    <small className="invalid-feedback">
                      {errors.client_code?.message}
                    </small>
                  </div>
                  <div className="col-md-6">
                    <label for="inputEmail5" className="form-label">
                      Client Name  
                      <span
                        style={{ color: "red", fontSize: 16, fontWeight: 600 }}
                      >
                        *
                      </span>(max 100 characters)
                    </label>
                    <input
                      className={classNames("form-control", {
                        "is-invalid": errors.name,
                      })}
                      {...register("name", {
                        value: data?.name,
                      })}
                      name="name"
                      onChange={inputEvent}
                      placeholder="Name"
                      value={data?.name}
                    />
                    <small className="invalid-feedback">
                      {errors.name?.message}
                    </small>
                  </div>

                  <div className="text-center"></div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss={
                        data?.name === undefined ||
                        data?.client_code === undefined
                          ? ""
                          : "modal"
                      }
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
    </div>
  );
};

export default AddClient;
