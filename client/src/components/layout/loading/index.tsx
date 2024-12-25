import styles from './styles.module.scss';

export function Loading({ className }: { className?: string }) {
  return (
    <div className={`${styles.Loading} ${className}`}>Loading...</div>
  );
}
