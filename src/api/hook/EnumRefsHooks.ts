import { useQuery } from '@tanstack/react-query';
import {
  getTransactionCategoriesEnumReferences,
  getTransactionPaymentTypesEnumReferences,
} from '../enum-references-api-queries';
import type { ApiResponse } from '../definitions/api-response';
import type { EnumReferences } from '../definitions/enum-reference';

export function useTransactionEnumReferences() {
  const { data: paymentTypes, isLoading: isPaymentTypesLoading } = useQuery<
    ApiResponse<EnumReferences | undefined>
  >({
    queryKey: ['getTransactionPaymentTypesEnumReferences'],
    queryFn: async () => await getTransactionPaymentTypesEnumReferences(),
    retry: false,
  });
  const { data: categories, isLoading: isCategoriesLoading } = useQuery<
    ApiResponse<EnumReferences | undefined>
  >({
    queryKey: ['getTransactionCategoriesEnumReferences'],
    queryFn: async () => await getTransactionCategoriesEnumReferences(),
    retry: false,
  });

  return {
    paymentTypes: paymentTypes?.body,
    categories: categories?.body,
    isLoading: isPaymentTypesLoading || isCategoriesLoading,
  };
}
