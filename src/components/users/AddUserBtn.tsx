import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const AddUserBtn = () => {
  return (
    <Link to="/add-user">
      <Button variant="primary" className="ms-auto">
        Add user
      </Button>
    </Link>
  );
};

export default AddUserBtn;
