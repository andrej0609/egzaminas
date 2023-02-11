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
      {
        loggedInUser ?
          <div className="addPost"></div>
          :
          <>
            <hr className='line' />
            <div className='info'>
              <p>Pls Login <Link to='/login'><i className="fas fa-sign-in-alt"></i></Link> or Register <Link to='/register'><i className="fas fa-user-plus"></i></Link> to add new post, or to see your posts</p>
            </div>
          </>
      }
    </>
  );
}

export default Header;