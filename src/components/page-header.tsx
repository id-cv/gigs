import { ReactNode } from "react";

type Props = {
  title: string;
  subTitle?: string;
  rightSide?: ReactNode;
};

const PageHeader = ({ title, subTitle, rightSide }: Props) => {
  return (
    <div className="page_header_container">
      <div className="info">
        <h6>{title}</h6>
        {subTitle && <p>{subTitle}</p>}
      </div>

      {rightSide}
    </div>
  );
};

export default PageHeader;
