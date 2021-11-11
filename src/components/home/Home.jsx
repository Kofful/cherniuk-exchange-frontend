import {Link} from "react-router-dom";
import {route} from "../../routes";

export default function Home() {
  return (
    <div className="App">
      <h1>WELCOME TO REACT!!!!</h1>
        <Link to={route("admin")}>Admin</Link>
    </div>
  );
}
