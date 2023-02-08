import UserInfo from '../User/UserInfo';
import UserContext from "../../contexts/UserContext";
import { useContext } from "react";
import { Link } from 'react-router-dom';

const Header = () => {

  const { loggedInUser } = useContext(UserContext);

  return (
    <>
      {
        loggedInUser ?
          <UserInfo /> :
          <div className="loginRegister">
            <Link to='/login'>Login</Link>
            <Link to='/register'>Register</Link>
          </div>
      }
      <hr className='line' />
      {
        loggedInUser ?
          <div className="addPost"></div>
          :
          <>
            <div className='info'>
              <p>Pls login or register to add new post, or to see your posts</p>
            </div>
            <hr className='line' />
          </>
      }
    </>
  );
}

export default Header;