import ToDoListStyle from "./ToDoList.module.scss";
import Body from "./Components/EmployeeList/EmployeeList";
import Modal from "./Components/Modal/EmployeeForm";
import { createContext, useMemo, useState } from "react";
import { data } from "./Employees";

export const listContext = createContext(null);

function ToDoList() {
  const listData = useMemo(() => data, []);
  const [list, setList] = useState(listData);

  return (
    <div>
      <listContext.Provider value={[list, setList]}>
        <Body />
      </listContext.Provider>
    </div>
  );
}

export default ToDoList;
