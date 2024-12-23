import { useAppSelector } from "@/lib/store";
import { ROUTES } from "@/router/routes";
import { Link } from "react-router-dom";
import styles from "./styles.module.scss";

export function ProfileButton() {
  const user = useAppSelector(state => state.auth.user);

  if (!user) {
    return;
  }

  return (
    <Link to={ROUTES.me} className={styles.ProfileButton}>
      {user.avatar
        ? <img src={user.avatar} className={styles.avatar} alt="avatar" />
        : <div className={styles.avatar} />}
      <span className={styles.name}>{user?.name}</span>
    </Link>
  );
}