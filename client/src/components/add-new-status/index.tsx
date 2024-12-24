import { useCreateTaskStatusMutation } from '@/services/task-statuses.ts';
import { useState } from 'react';
import { useAppSelector } from '@/lib/store.ts';
import Input from '@/components/input';
import styles from './styles.module.scss';
import { ButtonWithIcon } from '@/components/button-with-iIcon';

export function AddNewStatus() {
  const [createStatus] = useCreateTaskStatusMutation();
  const currentProject = useAppSelector(state => state.projects.currentProject);
  const [isAdding, setIsAdding] = useState(false);
  const [newStatus, setNewStatus] = useState('');

  const handleAddColumn = async () => {
    if (!newStatus || !newStatus.trim() || !currentProject) {
      return;
    }

    try {
      const status = await createStatus({
        name: newStatus.trim(),
        projectId: currentProject.id,
      }).unwrap();

      if (status) {
        setNewStatus('');
        setIsAdding(false);
      }
    } catch (error) {
      console.error('Failed to create status:', error);
    }
  };

  return (
    <div className={styles.AddNewStatus}>
      {isAdding ? (
        <div className="">
          <Input
            label=""
            name="new-status"
            type="text"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
            placeholder="Satus name"
          />
          <div className={styles.buttonGroup}>
            <ButtonWithIcon onClick={handleAddColumn} text="Add" className={styles.okButton} />
            <ButtonWithIcon onClick={() => setIsAdding(false)} text="Cancel" className={styles.cancelButton} />
          </div>
        </div>
      ) : (
        <ButtonWithIcon
          onClick={() => setIsAdding(true)}
          text="Add Status"
          className={styles.addButton}
          icon="RiAddLine"
        />
      )}
    </div>
  );
}
