import React, { useState } from "react";
import { useForm } from "react-hook-form";
import classNames from "classnames";
import { editCandidateExperienceValidation } from "../../../../Utils/ValidationForm";
import { yupResolver } from "@hookform/resolvers/yup";
import AxiosApi, { headersCors } from "../../../../Utils/AxiosApi";
import { useEffect } from "react";
const Months = [
  {
    value: 1,
    name: "January",
  },
];
const Years = [
  {
    value: 2023,
    name: "2023",
  },
];
const EditExperience = (props) => {
  const [viewDataExperience, setViewDataExperience] = useState([]);
  const [renderComponent, setRenderComponent] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    resolver: yupResolver(editCandidateExperienceValidation),
  });
  const inputEventExperience = (event) => {
    const { name, value } = event.target;
    setViewDataExperience((preValue) => {
      return {
        ...preValue,
        [name]: value,
      };
    });
  };
  // useEffect(() => {
  //   async function getData() {
  //     const viewResultsExperience = await AxiosApi.get(
  //       `candidates/experience/${props.id}`,
  //       headersCors
  //     );
  //     const viewRespsExperience = viewResultsExperience?.data[0];
  //     reset(viewRespsExperience);
  //     setViewDataExperience(viewRespsExperience);
  //   }
  //   getData();
  // }, [props?.id, renderComponent]);

  const onSubmitExperience = () => {
    const jsondataExperience = {
      role: viewDataExperience?.role,
      organization: viewDataExperience?.organization,
      description: viewDataExperience?.description,
      category: viewDataExperience?.category,
      start_month: viewDataExperience?.start_month,
      end_month: viewDataExperience?.end_month,
      start_year: viewDataExperience?.start_year,
      end_year: viewDataExperience?.end_year,
      member_id: props?.id,
    };
    async function postData() {
      setRenderComponent(false);
      const result = await AxiosApi.put(
        `/candidates/experience/${props?.id}`,
        jsondataExperience
      );
      const resp = result?.data;
      if (resp?.detail === "Successfully Updated") {
        alert("updated");
        setRenderComponent(true);
        reset();
        setViewDataExperience([]);
      }
    }
    postData();
  };
  props.reRenderCmponent(renderComponent);
  return (
    <div>
      <form
        className="row g-3 mt-2"
        onSubmit={handleSubmit(onSubmitExperience)}
      >
        <div className="col-md-6">
          <label for="inputEmail5" className="form-label">
            Role
          </label>
          <input
            className={classNames("form-control", {
              "is-invalid": errors.role,
            })}
            {...register("role", {
              value: viewDataExperience?.role,
            })}
            name="role"
            onChange={inputEventExperience}
            placeholder="Role"
            value={viewDataExperience?.role}
          />
          <small className="invalid-feedback">{errors.role?.message}</small>
        </div>
        <div className="col-md-6">
          <label for="inputEmail5" className="form-label">
            Organization
          </label>
          <input
            className={classNames("form-control", {
              "is-invalid": errors.organization,
            })}
            {...register("organization", {
              value: viewDataExperience?.organization,
            })}
            name="organization"
            onChange={inputEventExperience}
            placeholder="Organization"
            value={viewDataExperience?.organization}
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
            onChange={inputEventExperience}
            placeholder="Description"
            value={viewDataExperience?.description}
          />
        </div>
        <div className="col-md-6">
          <label for="inputEmail5" className="form-label">
            category
          </label>
          <input
            className="form-control"
            name="category"
            onChange={inputEventExperience}
            placeholder="Category"
            value={viewDataExperience?.category}
          />
        </div>
        <div className="col-md-3">
          <label for="inputEmail5" className="form-label">
            Start Month
          </label>

          <select
            className="form-control"
            onChange={inputEventExperience}
            name="start_month"
            value={viewDataExperience?.start_month}
          >
            <option value="">--Select--</option>
            {Months.map((val) => (
              <option value={val.value}>{val.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label for="inputEmail5" className="form-label">
            Start Year
          </label>
          <select
            className="form-control"
            onChange={inputEventExperience}
            name="start_year"
            value={viewDataExperience?.start_year}
          >
            <option value="">--Select--</option>
            {Years.map((val) => (
              <option value={val.value}>{val.name}</option>
            ))}
          </select>
        </div>
        <div className="col-md-3">
          <label for="inputEmail5" className="form-label">
            End Month
          </label>
          <select
            className="form-control"
            onChange={inputEventExperience}
            name="end_month"
            value={viewDataExperience?.end_month}
          >
            <option value="">--Select--</option>
            {Months.map((val) => (
              <option value={val.value}>{val.name}</option>
            ))}
          </select>
        </div>

        <div className="col-md-3">
          <label for="inputEmail5" className="form-label">
            End Year
          </label>
          <select
            className="form-control"
            onChange={inputEventExperience}
            name="end_year"
            value={viewDataExperience?.end_year}
          >
            <option value="">--Select--</option>
            {Years.map((val) => (
              <option value={val.value}>{val.name}</option>
            ))}
          </select>
        </div>

        <div className="text-center"></div>
        <div className="modal-footer">
          <button
            type="submit"
            className="btn btn-primary"
            data-bs-dismiss={
              viewDataExperience?.role === "" ||
              viewDataExperience?.organization === ""
                ? ""
                : "modal"
            }
          >
            Save & Exit
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
    </div>
  );
};

export default EditExperience;
