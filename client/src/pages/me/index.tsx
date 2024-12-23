import styles from '@/pages/login/styles.module.scss';
import { useGetMeQuery } from '@/services/auth.ts';
import { Loading } from '@/components/loading';
import { Error } from '@/components/error';

export function MePage() {
  const { data: user, isLoading, error } = useGetMeQuery();

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  if (!user) {
    return;
  }


  return (
    <div className={`${styles.Me} container`}>
      <h1>About me</h1>
      {user.avatar && <img src={user.avatar} alt={user.name} />}
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  );
}
