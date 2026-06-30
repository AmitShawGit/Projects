
import { useRouteError } from "react-router-dom";
import img from "../assets/error_animation.webp";
import { Link } from "react-router-dom";
const Error = () => {
   let errors = useRouteError() 
  return (
    <>
      <div className="row">
        <div className="col-md-8">
          <h1>Oops out of oxygen !!</h1>
          <p>{errors.message || errors.data}</p>
          <Link to='/#/'><button className="btn btn-primary">Go back to earth</button></Link>
        </div>
        <div className="col-md-4">
          <img src={img} alt="404 img" />
        </div>
      </div>
    </>
  );
};

export default Error;
