import React from "react";

interface Props {
  children: JSX.Element | string;
  icon?: string;
  color?: string;
  onClick: Function;
  ref?: any;
}

const GrayButton: React.FC<Props> = ({
  children,
  icon,
  onClick,
  color,
  ref,
}) => {
  return (
    <button
      type="button"
      className={`bg-gray-200 text-gray-500 py-2 px-9 rounded-lg hover:bg-gray-300 focus:outline-none focus:bg-blue-500 focus:text-white ${color}`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      {icon ? <i className={icon}></i> : null} {children}
    </button>
  );
};

export default GrayButton;
