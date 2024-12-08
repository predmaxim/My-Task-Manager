import { useAppDispatch, useAppSelector } from '@/lib/store.ts';
import styles from './styles.module.scss';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { Overlay } from '@/components/ui/overlay';
import { PiX } from 'react-icons/pi';
import { Link } from 'react-router-dom';
import { ROUTES } from '@/router/routes.ts';
import { logout } from '@/lib/features/auth-slice.ts';

export function ProfileButton() {
  const dispatch = useAppDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return;
  }

  const hideMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setIsClosing(false);
    }, 150);
  };

  const onLogout = () => {
    dispatch(logout());
    hideMenu();
  };

  const menu = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/me' },
    { name: 'Projects', link: '/projects' },
  ];

  const Avatar = () => {
    return user.avatar
      ? <img src={user.avatar} className={styles.avatar} alt="avatar" />
      : <div className={styles.avatar}>
        {user.name[0].toUpperCase()}
      </div>;
  };

  return (
    <>
      <button className={styles.ProfileButton} onClick={() => setShowMenu(true)}>
        <Avatar />
      </button>
      {showMenu && createPortal(
        <>
          <Overlay onClick={hideMenu} />
          <div className={`${styles.content} ${isClosing ? styles.hidden : ''}`}>
            <div className={styles.header}>
              <Link to={ROUTES.me} className={styles.user} onClick={hideMenu}>
                <Avatar />
                <span className={styles.name}>{user.name}</span>
              </Link>
              <button onClick={hideMenu} className={styles.closeButton}>
                <PiX size={28} />
              </button>
            </div>
            <div className={styles.divider} />
            <ul className={styles.links}>
              {menu.map(({ name, link }) => (
                <li key={name}>
                  <Link to={link} onClick={hideMenu}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
            <div className={styles.divider} />
            <button onClick={onLogout} className={styles.logout}>
              Logout
            </button>
          </div>
        </>,
        document.body,
      )}
    </>
  );
}
