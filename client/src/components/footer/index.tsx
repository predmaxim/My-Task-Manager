import styles from './styles.module.scss';

export function Footer() {
  return (
    <footer className={styles.Footer}>
      <div className="container">
        &copy; Made with ❤️ <a href="https://github.com/predmaxim" target="_blank" rel="noreferrer">PredMaxim</a>
      </div>
    </footer>
  );
}
