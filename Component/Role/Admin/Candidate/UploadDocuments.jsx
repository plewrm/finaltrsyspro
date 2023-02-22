import React, { useState } from "react";
import AxiosApi from "../../../../Utils/AxiosApi";
const UploadDocuments = (props) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const onSubmit = (event) => {
    async function postData() {
      event.preventDefault();
      const formData = new FormData();
      formData.append("file", file);

      await AxiosApi.put(`/documents/${props?.id}/cv`, "", { formData });
    }
    postData();
  };

  return (
    <div>
      <form class="row g-3 mt-2">
        <div class="">
          <label for="inputEmail5" class="form-label">
            CV
          </label>

          <input
            name="file"
            type="file"
            placeholder="Alternate Email"
            onChange={handleFileChange}
          />
        </div>

        <div class="text-center"></div>

        <div class="">
          <button
            type="submit"
            class="btn btn-primary"
            onClick={(e) => onSubmit(e)}
          >
            Save changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default UploadDocuments;
