import { ProtocolCancerTypeEnum } from '@/types/swagger/data-contracts';

export const CANCER_TYPE_NAME: Record<ProtocolCancerTypeEnum, string> = {
  [ProtocolCancerTypeEnum.BreastCancer]: 'Breast Cancer',
  [ProtocolCancerTypeEnum.ProstateCancer]: 'Prostate Cancer',
  [ProtocolCancerTypeEnum.SkinCancer]: 'Skin Cancer',
  [ProtocolCancerTypeEnum.LungCancer]: 'Lung Cancer',
  [ProtocolCancerTypeEnum.ColorectalCancer]: 'Colorectal Cancer',
  [ProtocolCancerTypeEnum.Melanoma]: 'Melanoma',
  [ProtocolCancerTypeEnum.Lymphoma]: 'Lymphoma',
  [ProtocolCancerTypeEnum.Leukemia]: 'Leukemia',
  [ProtocolCancerTypeEnum.MultipleMyeloma]: 'Multiple Myeloma',
  [ProtocolCancerTypeEnum.OvarianCancer]: 'Ovarian Cancer',
  [ProtocolCancerTypeEnum.PancreaticCancer]: 'Pancreatic Cancer',
  [ProtocolCancerTypeEnum.Other]: 'Other',
} as const;
