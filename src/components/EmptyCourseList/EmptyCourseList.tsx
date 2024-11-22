import { useEffect } from "react";
import Button from "../../common/Button/Button"
import "./EmptyCourseList.css"
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useNavigate } from "react-router";

const EmptyCourseList = () => {
  const navigate = useNavigate();
  const { role } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      // Re-enable scrolling when the component unmounts
      document.body.style.overflow = 'auto';
    };
  }, []);
  return (
    <div className="emptyCourseList__container">
      <div className="emptyCourseList__body">
        <h1 className="emptyCourseList__heading">Your List Is Empty</h1>
        <p>Please use 'Add New Course' button to add your first course</p>
        {role !== 'admin' && <p>You don't have permissions to create a course. Please log in as ADMIN</p>}
        {role === 'admin' && <div className="emptyCourseList__body__button">
          <Button title="Add New Course" onClick={() => navigate("/courses/add")} />
        </div>}
      </div>
    </div>
  )
}

export default EmptyCourseList