import { format } from "date-fns";
import "./Dropdown.css";

const Dropdown = ({ selected, setSelected, id, active, setActive, data }) => {
  return (
    <div className="dropdown">
      <div
        className="dropdown-btn"
        onClick={() => {
          active === id ? setActive(-1) : setActive(id);
        }}
      >
        <span className="fas fa-caret-down">{selected}</span>
      </div>
      {active === id && (
        <div className="dropdown-content">
          {id === 0
            ? formatedData.map((service, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setSelected(service);
                    setActive(-1);
                  }}
                  className="dropdown-item"
                >
                  {service.name}
                </div>
              ))
            : formatedData.map((time, id) => (
                <div
                  key={id}
                  onClick={() => {
                    setSelected(time);
                    setActive(-1);
                  }}
                  className="dropdown-item"
                >
                  {format(time, "kk:mm")}
                </div>
              ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
