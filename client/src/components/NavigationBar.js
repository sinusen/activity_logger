import { Link } from "react-router-dom";

const NavigationBar = () => {
  return (
    <div>
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link className="nav-link" to="/">
            Submit activity
          </Link>
        </li>
        <li class="nav-item">
          <Link className="nav-link" to="/activitydisplay">
            Display activity
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default NavigationBar;
