import React from "react";
import Button from "./Button";
import { useNavigate } from "react-router";
import styles from "./BackButton.module.css";

const BackButton = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className={styles.button}>
      <Button
        type="back"
        onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}
      >
        {children}
      </Button>
    </div>
  );
};

export default BackButton;
