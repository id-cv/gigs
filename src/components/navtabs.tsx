import React from "react";

import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";

type Props = {
  activeTab: string;
  toggleTab: (id: string) => void;
  navItems: {
    label: string;
  }[];
  tabPanes: {
    label: string;
    content: React.ReactNode;
  }[];
};

const NavTabs = ({ activeTab, toggleTab, navItems, tabPanes }: Props) => {
  const tabToShow = tabPanes?.find((x) => x.label === activeTab);

  return (
    <React.Fragment>
      <div className="vertical_scroll">
        <Nav tabs>
          {navItems?.map((item, i) => (
            <NavItem key={i}>
              <NavLink
                className={classnames({ active: activeTab === item?.label })}
                onClick={() => toggleTab(item?.label)}
              >
                {item?.label}
              </NavLink>
            </NavItem>
          ))}
        </Nav>
      </div>
      <TabContent activeTab={activeTab}>
        <TabPane tabId={tabToShow?.label}>{tabToShow?.content}</TabPane>
      </TabContent>
    </React.Fragment>
  );
};

export default NavTabs;
