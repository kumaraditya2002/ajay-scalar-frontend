import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleNotch } from "@fortawesome/free-solid-svg-icons";
const Loader = ({ size }) => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <FontAwesomeIcon icon={faCircleNotch} size={size} spin></FontAwesomeIcon>
    </div>
  );
};

export default Loader;
