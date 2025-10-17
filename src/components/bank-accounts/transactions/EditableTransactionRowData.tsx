import { useState } from 'react';
import type { Transaction } from '../../../api/definitions/bank-account';
import { useEditBankAccountTransaction } from '../../../api/hook/BankAccountsHooks';
import styles from '../../../assets/css/components/table.module.css';
import type { EnumReferences } from '../../../api/definitions/enum-reference';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faCross, faPen } from '@fortawesome/free-solid-svg-icons';
import SelectInput from '../../form/input/SelectInput';

export default function EditableTransactionRowData({
  transaction,
  categories,
  isRefsLoading,
}: {
  transaction: Transaction;
  categories: EnumReferences | undefined;
  isRefsLoading: boolean;
}) {
  const [isEditingCategory, setEditingCategory] = useState(false);
  const [isEditingNotes, setEditingNotes] = useState(false);
  const [editedCategory, setEditedCategory] = useState(transaction.category);
  const [editedUserNote, setEditedUserNote] = useState(transaction.userNotes);
  const { editBankAccountTransaction, isLoading: isEditTransactionLoading } =
    useEditBankAccountTransaction();

  const getCategoryLabel = () => {
    if (isRefsLoading) return 'Loading...';

    return (
      categories?.find((c) => c.id === transaction.category)?.label ??
      'Not defined'
    );
  };

  const toggleEditCategory = async (cancel: boolean = false) => {
    if (isEditTransactionLoading) return;

    if (isEditingCategory && !cancel)
      await editBankAccountTransaction({
        ...transaction,
        category: editedCategory,
      });

    setEditedCategory(transaction.userNotes);
    setEditingCategory((prev) => !prev);
  };

  const toggleEditNotes = async (cancel: boolean = false) => {
    if (isEditTransactionLoading) return;

    if (isEditingNotes && !cancel)
      await editBankAccountTransaction({
        ...transaction,
        userNotes: editedUserNote,
      });

    setEditedUserNote(transaction.userNotes);
    setEditingNotes((prev) => !prev);
  };

  return isEditTransactionLoading ? (
    <p>Loading...</p>
  ) : (
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
            <FontAwesomeIcon icon={faCross} />
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
            <FontAwesomeIcon icon={faCross} />
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
