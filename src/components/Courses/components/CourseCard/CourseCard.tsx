import { useNavigate } from "react-router";
import Button from "../../../../common/Button/Button";
import "./CourseCard.css"
import { MdOutlineModeEdit, MdDelete } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../../store";
import { deleteCourseFromServer } from "../../../../store/courses/thunk";

type CourseCardProps = {
    id: string,
    title: string,
    description: string,
    creationDate: string,
    duration: string,
    authors: string
};
const CourseCard = (courseInfo: CourseCardProps) => {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const { role } = useSelector((state: RootState) => state.user);
    return (
        <div className="card__container" id={courseInfo.id} key={courseInfo.id}>
            <h1 className="card__heading">{courseInfo.title}</h1>
            <div className="card__body__container">
                <div className="card__description">
                    <p>{courseInfo.description}</p>
                </div>
                <div className="card__metadata">
                    <div>
                        <div className="card__metadata__item">
                            <span>Authors</span>
                            <span>{courseInfo.authors}</span>
                        </div>

                        <div className="card__metadata__item">
                            <span>Duration</span>
                            <span>{courseInfo.duration}</span>
                        </div>

                        <div className="card__metadata__item">
                            <span>Created</span>
                            <span>{courseInfo.creationDate}</span>
                        </div>
                    </div>

                    <div className="courseCard__button">
                        <Button title="Show Course" onClick={() => navigate(`/course/${courseInfo.id}`)} />
                        {role === 'admin' && <Button isIconOnly icon={<MdDelete size={20} />} onClick={() => { dispatch(deleteCourseFromServer(courseInfo.id)) }} />}
                        {role === 'admin' && <Button isIconOnly icon={<MdOutlineModeEdit size={20} />} onClick={() => navigate(`/courses/update/${courseInfo.id}`)} />}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CourseCard