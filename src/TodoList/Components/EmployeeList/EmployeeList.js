import { useContext, useState } from "react";
import SignNewTask from "../Modal/EmployeeForm";
import BodyStyle from "./EmployeeList.module.scss";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React from "react";
import { listContext } from "../../ToDoList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function FormatDate({ dob }) {
  const date = new Date(dob);

  return (
    <div className={BodyStyle["dob-wrapper"]}>
      <div className={BodyStyle["month"]}>
        {date.toLocaleString("default", { month: "long" })}
      </div>
      <div className={BodyStyle["year"]}>
        {date.toLocaleString("default", { year: "numeric" })}
      </div>
      <div className={BodyStyle["day"]}>
        {date.toLocaleString("default", { day: "numeric" })}
      </div>
    </div>
  );
}

function Body() {
  const [modalShow, setModalShow] = useState(false);
  const [list, setList] = useContext(listContext);
  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const deleteStudent = (id) => {
    console.log(id);
    const newList = list.filter((item, index) => index !== id);
    setList(newList);
  };

  return (
    <div>
      <div>
        <SignNewTask show={modalShow} onHide={() => setModalShow(false)} />
      </div>

      <div>
        <div className={BodyStyle["body"]}>
          {list?.map((item, index) => {
            return (
              <div className={BodyStyle["wrapper"]} key={index}>
                <h4 className={BodyStyle["dob"]}>
                  <FormatDate dob={item.dob} />
                </h4>
                <h4 className={BodyStyle["name"]}>{item.name}</h4>
                <h4 className={BodyStyle["gpa"]}>
                  <span>{item.gpa}</span>
                </h4>
                <h4 className={BodyStyle["action"]}>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteStudent(index)}
                  />
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Body;
