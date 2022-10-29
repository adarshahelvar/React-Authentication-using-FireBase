import { useState, useRef } from 'react';

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

const submitHandler = (event) => {
  event.preventDefault();

  const enterwdEmail = emailInputRef.current.value;
  const enterwdPassword = passwordInputRef.current.value;

  if(isLogin){

  }else {
    fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGPj6SmSbjg6eVTnC8ofI_9R1HWNfd3cQ',{         // process given in video 305(udemy)
      method: 'POST',
      body: JSON.stringify({
        email:enterwdEmail,
        password:enterwdPassword,
        returnSecureToken: true
      }),
      headers:{
        'Content-Type': 'application/json'
      }
    }
    ) .then(res=>{
        if(res.ok){

        }else{
         return res.json().then (data=>{
            //show error
            console.log(data);
          })
        }
    })
  }
}

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef}/>
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' required  ref={passwordInputRef}/>
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
