import classNames from 'classnames';
import { useAuth } from 'context/auth';
import Image from 'next/image';
import React, { useCallback, useEffect, useState } from 'react';
import { useDetectClickOutside } from 'react-detect-click-outside';

const Account = () => {
  const { isAuthenticated, handleLogin, handleRegister, handleLogout, error } =
    useAuth() || {};
  const [isShowPopup, setShowPopup] = useState(false);
  const [isShowProfileMenu, setShowProfileMenu] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
  });
  const [isRegister, setIsRegister] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const login = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (!loginForm.email || !loginForm.password) return;
    handleLogin?.(loginForm);
  };

  const register = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event?.preventDefault();
    if (
      !loginForm.email ||
      !loginForm.password ||
      !loginForm.firstName ||
      !loginForm.lastName
    )
      return;
    handleRegister?.(loginForm);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });
  };

  useEffect(() => {
    if (isAuthenticated) setShowPopup(false);
  }, [isAuthenticated]);

  useEffect(() => {
    () => {
      setIsRegister(false);
    };
  });

  const handleClickNewRegister = useCallback(() => {
    setIsRegister(true);
    setIsLogin(false);
  }, []);

  const handleBackToLogin = useCallback(() => {
    setIsRegister(false);
    setIsLogin(true);
  }, []);

  const handleClickOutside = () => {
    setShowPopup(false);
    setShowProfileMenu(false);
  };

  const ref = useDetectClickOutside({ onTriggered: handleClickOutside });

  return (
    <div className="static sm:relative" ref={ref}>
      <Image
        alt=""
        src={'/assets/user.svg'}
        width={32}
        height={32}
        className={classNames(
          'cursor-pointer transition-[display] ease-in-out duration-300',
          { hidden: isShowPopup || isShowProfileMenu }
        )}
        onClick={() =>
          isAuthenticated ? setShowProfileMenu(true) : setShowPopup(true)
        }
      />
      <Image
        alt=""
        src={'/assets/close.svg'}
        width={32}
        height={32}
        className={classNames(
          'cursor-pointer transition-[display] ease-in-out duration-300',
          { hidden: !isShowPopup && !isShowProfileMenu }
        )}
        onClick={() =>
          isAuthenticated ? setShowProfileMenu(false) : setShowPopup(false)
        }
      />
      {!isAuthenticated && (
        <div
          style={{ boxShadow: '0 1px 1px 1px #F9D9AA' }}
          className={classNames(
            `absolute w-screen left-0 top-full opacity-0 transition ease-in-out duration-300 will-change-transform bg-[#F7EBDA] text-[#222222] text-center sm:w-auto sm:min-w-[320px] sm:-right-[5px] sm:lg:top-[calc(100%_+_15px) sm:left-auto rounded-[3px] ${
              isShowPopup
                ? 'visible scale-100 ease-linear duration-300 z-10'
                : 'invisible scale-90 z-0'
            }`,
            {
              'opacity-100': isShowPopup,
            }
          )}
        >
          <div
            className={`h-full relative overflow-hidden transition-[height] ease-in-out duration-200 ${
              isRegister ? 'sm:h-[475px]' : 'sm:h-[375px]'
            }`}
          >
            <div
              className={`w-full transition-[transform] duration-[350ms] ${
                isLogin
                  ? 'visible translate-x-0'
                  : 'invisible -translate-x-full'
              } `}
            >
              <div className="py-[15px] px-5 sm:px-[25px]">
                <form autoComplete="off">
                  <div className="sm:pt-[15px] px-0 pb-[30px]">
                    <h2 className="sm:mb-2 sm:text-[19px] mb-1">
                      Login to my account
                    </h2>
                    <p className="text-[#4e5458]">
                      Enter your e-mail and password:
                    </p>
                  </div>
                  <p className="text-left text-red-500 mb-1">{error}</p>
                  <div className="relative w-full mb-3">
                    <input
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      required
                      type="email"
                      name="email"
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                      value={loginForm.email}
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      Email
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <input
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      required
                      type="password"
                      name="password"
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                      value={loginForm.password}
                      placeholder=" "
                      autoComplete="off"
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      Password
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="block mt-5 button w-full bg-primary text-white px-[30px] text-center leading-[55px] transition hover:opacity-90"
                    onClick={login}
                  >
                    Login
                  </button>
                </form>
                <div className="mt-4">
                  <p className="text-[14px]">
                    New customer?&nbsp;
                    <button
                      className="text-[#677279] transition-colors duration-200 ease-in-out hover:underline"
                      onClick={handleClickNewRegister}
                    >
                      Create your account
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div
              className={`w-full transition-[transform] duration-[350ms] absolute top-0 left-0 ${
                isRegister
                  ? 'visible translate-x-0'
                  : 'invisible translate-x-full'
              } `}
            >
              <div className="py-[15px] px-5 sm:px-[25px]">
                <form autoComplete="off">
                  <header className="sm:pt-[15px] px-0 pb-[30px]">
                    <h2 className="sm:mb-2 sm:text-[19px] mb-1">
                      Create my account
                    </h2>
                    <p className="text-[#4e5458]">
                      Please fill in the information below:
                    </p>
                  </header>
                  <p className="text-left text-red-500 mb-1">{error}</p>
                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      name="firstName"
                      autoComplete="off"
                      placeholder=" "
                      required
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      First name
                    </label>
                  </div>

                  <div className="relative w-full mb-3">
                    <input
                      type="text"
                      name="lastName"
                      autoComplete="off"
                      placeholder=" "
                      required
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      Last name
                    </label>
                  </div>
                  <div className="relative w-full mb-3">
                    <input
                      type="email"
                      name="email"
                      required
                      autoComplete="off"
                      placeholder=" "
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      Email
                    </label>
                  </div>

                  <div className="relative w-full mb-3">
                    <input
                      type="password"
                      name="password"
                      required
                      autoComplete="off"
                      placeholder=" "
                      style={{
                        boxShadow: '0 1px rgba(223, 223, 223,.25) inset',
                      }}
                      className="pt-5 pb-[3px] block p-3 rounded-sm border border-solid border-[#d2d2d2] w-full h-[48px] text-[#000000] bg-[#FDFAF6] resize-none transition ease-in-out duration-200 focus:border-[#677279] form__field"
                      onChange={onInputChange}
                    />
                    <label className="absolute left-[13px] top-0 leading-[48px] text-[#4e5458] scale-100 origin-top-left transition-transform duration-200 ease-in-out pointer-events-none form__floating-label">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="block mt-5 button w-full bg-primary text-white px-[30px] text-center leading-[55px] transition hover:opacity-90"
                    onClick={register}
                  >
                    Create my account
                  </button>
                </form>
                <div className="mt-4">
                  <p className="text-[14px]">
                    Already have an account?&nbsp;
                    <button
                      className="text-[#677279] transition-colors duration-200 ease-in-out hover:underline"
                      onClick={handleBackToLogin}
                    >
                      Login here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        style={{ boxShadow: '0 1px 5px 2px #F9D9AA' }}
        className={classNames(
          `absolute w-screen left-0 top-full opacity-0 transition ease-in-out duration-[200ms] will-change-transform bg-[#F7EBDA] text-[#222222] text-center sm:w-auto sm:min-w-[160px] sm:-right-[47px] sm:lg:top-[calc(100%_+_15px) sm:left-auto rounded-[3px] ${
            isShowProfileMenu
              ? 'visible scale-100 ease-linear duration-[250ms] z-10 '
              : 'invisible scale-90 z-0'
          }`,
          {
            'opacity-100': isShowProfileMenu,
          }
        )}
      >
        <div className="relative overflow-hidden transition-[height] ease-in-out duration-[150ms]">
          <div className="whitespace-nowrap list-none">
            <a
              className="block py-[2px] px-[25px] cursor-pointer w-full transition ease-in-out duration-[150ms] leading-7"
              onClick={handleLogout}
            >
              Logout
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
