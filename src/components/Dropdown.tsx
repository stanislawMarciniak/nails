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
          {data.map((service, id) => (
            <div
              key={id}
              onClick={() => {
                setSelected(service);
                setActive(-1);
              }}
              className="dropdown-item"
            >
              {service}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
