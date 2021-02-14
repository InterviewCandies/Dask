import React from "react";

interface Props {
  children: JSX.Element | string;
  icon?: string;
  onClick: Function;
}

const GrayButton: React.FC<Props> = ({ children, icon, onClick }) => {
  return (
    <button
      className="bg-gray-200 text-gray-500 py-2 px-9 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-blue-500 focus:text-white"
      onClick={onClick as any}
    >
      {icon ? <i className={icon}></i> : null} {children}
    </button>
  );
};

export default GrayButton;
