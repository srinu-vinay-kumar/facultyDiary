import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";

import { IoMdAddCircleOutline } from "react-icons/io";
{
  /* <TiDocumentDelete />; */
}
// import { HiOutlineDocumentDownload } from "react-icons/hi";
{
  /* <HiOutlineDocumentDownload />; */
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    className="diary-dropdown"
    href=""
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
    &#x25bc;
  </a>
));

const CustomMenu = React.forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState("");

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <Form.Control
          autoFocus
          className="mx-3 my-2 w-auto"
          placeholder="Type to filter..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

const DiaryDropdown = ({ title, items = [] }) => {
  // Default value added to items
  return (
    <>
      <Dropdown className="dropdown-heading">
        <div>
          <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
            {title}
          </Dropdown.Toggle>
          <IoMdAddCircleOutline className="add-icon" />
        </div>
        <Dropdown.Menu as={CustomMenu}>
          {items.map((item, index) => (
            <Dropdown.Item key={index} eventKey={index}>
              {item}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </>
  );
};

export default DiaryDropdown;
