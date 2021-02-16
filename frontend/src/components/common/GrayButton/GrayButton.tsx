import React from "react";

interface Props {
  children: JSX.Element | string;
  icon?: string;
  color?: string;
  onClick: Function;
  ref?: any;
  active?: boolean;
}

const GrayButton: React.FC<Props> = ({
  children,
  icon,
  onClick,
  color,
  active,
}) => {
  return (
    <button
      type="button"
      className={`bg-gray-200 text-gray-500  w-full text-left py-2 px-4 rounded-lg hover:bg-gray-300 focus:outline-none ${color} ${
        active ? "bg-blue-500 text-white" : ""
      }`}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      style={active ? { color: "#fff" } : {}}
    >
      {icon ? (
        <i className={`${icon} mr-2 ${active && "text-white"}`}></i>
      ) : null}{" "}
      {children}
    </button>
  );
};

export default GrayButton;
