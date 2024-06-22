import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../redux";
import { useParams } from "react-router-dom";

import PageTitle from "../../components/page-title";
import PageHeader from "../../components/page-header";
import Loader from "../../components/loader";

import CreateNewGig from "./new-gig";

import { getSingleListingAction } from "../../redux/data/data-slice";

import { AnyObject, dateToFromNow } from "../../utils/functions";

const ListingInformationPage = () => {
  const query: { id: string } = useParams();

  const dispatch = useAppDispatch();

  const [isFetching, setIsFetching] = useState(false);
  const [listingInfo, setListingInfo] = useState<AnyObject>({});

  const queryId = query?.id;
  const NEW_GIG = "new-gig";
  const NEW_SERVICE = "new-service";

  useEffect(() => {
    if (queryId === NEW_GIG || queryId === NEW_SERVICE) {
      return;
    }

    getListingInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getListingInfo = async () => {
    setIsFetching(true);

    await dispatch(getSingleListingAction(queryId)).then((res: any) => {
      if (res?.success === true) {
        setListingInfo(res?.data);
      }
    });

    setIsFetching(false);
  };

  return (
    <React.Fragment>
      <PageTitle title="Listing Information" />

      <div className="available_listings_container listing_info_page_container">
        {queryId === NEW_GIG ? (
          <CreateNewGig />
        ) : queryId === NEW_SERVICE ? (
          <CreateNewGig />
        ) : (
          <>
            {isFetching ? (
              <Loader />
            ) : (
              <>
                <PageHeader
                  title={listingInfo?.title}
                  subTitle={listingInfo?.tag}
                />

                <div className="listing_info">
                  <p className="posted">
                    Posted {dateToFromNow(listingInfo?.created_at)}
                  </p>
                  <p className="text">
                    Client: <span>{listingInfo?.client_name}</span>
                  </p>
                  <p className="text">
                    Budget: <span>{listingInfo?.budget}</span>
                  </p>
                  <p className="text">
                    Duration: <span>{listingInfo?.duration}</span>
                  </p>
                  <p className="text skills">
                    Skills:{" "}
                    {listingInfo?.skills?.map((x: AnyObject) => (
                      <span>{x?.name},</span>
                    ))}
                  </p>
                </div>
              </>
            )}
          </>
        )}
      </div>
    </React.Fragment>
  );
};

export default ListingInformationPage;
