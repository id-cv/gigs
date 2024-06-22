import { Switch, Route, Redirect } from "react-router-dom";

import HomePage from "./home";
import AvailableListings from "./available-listings";
import MyListings from "./my-listings";
import ListingInformationPage from "./my-listings/listing-info";
import MyAccountPage from "./my-account";

const dummyPage = () => {
  return <>Empty Page</>;
};

type NavRouteProps = {
  icon: string;
  label: string;
  to?: string | null;
  component?: () => JSX.Element;
  unlist?: boolean;
}[];

export const navRoutes: NavRouteProps = [
  {
    icon: "history",
    label: "Home",
    to: "/home",
    component: HomePage,
  },
  {
    icon: "document",
    label: "Available Listings",
    to: "/all-listings",
    component: AvailableListings,
  },
  {
    icon: "document",
    label: "Information | Available Listings",
    to: "/all-listings/:id",
    component: ListingInformationPage,
    unlist: true,
  },
  {
    icon: "document",
    label: "My Listings",
    to: "/my-listings",
    component: MyListings,
  },
  {
    icon: "document",
    label: "Information | My Listings",
    to: "/my-listings/:id",
    component: ListingInformationPage,
    unlist: true,
  },
  {
    icon: "data",
    label: "My Requested Services",
    to: "/my-requested-services",
    component: dummyPage,
  },
  {
    icon: "data",
    label: "Information | My Requested Services",
    to: "/my-requested-services/:id",
    component: dummyPage,
    unlist: true,
  },
  {
    icon: "request",
    label: "My Bids",
    to: "/my-bids",
    component: dummyPage,
  },
  {
    icon: "request",
    label: "Information | My Bids",
    to: "/my-bids/:id",
    component: dummyPage,
    unlist: true,
  },
  {
    icon: "data",
    label: "My Awarded Gigs",
    to: "/my-awarded-gigs",
    component: dummyPage,
  },
  {
    icon: "data",
    label: "Information | My Awarded Gigs",
    to: "/my-awarded-gigs/:id",
    component: dummyPage,
    unlist: true,
  },
  {
    icon: "notification",
    label: "Notifications",
    to: "/notifications",
    component: dummyPage,
  },
  {
    icon: "identification",
    label: "My Account",
    to: "/my-account",
    component: MyAccountPage,
  },
  {
    icon: "help",
    label: "Help",
    to: "/help",
    component: dummyPage,
  },
];

const UserRoutes = () => {
  const paths = navRoutes?.map((x) => x?.to);

  const pathname = window.location.pathname;

  return (
    <Switch>
      {navRoutes?.map((route, i) => (
        <Route
          key={i}
          exact
          path={route?.to || ""}
          component={route?.component}
        />
      ))}

      <Route
        path="*"
        render={() => (
          <Redirect to={paths.includes(pathname) ? pathname : `${paths[0]}`} />
        )}
      />
    </Switch>
  );
};

export default UserRoutes;
