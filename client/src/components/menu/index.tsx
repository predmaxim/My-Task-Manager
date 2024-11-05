import { PiListBold, PiX } from 'react-icons/pi';
import styles from './styles.module.scss';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPortal } from 'react-dom';
import { Overlay } from '@/components/overlay';

export function Menu({ className }: { className?: string }) {
  const [showMenu, setShowMenu] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const hideMenu = () => {
    setIsClosing(true);
    setTimeout(() => {
      setShowMenu(false);
      setIsClosing(false);
    }, 150);
  };

  const menu = [
    { name: 'Home', link: '/' },
    { name: 'Profile', link: '/me' },
    { name: 'Projects', link: '/projects' },
  ];

  return (
    <div className={`${styles.Menu} ${className}`}>
      <button className={styles.button} onClick={() => setShowMenu(true)}>
        <PiListBold size={32} />
      </button>
      {showMenu && createPortal(
        <>
          <Overlay onClick={hideMenu} />
          <div className={`${styles.content} ${isClosing ? styles.hidden : ''}`}>
            <div className={styles.header}>
              <button onClick={hideMenu} className={styles.closeButton}>
                <PiX size={28} />
              </button>
            </div>
            <ul className={styles.links}>
              {menu.map(({ name, link }) => (
                <li key={name}>
                  <Link to={link} onClick={hideMenu}>
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </>,
        document.body,
      )}
    </div>
  );
}
