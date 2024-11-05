import styles from './styles.module.scss';

export function Overlay({ onClick }: { onClick: () => void }) {
  return <div className={styles.Overlay} onClick={onClick} />;
}
