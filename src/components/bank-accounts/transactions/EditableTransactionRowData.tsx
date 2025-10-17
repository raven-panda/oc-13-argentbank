import type { Transaction } from '@/api/definitions/bank-account';
import type { EnumReferences } from '@/api/definitions/enum-reference';
import { useAppDispatch } from '@/api/Hooks';
import { transactionsApi } from '@/api/slices/transactionsSlice';
import styles from '@/assets/css/components/table.module.css';
import SelectInput from '@/components/form/input/SelectInput';
import { faCheck, faPen, faX } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

export default function EditableTransactionRowData({
  transaction,
  categories,
  isRefsLoading,
}: {
  transaction: Transaction;
  categories: EnumReferences | undefined;
  isRefsLoading: boolean;
}) {
  const dispatch = useAppDispatch();

  const [isEditingCategory, setEditingCategory] = useState(false);
  const [isEditingNotes, setEditingNotes] = useState(false);
  const [editedCategory, setEditedCategory] = useState(transaction.category);
  const [editedUserNote, setEditedUserNote] = useState(transaction.userNotes);

  const getCategoryLabel = () => {
    if (isRefsLoading) return 'Loading...';

    return (
      categories?.find((c) => c.id === transaction.category)?.label ??
      'Not defined'
    );
  };

  const toggleEditCategory = async (cancel: boolean = false) => {
    if (isEditingCategory && !cancel)
      await dispatch(
        transactionsApi.update({
          ...transaction,
          category: editedCategory,
        }),
      );

    setEditedCategory(transaction.userNotes);
    setEditingCategory((prev) => !prev);
  };

  const toggleEditNotes = async (cancel: boolean = false) => {
    if (isEditingNotes && !cancel)
      await dispatch(
        transactionsApi.update({
          ...transaction,
          userNotes: editedUserNote,
        }),
      );

    setEditedUserNote(transaction.userNotes);
    setEditingNotes((prev) => !prev);
  };

  return (
    <>
      <div className={styles.transactionEditDetail}>
        <p>
          <strong>Category : </strong>
          {!isEditingCategory && getCategoryLabel()}
        </p>
        {isEditingCategory && (
          <SelectInput
            onChange={setEditedCategory}
            defaultValue={transaction.category}
            choices={categories ?? []}
          />
        )}
        <button onClick={() => toggleEditCategory()}>
          <FontAwesomeIcon icon={isEditingCategory ? faCheck : faPen} />
        </button>
        {isEditingCategory && (
          <button onClick={() => toggleEditCategory(true)}>
            <FontAwesomeIcon icon={faX} />
          </button>
        )}
      </div>
      <div className={styles.transactionEditDetail}>
        <p>
          <strong>Notes : </strong>
        </p>
        <button onClick={() => toggleEditNotes()}>
          <FontAwesomeIcon icon={isEditingNotes ? faCheck : faPen} />
        </button>
        {isEditingNotes && (
          <button onClick={() => toggleEditNotes(true)}>
            <FontAwesomeIcon icon={faX} />
          </button>
        )}
      </div>
      {isEditingNotes ? (
        <textarea
          onChange={(e) => setEditedUserNote(e.target.value)}
          defaultValue={editedUserNote}
        ></textarea>
      ) : (
        <p>{transaction.userNotes}</p>
      )}
    </>
  );
}
