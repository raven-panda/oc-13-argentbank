import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks';
import { transactionEnumRefsActions } from '../slices/enum-refs/TransactionEnumRefsSlice';

export function useTransactionEnumReferences() {
  const dispatch = useAppDispatch();
  const paymentTypes = useAppSelector(
    (state) => state.transactionEnumRefs.paymentTypesItems,
  );
  const categories = useAppSelector(
    (state) => state.transactionEnumRefs.categoriesItems,
  );
  const isLoading = useAppSelector((state) => state.transactions.isLoading);

  useEffect(() => {
    dispatch(transactionEnumRefsActions.getPaymentTypes());
    dispatch(transactionEnumRefsActions.getCategories());
  }, [dispatch]);

  return {
    paymentTypes,
    categories,
    isLoading,
  };
}
