import { useRef, useContext } from 'react';
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const history= useHistory();
  const newPasswordInputRef = useRef();
  const authCtx = useContext(AuthContext);

  const submitHandler =(event)=>{
    event.preventDefault();
    const enterdNewPassword = newPasswordInputRef.current.value;

    fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAGPj6SmSbjg6eVTnC8ofI_9R1HWNfd3cQ',{
      method: 'POST',
      body: JSON.stringify({
        idToken:authCtx.token,
        password:enterdNewPassword,
        returnSecureToken:false
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res =>{
      //Asuming its always sucessfull
      history.replace('/');
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' minLength="7" ref={newPasswordInputRef}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
