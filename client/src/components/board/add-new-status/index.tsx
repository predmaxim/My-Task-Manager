// AddNewStatus.tsx
import { KeyboardEvent, useState } from 'react';
import { useCreateTaskStatusMutation } from '@/services/task-statuses-service.ts';
import { ProjectType } from '@/types';
import styles from './styles.module.scss';
import { toast } from 'react-toastify';
import Input from '@/components/ui/input';
import { useAppSelector } from '@/lib/store';

type AddNewStatusProps = {
  projectId: ProjectType['id'],
}

export function AddNewStatus({ projectId }: AddNewStatusProps) {
  const [isAdding, setIsAdding] = useState(false);
  const [statusName, setStatusName] = useState('');
  const [createTaskStatus] = useCreateTaskStatusMutation();
  const taskStatuses = useAppSelector(state => state.statuses.taskStatuses);

  const handleSubmit = async () => {
    try {
      await createTaskStatus({
        name: statusName.trim(),
        projectId,
        order: taskStatuses?.length || 0,
      }).unwrap();

      setStatusName('');
      setIsAdding(false);
    } catch (error) {
      console.error('Failed to create status:', error);
      toast.error('Failed to create status');
    }
  };

  const handleCancel = () => {
    setIsAdding(false);
    setStatusName('');
  }

  const onPressKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      handleSubmit();
    }
    if (e.code === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={styles.AddNewStatus}>
      {isAdding ? (
        <>
          <Input
            label=''
            name='statusName'
            value={statusName}
            onChange={(e) => setStatusName(e.target.value)}
            placeholder="Status name"
            onKeyUp={onPressKey}
            autoFocus
          />
          <div className={styles.buttonGroup}>
            <button onClick={handleSubmit} className={styles.okButton}>Add</button>
            <button onClick={() => setIsAdding(false)} className={styles.cancelButton}>Cancel</button>
          </div>
        </>
      ) : (
        <button onClick={() => setIsAdding(true)} className={styles.addButton}>
          Add Status
        </button>
      )}
    </div>
  );
}
