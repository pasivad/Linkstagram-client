import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';

import type { AppDispatch } from '../../redux/store';
import { fetchRegister, selectIsLogin } from '../../redux/slices/user';

import './SignUpForm.scss';

const SignUpForm = () => {
  const { t } = useTranslation();

  const dispatch = useDispatch<AppDispatch>();
  const isAuth = useSelector(selectIsLogin);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      userName: '',
      password: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async ({ userName, email, password }: { userName: string; email: string; password: string }) => {
    if (!email || !password || !userName) {
      setError('email', { type: 'focus' }, { shouldFocus: true });
    }
    const data = await dispatch(fetchRegister({ userName, email, password }));

    if (!data.payload) {
      return alert('Failed to register');
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  };

  if (isAuth) {
    return <Navigate to="/home" />;
  }

  return (
    <div className="signUp_container">
      <form
        className="signUp"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="signUp_title">{t('signUpHeader')}</div>
        <label htmlFor="email">Email</label>
        <input
          className="input_email"
          type="text"
          {...register('email', { required: 'Enter Email' })}
          placeholder="example@gmail.com"
        />
        <label htmlFor="username">User Name</label>
        <input
          className="input_username"
          type="text"
          {...register('userName', { required: 'Enter User Name' })}
          placeholder="Vasyl Vasylyk"
        />
        <label htmlFor="password">Password</label>
        <input
          className="input_password"
          type="password"
          {...register('password', { required: 'Enter Password' })}
          placeholder="Type in..."
        />
        {errors.email && <p className="error">Mandatory info missing</p>}
        <button className="signUp_button">{t('signUpHeader')}</button>
        <div className="accountExist">
          {t('signUpFooter')}
          <Link to="/signin">{t('signInHeader')}</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpForm;
