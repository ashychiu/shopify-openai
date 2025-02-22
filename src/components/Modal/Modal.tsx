import React from "react";
import "./Modal.scss";
import { AiFillCloseCircle } from "react-icons/ai";

interface IModalProps {
  handleClose: Function;
}

const Modal = (props: IModalProps) => {
  const { handleClose } = props;

  return (
    <div className="modal">
      <div className="modal__container">
        <AiFillCloseCircle
          onClick={() => handleClose()}
          className="closeButton"
          size="1.5rem"
        />
        <h2>Update Oct 2022: This is a legacy project.</h2>
        <p>Unfortunately OpenAI no longer offers free tier service.</p>
        <p>
          But free feel to stick around and check out{" "}
          <a
            href="https://github.com/ashychiu"
            target="_blank"
            rel="noreferrer"
          >
            my github
          </a>{" "}
          for other projects.
        </p>
      </div>
    </div>
  );
};

export default Modal;
