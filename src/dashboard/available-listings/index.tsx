import React, { useState, useEffect } from "react";
import { Link, useRouteMatch } from "react-router-dom";

import PageTitle from "../../components/page-title";
import PageHeader from "../../components/page-header";

import { availableListingsData } from "../../utils/mockdata";
import { AnyObject, dateToFromNow } from "../../utils/functions";

const AvailableListings = () => {
  let { path } = useRouteMatch();

  const [listings, setListings] = useState<AnyObject>([]);

  useEffect(() => {
    setListings(availableListingsData);
  }, []);

  return (
    <React.Fragment>
      <PageTitle title="Available Listings" />

      <div className="available_listings_container">
        <PageHeader
          title="Available Listings"
          subTitle="Explore all available Gigs and Services"
        />

        <div className="listings">
          {listings?.map((item: AnyObject, i: number) => {
            return (
              <Link key={i} to={`${path}/${item?.id}`} className="item">
                <p className={`tag ${item?.tag?.toLowerCase()}`}>{item?.tag}</p>
                <p className="title">{item?.title}</p>
                <p className="client_name">{item?.client_name}</p>
                <p className="text">
                  Budget: <span>{item?.budget}</span>
                </p>
                <p className="text">
                  Duration: <span>{item?.duration}</span>
                </p>
                <p className="text skills">
                  Skills:{" "}
                  {item?.skills?.map((x: AnyObject) => (
                    <span>{x?.name},</span>
                  ))}
                </p>
                <p className="posted">
                  Posted {dateToFromNow(item?.created_at)}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </React.Fragment>
  );
};

export default AvailableListings;
