import { MdAdd, MdDelete } from "react-icons/md";
import "./AuthorItem.css";

type AuthorItemPropType = {
    authorName: string,
    onAddClick?: () => void,
    onDeleteClick?: () => void
}


const AuthorItem = ({ authorName, onAddClick, onDeleteClick }: AuthorItemPropType) => {
    return (
        <div className="flex space-x-2">
            <p className="text-lg">{authorName}</p>
            {onAddClick && <MdAdd size={25} onClick={onAddClick} />}
            {onDeleteClick && <MdDelete size={25} onClick={onDeleteClick} />}
        </div>
    )
}

export default AuthorItem