import React, { useState, useEffect } from "react";

import PageTitle from "../../components/page-title";
import NavTabs from "../../components/navtabs";

import TransactionsTab from "./transactions";

const MyAccountPage = () => {
  const [activeTab, setActiveTab] = useState("Transactions");

  useEffect(() => {
    const urlSearchString = window.location.search;
    const params = new URLSearchParams(urlSearchString);
    const queryTab = params.get("tab");

    if (queryTab) setActiveTab(queryTab);
  }, []);

  const switchTab = (id: string) => {
    setActiveTab(id);
  };

  let navigations = [
    {
      label: "Transactions",
      content: <TransactionsTab />,
    },
    {
      label: "Profiles",
      content: <></>,
    },
    {
      label: "Settings",
      content: <></>,
    },
  ];

  return (
    <React.Fragment>
      <PageTitle title="My Account" />

      <div className="my_account_page_container">
        <NavTabs
          activeTab={activeTab}
          toggleTab={(label: string) => switchTab(label)}
          navItems={navigations}
          tabPanes={navigations}
        />
      </div>
    </React.Fragment>
  );
};

export default MyAccountPage;
