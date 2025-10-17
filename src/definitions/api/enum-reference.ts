interface EnumReference {
  id: string;
  label: string;
}

export type EnumReferences = EnumReference[];

export interface TransactionEnumReferences {
  paymentTypes: EnumReferences;
  categories: EnumReferences;
}
