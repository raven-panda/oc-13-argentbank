import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../Hooks';
import { transactionEnumRefsApi } from '../slices/enum-refs/TransactionEnumRefsSlice';

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
    dispatch(transactionEnumRefsApi.getPaymentTypes());
    dispatch(transactionEnumRefsApi.getCategories());
  }, [dispatch]);

  return {
    paymentTypes,
    categories,
    isLoading,
  };
}
