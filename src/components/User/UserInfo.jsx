import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const UserInfo = () => {

  const { loggedInUser, setLoggedInUser } = useContext(UserContext);

  const navigation = useNavigate();

  const logOutUser = () => {
    setLoggedInUser(null);
    navigation('/');
  }

  return (
    <>
      <div className="UserInfo">
        <div className="logo">
          <img src="https://varialhosting.com/blog/wp-content/uploads/2020/02/websiteplanet.png" alt='logo' />
        </div>
        <div className="menu">
          <div>
            <Link to="/">Home</Link>
            <Link to="/newPost">Add</Link>
            <img
              src={loggedInUser.avatar}
              alt="user avatar"
            />
            <span className="Username">{loggedInUser.name}</span>
            <button onClick={() => logOutUser()}>LogOut</button>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default UserInfo;