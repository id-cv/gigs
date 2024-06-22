import React, { useState, useEffect } from "react";
import { Link, useHistory, useRouteMatch } from "react-router-dom";

import PageTitle from "../../components/page-title";
import PageHeader from "../../components/page-header";
import Button from "../../components/button";

import { myListingsData } from "../../utils/mockdata";
import { AnyObject, dateToFromNow } from "../../utils/functions";

const MyListings = () => {
  const history = useHistory();
  let { path } = useRouteMatch();

  const [listings, setListings] = useState<AnyObject>([]);

  useEffect(() => {
    setListings(myListingsData);
  }, []);

  return (
    <React.Fragment>
      <PageTitle title="Available Listings" />

      <div className="available_listings_container">
        <PageHeader
          title="My Listings"
          subTitle="Your listed Gigs and Services"
          rightSide={
            <div className="actions">
              <Button
                text="+ New Gig"
                onClick={() => history.push(`${path}/new-gig`)}
              />
              <Button
                text="+ New Service"
                onClick={() => history.push(`${path}/new-service`)}
              />
            </div>
          }
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

export default MyListings;
