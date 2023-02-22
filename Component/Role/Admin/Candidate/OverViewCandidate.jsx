import React from "react";

const OverView = ({ viewData }) => {
  return (
    <>
      <div class="card-header fw-bold">Overview</div>
      {/* <div class="card-header-sub-title">
        Some information about yourself, fields with * marked are mandatory
      </div> */}

      <h5 class="card-title">Personal Details</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">User</div>
        <div className="col-lg-3 col-md-8">{viewData?.email_old}</div>
        <div className="col-lg-3 col-md-4 label ">Expert Id</div>
        <div className="col-lg-3 col-md-8">{viewData?.expert_profile_id}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label ">Full Name</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.first_name_old} {viewData?.last_name_old}
        </div>
      </div>
      <h5 class="card-title">Contact Details</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Email</div>
        <div className="col-lg-3 col-md-8">{viewData?.email_old}</div>
        <div className="col-lg-3 col-md-4 label">Alternate Email</div>
        <div className="col-lg-3 col-md-8">{viewData?.email2}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Primary phone country</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.country_code} ({viewData?.calling_code})
        </div>
        <div className="col-lg-3 col-md-4 label">Phone</div>
        <div className="col-lg-3 col-md-8">{viewData?.phone}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Alternate phone country</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.country_code} ({viewData?.alternate_phone_country_id})
        </div>
        <div className="col-lg-3 col-md-4 label">Alternate Phone</div>
        <div className="col-lg-3 col-md-8">{viewData?.phone2}</div>
      </div>
      <h5 class="card-title">Postal Address</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Address</div>
        <div className="col-lg-9 col-md-8">
          {viewData?.address}
          {viewData?.zipcode}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Country</div>
        <div className="col-lg-3 col-md-8">{viewData?.country_name}</div>
        <div className="col-lg-3 col-md-4 label">State</div>
        <div className="col-lg-3 col-md-8">{viewData?.state_name}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">City</div>
        <div className="col-lg-3 col-md-8">{viewData?.city_name}</div>
        <div className="col-lg-3 col-md-4 label">Zipcode</div>
        <div className="col-lg-3 col-md-8">{viewData.zipcode}</div>
      </div>
      <h5 class="card-title">Profile Summary</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Profile Heading</div>
        <div className="col-lg-9 col-md-8">{viewData?.profile_headline}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Profile Summary</div>
        <div className="col-lg-9 col-md-8">{viewData?.profile_summary}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Experience</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.experience_years === null
            ? "0"
            : viewData?.experience_years}
          years{" "}
          {viewData?.experience_months === null
            ? "0"
            : viewData?.experience_months}
          months
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Other Industry</div>
        <div className="col-lg-9 col-md-8">
          {viewData?.industry_other === ""
            ? "Not Available"
            : viewData?.industry_other}
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Other Skills</div>
        <div className="col-lg-9 col-md-8">{viewData?.skills_other}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-3 label">Linkedin</div>
        <div className="col-lg-3 col-md-3">{viewData?.linkedin}</div>
        <div className="col-lg-3 col-md-3 label">Cv displayname</div>
        <div className="col-lg-3 col-md-3">{viewData?.cv_displayname}</div>
      </div>
      <h5 class="card-title">Charges & Availability</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Availability (hrs/week)</div>
        <div className="col-lg-3 col-md-8">{viewData?.availability}</div>
        <div className="col-lg-3 col-md-4 label">Currency</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.currency_name} ({viewData?.currency_symbol})
        </div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Consulting rate</div>
        <div className="col-lg-3 col-md-8">{viewData?.consulting_rate}</div>
        <div className="col-lg-3 col-md-4 label">Billing rate</div>
        <div className="col-lg-3 col-md-8">{viewData?.billing_rate}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.open_for_travel === 0 ? false : true}
            />
            <label class="form-check-label" for="gridCheck1">
              Open for travel
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.open_for_relocation === 0 ? false : true}
            />
            <label class="form-check-label" for="gridCheck1">
              Open for relocation
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.prefers_weekdays === 0 ? false : true}
            />
            <label class="form-check-label" for="gridCheck1">
              Prefers weekdays
            </label>
          </div>
        </div>
        <div className="col-lg-3 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.prefers_weekends === 0 ? false : true}
            />
            <label class="form-check-label" for="gridCheck1">
              Prefers weekends
            </label>
          </div>
        </div>
      </div>
      <h5 class="card-title">General</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Remarks </div>
        <div className="col-lg-9 col-md-8">{viewData?.remarks}</div>
      </div>
      <h5 class="card-title">Activation Status</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.is_email_verified === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Is email verified
            </label>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.is_activation_complete === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Is activation complete
            </label>
          </div>
        </div>
      </div>
      <h5 class="card-title">Show expert on home page</h5>
      <div className="row">
        <div className="col-lg-6 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.show_on_homepage === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Show on homepage
            </label>
          </div>
        </div>
        <div className="col-lg-2 col-md-4 label">Image</div>
        <div className="col-lg-4 col-md-8">{viewData?.image}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Home title</div>
        <div className="col-lg-9 col-md-4 label">{viewData?.home_title}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Home summary</div>
        <div className="col-lg-9 col-md-4 label">{viewData?.home_summary}</div>
      </div>
      <h5 class="card-title">System Related </h5>

      <div className="row">
        <div className="col-lg-3 col-md-4 label">Member type</div>
        <div className="col-lg-3 col-md-8">{viewData?.member_type}</div>
        <div className="col-lg-3 col-md-4 label">Profile status</div>
        <div className="col-lg-3 col-md-8">{viewData?.profile_status}</div>
      </div>
      <div className="row">
        <div className="col-lg-4 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.is_industry_expert === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Is industry expert
            </label>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.is_functional_expert === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Is functional expert
            </label>
          </div>
        </div>
        <div className="col-lg-4 col-md-4 label">
          <div class="form-check">
            <input
              class="form-check-input"
              type="checkbox"
              id="gridCheck1"
              checked={viewData?.is_technology_expert === 1 ? true : false}
            />
            <label class="form-check-label" for="gridCheck1">
              Is technology expert
            </label>
          </div>
        </div>
      </div>
      <h5 class="card-title"> Reference Related </h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Referral code</div>
        <div className="col-lg-3 col-md-8">{viewData?.referral_code}</div>
      </div>
      <h5 class="card-title">Network Member Jobs</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Job</div>
        <div className="col-lg-3 col-md-8">Application Status</div>
      </div>
      <h5 class="card-title">Member Experties</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Experties</div>
        <div className="col-lg-9 col-md-8">{viewData?.expertise_name}</div>
      </div>
      <h5 class="card-title">Member Experience</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Role</div>
        <div className="col-lg-3 col-md-8">{viewData?.role}</div>
        <div className="col-lg-3 col-md-4 label">Organization</div>
        <div className="col-lg-3 col-md-8">{viewData?.organization}</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Description</div>
        <div className="col-lg-3 col-md-8">{viewData?.description}</div>
        <div className="col-lg-3 col-md-4 label">Category</div>
        <div className="col-lg-3 col-md-8">{viewData?.category=== 1 ? "Functional" :"Technology" }</div>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Start Date</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.start_month}/{viewData?.start_year}
        </div>
        <div className="col-lg-3 col-md-4 label">End Date</div>
        <div className="col-lg-3 col-md-8">
          {viewData?.end_month}/{viewData?.end_year}
        </div>
      </div>
      <h5 class="card-title">Member Industries</h5>
      <div className="row">
        <div className="col-lg-3 col-md-4 label">Industries</div>
        <div className="col-lg-9 col-md-8">{viewData?.industry_name}</div>
      </div>
    </>
  );
};

export default OverView;
