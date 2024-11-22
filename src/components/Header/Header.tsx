import { Link, useNavigate } from "react-router-dom"
import Button from "../../common/Button/Button"
import Logo from "./components/Logo/Logo"
import './Header.css'
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../store"
import { logout, UserState } from "../../store/user/reducer"

const Header = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector<RootState, UserState>(state => state.user);
    return (
        <div className="header__container">
            <div className="header">
                <Logo />
                <div className="header__nav">
                    <Link to="/" className="nav__link">Home</Link>
                    <Link to="/courses" className="nav__link">Courses</Link>
                    {user.name && <p className="username">{user.name}</p>}
                    {localStorage.getItem("token") ? <Button title="Logout" onClick={() => {
                        dispatch(logout());
                    }} /> : window.location.pathname !== "/login" && <Button title="Login" onClick={() => {
                        navigate("/login");
                    }} />}
                </div>
            </div>
        </div>
    )
}

export default Header