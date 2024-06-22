import React from "react";
import { useHistory } from "react-router-dom";

import PageTitle from "../../components/page-title";

import Icon from "../../assets/svg";

import { AnyObject, formatNumber } from "../../utils/functions";

const HomePage = () => {
  const history = useHistory();

  const clientAnalytics = [
    { label: "Gigs Listed", value: 5 },
    { label: "Bids Received", value: 2000 },
    { label: "Gigs Ongoing", value: 1 },
    { label: "Gigs Completed", value: 3 },
    { label: "Services Purchased", value: 20 },
    { label: "Services Completed", value: 10 },
  ];

  const freelancerAnalytics = [
    { label: "Bids Submitted", value: 24 },
    { label: "Bids Won", value: 9 },
    { label: "Gigs Ongoing", value: 2 },
    { label: "Gigs Completed", value: 7 },
    { label: "Services Listed", value: 7 },
    { label: "Services Sold", value: 20 },
  ];

  const actions = [
    {
      label: "Create a New Profile",
      onClick: () => history.push("/my-account?tab=Profiles"),
    },
    {
      label: "Explore Available Listings",
      onClick: () => history.push("/all-listings"),
    },
    {
      label: "List a Gig/Service",
      onClick: () => history.push("/my-listings"),
    },
  ];

  return (
    <React.Fragment>
      <PageTitle title="Home" />

      <div className="homepage_container">
        <div className="analytics">
          <p className="section_title">Client Analytics</p>

          <div className="list">
            {clientAnalytics.map((item: AnyObject, i: number) => (
              <div key={i} className="item">
                <h6>{formatNumber(item?.value)}</h6>
                <p>{item?.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="analytics last">
          <p className="section_title">Freelance Analytics</p>

          <div className="list">
            {freelancerAnalytics.map((item: AnyObject, i: number) => (
              <div key={i} className="item">
                <h6>{formatNumber(item?.value)}</h6>
                <p>{item?.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <p className="section_title">Quick Actions</p>

          <div className="list">
            {actions.map((item: AnyObject, i: number) => (
              <div key={i} className="item" onClick={item?.onClick}>
                <p>{item?.label}</p>
                <Icon name="chevronRight" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
