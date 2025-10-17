import type {
  TransactionCategoryType,
  TransactionPaymentType,
} from '@/definitions/api/bank-account';

export const transactionPaymentTypeReferencesFixture: {
  id: TransactionPaymentType;
  label: string;
}[] = [
  {
    id: 'ELECTRONIC',
    label: 'Electronic',
  },
];

export const transactionCategoryReferencesFixture: {
  id: TransactionCategoryType;
  label: string;
}[] = [
  {
    id: 'FOOD',
    label: 'Food',
  },
  {
    id: 'HEALTH',
    label: 'Health',
  },
  {
    id: 'HOBBIES',
    label: 'Hobbies',
  },
  {
    id: 'HOUSING',
    label: 'Housing',
  },
  {
    id: 'PETS',
    label: 'Pets',
  },
  {
    id: 'SCHOOL_STUDIES',
    label: 'School / Studies',
  },
  {
    id: 'TAXES',
    label: 'Taxes',
  },
  {
    id: 'VACATIONS',
    label: 'Vacations',
  },
  {
    id: 'VEHICLE',
    label: 'Vehicle',
  },
  {
    id: 'OTHER',
    label: 'Other',
  },
];
