/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

type UtilRequiredKeys<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

/** @example "treatment" */
export enum VisitTreatmentType {
  Diagnostic = "diagnostic",
  Treatment = "treatment",
}

/** @example "upcoming" */
export enum VisitTreatmentStatus {
  Pending = "pending",
  Administering = "administering",
  Done = "done",
}

/** @example "upcoming" */
export enum VisitStatus {
  Completed = "completed",
  Cancelled = "cancelled",
  Upcoming = "upcoming",
  Draft = "draft",
}

/** Possible statuses for a visit */
export enum VisitStatusEnum {
  Upcoming = "upcoming",
  Completed = "completed",
  Stopped = "stopped",
  Draft = "draft",
}

export interface ApiResponse {
  /** @example true */
  success: boolean;
}

export interface StoreBedRequest {
  /** @example "Bed 1" */
  name: string;
  /** @example 1 */
  room_id: number;
  /** @example "standard" */
  category: StoreBedRequestCategoryEnum;
}

export interface UpdateBedRequest {
  /** @example "Bed 1" */
  name?: string;
  /** @example 1 */
  room_id?: number;
  /** @example "standard" */
  category?: UpdateBedRequestCategoryEnum;
}

export interface StorePatientRequest {
  /** @maxLength 255 */
  name: string;
  /** @format date */
  date_of_birth: string;
  /**
   * @format email
   * @maxLength 255
   */
  email: string;
  /** @maxLength 255 */
  phone_number?: string;
  /** @maxLength 255 */
  personal_code: string;
  /** @min 1 */
  weight: number;
  /** @min 1 */
  height: number;
  /** @maxLength 255 */
  address?: string;
  relatives?: BaseRelative[];
}

export interface UpdatePatientRequest {
  /** @maxLength 255 */
  name?: string;
  /** @format date */
  date_of_birth?: string;
  /**
   * @format email
   * @maxLength 255
   */
  email?: string;
  /** @maxLength 255 */
  phone_number?: string;
  /** @maxLength 255 */
  personal_code?: string;
  /** @min 1 */
  weight?: number;
  /** @min 1 */
  height?: number;
  /** @maxLength 255 */
  address?: string;
}

export type StoreProtocolRequest = UtilRequiredKeys<
  Protocol,
  "name" | "cycle_duration"
> & {
  /** List of medicine groups */
  medicine_groups: ProtocolMedicineGroup[];
};

export interface StoreRoomRequest {
  /** @example "Room 101" */
  name: string;
  /** @example 1 */
  sector_id: number;
  /**
   * @format time
   * @example "08:00"
   */
  work_start_time: string;
  /**
   * @format time
   * @example "17:00"
   */
  work_end_time: string;
  /** @example ["0","1","2","3","4","5","6"] */
  working_days: StoreRoomRequestWorkingDaysEnum[];
  beds?: {
    /** @example "Bed 1" */
    name?: string;
    /** @example "short_term" */
    category?: StoreRoomRequestCategoryEnum;
  }[];
}

export interface StoreTreatmentPlanRequest {
  /** @example "custom treatment plan name" */
  name?: string;
  /** @example 1 */
  diagnosis_id: number;
  /** @example 1 */
  patient_id: number;
  /** @example 1 */
  protocol_id: number;
  /** @example 1 */
  sector_id?: number;
  /**
   * Number of cycles
   * @example 10
   */
  cycles: number;
  /** @example 7 */
  days_between_cycles: number;
  treatment?: {
    protocol_id?: number;
    /** @example "custom treatment" */
    name?: string;
    medicine_groups?: {
      /** @example 1 */
      protocol_medicine_group_id?: number;
      duration?: number;
      treatment_days?: number[];
      medicines?: {
        medicine_id?: number;
        dose?: string;
        comment?: string;
      }[];
    }[];
  };
}

export interface UpdateTreatmentPlanRequest {
  patient_id?: number;
  protocol_id?: number;
  /** Number of cycles */
  cycles?: number;
  days_between_cycles?: number;
  status?: UpdateTreatmentPlanRequestStatusEnum;
  treatment_cycles?: {
    id?: number;
    name?: string;
    protocol_id?: number;
    status?: UpdateTreatmentPlanRequestStatusEnum1;
    cycle_number?: number;
    /** @format date */
    start_date?: string;
    /** @format date */
    end_date?: string;
    medicine_groups?: {
      id?: number;
      duration?: number;
      treatment_days?: number[];
      medicines?: {
        id?: number;
        medicine_id?: number;
        dose?: number;
        comment?: string;
      }[];
    }[];
  }[];
}

export type ClinicResource = Clinic & {
  users?: User[];
};

export interface DiagnosticResource {
  /** @example 1 */
  id?: number;
  /** @example "Diabetes" */
  name?: string;
  /** @example 30 */
  duration?: number;
  /** @example "diabetes" */
  slug?: string;
}

export interface PatientResource {
  id?: number;
  name?: string;
  clinic_id?: number;
  /** @format date */
  date_of_birth?: string;
  /** @format email */
  email?: string;
  phone_number?: string;
  personal_code?: string;
  weight?: number;
  height?: number;
  address?: string;
  treatment_plans?: TreatmentPlanResource[];
  relatives?: Relative[];
}

export type ProfileResource = User;

export type ProtocolResource = Protocol & {
  protocol_medicine_groups?: ProtocolMedicineGroup[];
};

export type RoomResource = Room & {
  beds?: Bed[];
};

export interface SectorResource {
  /** @example "1" */
  id?: number;
  /** @example "Oncology" */
  name?: string;
}

export interface TreatmentCycleResource {
  id?: number;
  treatment_plan_id?: number;
  protocol_id?: number;
  name?: string;
  status?: TreatmentCycleResourceStatusEnum;
  cycle_number?: number;
  /** @format date */
  start_date?: string;
  /** @format date */
  end_date?: string;
  treatment_medicine_groups?: TreatmentMedicineGroupResource[];
  /** Treatment protocol template */
  protocol?: Protocol;
  visits?: VisitResource[];
}

export interface TreatmentMedicineGroupResource {
  id?: number;
  treatment_cycle_id?: number;
  duration?: number;
  treatment_days?: number[];
  treatment_medicines?: TreatmentMedicineResource[];
}

export interface TreatmentMedicineResource {
  id?: number;
  treatment_medicine_group_id?: number;
  medicine_id?: number;
  /** @example "20mg/m2" */
  dose?: string;
  comment?: string;
  /** Medicine used in treatment protocols */
  medicine?: Medicine;
}

export interface TreatmentPlanResource {
  id?: number;
  /**
   * Name of the treatment plan
   * @example "Treatment plan 1"
   */
  name?: string;
  sector_id?: number;
  patient_id?: number;
  /** Number of cycles */
  cycles?: number;
  days_between_cycles?: number;
  status?: TreatmentPlanResourceStatusEnum;
  treatment?: TreatmentMedicineGroupResource[];
  diagnosis?: Diagnosis;
  /** @example 1 */
  diagnosis_id?: number;
  treatment_cycles?: TreatmentCycleResource[];
  patient?: PatientResource;
}

export interface VisitResource {
  id?: number;
  patient_id?: number;
  treatment_plan_id?: number;
  treatment_cycle_id?: number;
  room_id?: number;
  bed_id?: number;
  /** Possible statuses for a visit */
  status?: VisitStatusEnum;
  /** @format date-time */
  date_time?: string;
  /** @format date-time */
  end_time?: string;
  duration?: number;
  notes?: string;
  treatment_plan?: TreatmentPlanResource;
  patient?: PatientResource;
  /** Room within a clinic sector */
  room?: Room;
  /** Bed within a room */
  bed?: Bed;
  visit_treatments?: VisitTreatmentResource[];
}

export interface VisitTreatmentResource {
  /** @example 1 */
  id?: number;
  status?: VisitTreatmentStatus;
  type?: VisitTreatmentType;
  notes?: string;
  treatment_medicine_group?: TreatmentMedicineGroupResource;
  diagnostic_test?: DiagnosticResource;
}

/**
 * Bed
 * Bed within a room
 */
export interface Bed {
  /**
   * Bed ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the room this bed belongs to
   * @format int64
   * @example 1
   */
  room_id?: number;
  /**
   * Bed name or code
   * @example "B101"
   */
  name?: string;
  /**
   * Bed category: short_term (1-2h), mid_term (3-4h), long-term (5-7h)
   * @example "short_term"
   */
  category?: BedCategoryEnum;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Clinic
 * A medical clinic
 */
export interface Clinic {
  /**
   * Clinic ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Clinic name
   * @example "Memorial Cancer Center"
   */
  name: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

export interface Diagnosis {
  id: number;
  /**
   * Name of the diagnosis
   * @example "Leukemia"
   */
  name: string;
  /**
   * Description of the diagnosis
   * @example "Description of the diagnosis 1"
   */
  description?: string;
  /**
   * Code of the diagnosis
   * @example "Diagnosis 1"
   */
  code: string;
}

/**
 * Invitation
 * Invitation to join a clinic
 */
export interface Invitation {
  /**
   * Invitation ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this invitation is for
   * @format int64
   * @example 1
   */
  clinic_id: number;
  /**
   * Invitee's email address
   * @format email
   * @example "doctor@example.com"
   */
  email: string;
  /**
   * Unique token for this invitation
   * @example "abc123xyz789"
   */
  token: string;
  /**
   * Role for the invitee
   * @example "doctor"
   */
  role: InvitationRoleEnum;
  /**
   * When the invitation was accepted
   * @format date-time
   */
  accepted_at?: string | null;
  /**
   * When the invitation expires
   * @format date-time
   */
  expires_at?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Medicine
 * Medicine used in treatment protocols
 */
export interface Medicine {
  /**
   * Medicine ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this medicine belongs to
   * @format int64
   * @example 1
   */
  clinic_id?: number;
  /**
   * Medicine name
   * @example "Paclitaxel"
   */
  name?: string;
  /**
   * ATC code (e.g. L01XC07)
   * @example "L01CD01"
   */
  atc_code?: string;
  /**
   * Administration procedure
   * @example "iv"
   */
  procedure?: MedicineProcedureEnum;
  /**
   * Default time of the treatment
   * @example "Every 2 hours"
   */
  default_time?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Notification
 * Notification for users
 */
export interface Notification {
  /**
   * Notification ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the user this notification belongs to
   * @format int64
   * @example 1
   */
  user_id?: number;
  /**
   * Notification category: patient, task, appointment, collaborator, system_alert
   * @example "patient"
   */
  category?: string;
  /**
   * Notification type: email, mobile, desktop
   * @example "email"
   */
  type?: string;
  /**
   * Notification content
   * @example "New patient appointment scheduled"
   */
  content?: string;
  /**
   * Whether the notification has been read
   * @example false
   */
  read?: boolean;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Notification Configuration
 * User's notification preference settings
 */
export interface NotificationConfiguration {
  /**
   * Notification configuration ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the user this configuration belongs to
   * @format int64
   * @example 1
   */
  user_id?: number;
  /**
   * Notification category: patient, task, appointment, collaborator, system_alert
   * @example "patient"
   */
  category?: string;
  /**
   * Notification type: email, mobile, desktop
   * @example "email"
   */
  type?: string;
  /**
   * Whether notifications of this type are enabled
   * @example true
   */
  enabled?: boolean;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Patient
 * Patient receiving treatment
 */
export interface Patient {
  /**
   * Patient ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this patient belongs to
   * @format int64
   * @example 1
   */
  clinic_id: number;
  /**
   * ID of the user account for this patient (if any)
   * @format int64
   * @example 1
   */
  user_id?: number;
  /**
   * Patient name
   * @example "John Doe"
   */
  name: string;
  /**
   * Patient date of birth
   * @format date
   * @example "1980-01-01"
   */
  date_of_birth: string;
  /**
   * Patient email
   * @format email
   * @example "patient@example.com"
   */
  email?: string;
  /**
   * Patient phone number
   * @example "+1234567890"
   */
  phone_number?: string;
  /**
   * Patient personal identification code
   * @example "12345678901"
   */
  personal_code?: string;
  /**
   * Patient weight in grams
   * @example 70000
   */
  weight?: number;
  /**
   * Patient height in cm
   * @example 175
   */
  height?: number;
  /**
   * Patient address
   * @example "123 Main St"
   */
  address?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Protocol
 * Treatment protocol template
 */
export interface Protocol {
  /**
   * Protocol ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this protocol belongs to
   * @format int64
   * @example 1
   */
  clinic_id: number;
  /**
   * Protocol name
   * @example "AC-T Protocol"
   */
  name: string;
  diagnosis?: Diagnosis;
  /**
   * Duration of one cycle in days (e.g. 21 days)
   * @example 21
   */
  cycle_duration: number;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Protocol Medicine
 * Individual medicine in a protocol medicine group
 */
export interface ProtocolMedicine {
  /**
   * Protocol medicine ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the medicine
   * @format int64
   * @example 1
   */
  medicine_id: number;
  /**
   * ID of the protocol medicine group this belongs to
   * @format int64
   * @example 1
   */
  protocol_medicine_group_id?: number;
  /**
   * Dose in mg
   * @example "100mg"
   */
  dose: string;
  /**
   * Comments about administration
   * @example "Administer slowly"
   */
  comments?: string;
  /** Medicine used in treatment protocols */
  medicine?: Medicine;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Protocol Medicine Group
 * Group of medicines in a protocol to be administered together
 */
export interface ProtocolMedicineGroup {
  /**
   * Protocol medicine group ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the protocol this group belongs to
   * @format int64
   * @example 1
   */
  protocol_id?: number;
  /**
   * Duration of treatment in seconds
   * @example 3600
   */
  duration: number;
  /**
   * Days in the cycle when this group should be administered
   * @example "[1, 2, 8]"
   */
  treatment_days: number[];
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
  protocol_medicines?: ProtocolMedicine[];
}

/**
 * Relative
 * Patient's relative or emergency contact
 */
export type Relative = UtilRequiredKeys<BaseRelative, "name" | "kinship"> & {
  /**
   * Relative ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the patient this relative belongs to
   * @format int64
   * @example 1
   */
  patient_id?: number;
  /**
   * Relative name
   * @example "Jane Doe"
   */
  name: string;
  /**
   * Relationship to patient (e.g., Husband, Father)
   * @example "Spouse"
   */
  kinship: string;
  /**
   * Relative email
   * @format email
   * @example "jane.doe@example.com"
   */
  email?: string;
  /**
   * Relative phone number
   * @example "+1234567890"
   */
  phone_number?: string;
  /**
   * Relative address
   * @example "123 Main St"
   */
  address?: string;
};

export interface BaseRelative {
  /**
   * Relative name
   * @example "Jane Doe"
   */
  name: string;
  /**
   * Relationship to patient (e.g., Husband, Father)
   * @example "Spouse"
   */
  kinship: string;
  /**
   * Relative email
   * @format email
   * @example "jane.doe@example.com"
   */
  email?: string;
  /**
   * Relative phone number
   * @example "+1234567890"
   */
  phone_number?: string;
  /**
   * Relative address
   * @example "123 Main St"
   */
  address?: string;
}

/**
 * Room
 * Room within a clinic sector
 */
export interface Room {
  /**
   * Room ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this room belongs to
   * @format int64
   * @example 1
   */
  clinic_id?: number;
  /**
   * ID of the sector this room belongs to
   * @format int64
   * @example 1
   */
  sector_id?: number;
  /**
   * Room name or code
   * @example "R101"
   */
  name?: string;
  /**
   * Room work start time
   * @format time
   * @example "08:00"
   */
  work_start_time?: string;
  /**
   * Room work end time
   * @format time
   * @example "18:00"
   */
  work_end_time?: string;
  /**
   * Room working days
   * @example "[0, 1, 2, 3, 4, 5, 6]"
   */
  working_days?: RoomWorkingDaysEnum[];
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Sector
 * A sector within a clinic (e.g., Oncology Wing, Radiology Department)
 */
export interface Sector {
  /**
   * Sector ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the clinic this sector belongs to
   * @format int64
   * @example 1
   */
  clinic_id: number;
  /**
   * Sector name
   * @example "Oncology Wing"
   */
  name: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Treatment Cycle
 * One cycle of treatment within a treatment plan
 */
export interface TreatmentCycle {
  /**
   * Treatment cycle ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Optional name/override for the cycle
   * @example "Cycle 1"
   */
  name?: string;
  /**
   * ID of the treatment plan this cycle belongs to
   * @format int64
   * @example 1
   */
  treatment_plan_id: number;
  /**
   * ID of the protocol used for this cycle
   * @format int64
   * @example 1
   */
  protocol_id: number;
  /**
   * Current status of the cycle
   * @example "in_progress"
   */
  status: TreatmentCycleStatusEnum;
  /**
   * Which cycle number this is
   * @example 1
   */
  cycle_number: number;
  /**
   * Start date of the cycle
   * @format date
   * @example "2023-06-01"
   */
  start_date?: string;
  /**
   * End date of the cycle
   * @format date
   * @example "2023-06-21"
   */
  end_date?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Treatment Medicine
 * A specific medicine within a treatment medicine group
 */
export interface TreatmentMedicine {
  /**
   * Treatment medicine ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the treatment medicine group this belongs to
   * @format int64
   * @example 1
   */
  treatment_medicine_group_id: number;
  /**
   * ID of the medicine
   * @format int64
   * @example 1
   */
  medicine_id: number;
  /**
   * ID of the protocol medicine this is based on
   * @format int64
   * @example 1
   */
  protocol_medicine_id: number;
  /**
   * Dose of the medicine
   * @example "100mg"
   */
  dose: string;
  /**
   * Additional comments/instructions
   * @example "Take with food"
   */
  comments?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Treatment Medicine Group
 * A group of medicines within a treatment cycle, based on the protocol's medicine group
 */
export interface TreatmentMedicineGroup {
  /**
   * Treatment medicine group ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the treatment cycle this group belongs to
   * @format int64
   * @example 1
   */
  treatment_cycle_id: number;
  /**
   * ID of the protocol medicine group this is based on
   * @format int64
   * @example 1
   */
  protocol_medicine_group_id: number;
  /**
   * Start date for this medicine group
   * @format date
   * @example "2023-06-01"
   */
  start_date?: string;
  /**
   * End date for this medicine group
   * @format date
   * @example "2023-06-07"
   */
  end_date?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Treatment Plan
 * Overall treatment plan for a patient
 */
export interface TreatmentPlan {
  /**
   * Treatment plan ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the patient this plan belongs to
   * @format int64
   * @example 1
   */
  patient_id: number;
  /**
   * Number of cycles planned
   * @example 6
   */
  cycles: number;
  /**
   * Days between cycles
   * @example 21
   */
  days_between_cycles: number;
  /** @example 1 */
  diagnosis_id: number;
  /**
   * Current status of the treatment plan
   * @example "in_progress"
   */
  status: TreatmentPlanStatusEnum;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * User
 * Application user
 */
export interface User {
  /**
   * User ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * Clinic ID
   * @format int64
   * @example 1
   */
  clinic_id?: number;
  /**
   * User's full name
   * @example "John Doe"
   */
  name: string;
  /**
   * User's email address
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * When the email was verified
   * @format date-time
   * @example "2023-01-01 12:00:00"
   */
  email_verified_at?: string;
  /**
   * User's role
   * @example "doctor"
   */
  role: UserRoleEnum;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Visit
 * A patient's visit to the clinic
 */
export interface Visit {
  /**
   * Visit ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the patient
   * @format int64
   * @example 1
   */
  patient_id: number;
  /**
   * ID of the room for the visit
   * @format int64
   * @example 1
   */
  room_id?: number;
  /**
   * ID of the bed for the visit
   * @format int64
   * @example 1
   */
  bed_id?: number;
  /**
   * ID of the treatment plan this visit is for
   * @format int64
   * @example 1
   */
  treatment_plan_id?: number;
  /**
   * Date of the visit
   * @format date
   * @example "2023-06-01"
   */
  date_time?: string;
  /**
   * Start time of the visit
   * @format time
   * @example "09:00:00"
   */
  time_from: string;
  /**
   * End time of the visit
   * @format time
   * @example "11:00:00"
   */
  time_to: string;
  status: VisitStatus;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/**
 * Visit Treatment
 * A specific treatment administered during a visit
 */
export interface VisitTreatment {
  /**
   * Visit treatment ID
   * @format int64
   * @example 1
   */
  id?: number;
  /**
   * ID of the visit
   * @format int64
   * @example 1
   */
  visit_id: number;
  /**
   * ID of the room where treatment is administered
   * @format int64
   * @example 1
   */
  room_id?: number;
  /**
   * ID of the bed where treatment is administered
   * @format int64
   * @example 1
   */
  bed_id?: number;
  /**
   * ID of the treatment medicine
   * @format int64
   * @example 1
   */
  treatment_medicine_id?: number;
  /**
   * ID of the diagnostic
   * @format int64
   * @example 1
   */
  diagnostic_id?: number;
  /**
   * Actual dose administered (can override the planned dose)
   * @example "100mg"
   */
  dose?: string;
  /**
   * When the treatment was administered
   * @format date-time
   * @example "2023-06-01 10:00:00"
   */
  administered_at?: string;
  status: VisitTreatmentStatus;
  type: VisitTreatmentType;
  /**
   * Notes about the treatment administration
   * @example "Patient tolerated well"
   */
  notes?: string;
  /**
   * Creation date
   * @format date-time
   */
  created_at?: string;
  /**
   * Last update date
   * @format date-time
   */
  updated_at?: string;
}

/** @example "standard" */
export enum StoreBedRequestCategoryEnum {
  Standard = "standard",
  Premium = "premium",
  Vip = "vip",
}

/** @example "standard" */
export enum UpdateBedRequestCategoryEnum {
  Standard = "standard",
  Premium = "premium",
  Vip = "vip",
}

/** @example "1" */
export enum StoreRoomRequestWorkingDaysEnum {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

/** @example "short_term" */
export enum StoreRoomRequestCategoryEnum {
  ShortTerm = "short_term",
  MidTerm = "mid_term",
  LongTerm = "long_term",
}

export enum UpdateTreatmentPlanRequestStatusEnum {
  InProgress = "in_progress",
  Completed = "completed",
  Stopped = "stopped",
  Paused = "paused",
}

export enum UpdateTreatmentPlanRequestStatusEnum1 {
  InProgress = "in_progress",
  Completed = "completed",
  Stopped = "stopped",
  Paused = "paused",
}

export enum TreatmentCycleResourceStatusEnum {
  InProgress = "in_progress",
  Completed = "completed",
  Stopped = "stopped",
  Paused = "paused",
}

export enum TreatmentPlanResourceStatusEnum {
  Draft = "draft",
  Confirmed = "confirmed",
}

/**
 * Bed category: short_term (1-2h), mid_term (3-4h), long-term (5-7h)
 * @example "short_term"
 */
export enum BedCategoryEnum {
  ShortTerm = "short_term",
  MidTerm = "mid_term",
  LongTerm = "long_term",
}

/**
 * Role for the invitee
 * @example "doctor"
 */
export enum InvitationRoleEnum {
  Admin = "admin",
  Doctor = "doctor",
  Nurse = "nurse",
  Receptionist = "receptionist",
}

/**
 * Administration procedure
 * @example "iv"
 */
export enum MedicineProcedureEnum {
  Iv = "iv",
  Sc = "sc",
  OralTablet = "oral_tablet",
  OralCapsule = "oral_capsule",
}

/** 0=Monday, 1=Tuesday, 2=Wednesday, 3=Thursday, 4=Friday, 5=Saturday, 6=Sunday */
export enum RoomWorkingDaysEnum {
  Value0 = 0,
  Value1 = 1,
  Value2 = 2,
  Value3 = 3,
  Value4 = 4,
  Value5 = 5,
  Value6 = 6,
}

/**
 * Current status of the cycle
 * @example "in_progress"
 */
export enum TreatmentCycleStatusEnum {
  Completed = "completed",
  InProgress = "in_progress",
  Stopped = "stopped",
  Paused = "paused",
}

/**
 * Current status of the treatment plan
 * @example "in_progress"
 */
export enum TreatmentPlanStatusEnum {
  Completed = "completed",
  InProgress = "in_progress",
  Stopped = "stopped",
  Paused = "paused",
}

/**
 * User's role
 * @example "doctor"
 */
export enum UserRoleEnum {
  Admin = "admin",
  Doctor = "doctor",
  Nurse = "nurse",
  Receptionist = "receptionist",
}

export interface LoginPayload {
  /**
   * @format email
   * @example "doctor@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "password123"
   */
  password: string;
}

export interface LoginData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." */
    token?: string;
    /** Application user */
    user?: User;
  };
}

export interface RegisterPayload {
  /** @example "John Doe" */
  name: string;
  /**
   * @format email
   * @example "john@example.com"
   */
  email: string;
  /**
   * @format password
   * @example "password123"
   */
  password: string;
  /** @example "password123" */
  password_confirmation: string;
  /** @example "abc123xyz789" */
  invitation_token: string;
}

export interface RegisterData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9..." */
    token?: string;
    /** Application user */
    user?: User;
  };
}

export interface LogoutData {
  /** @example true */
  success?: boolean;
}

export interface GetDiagnosesParams {
  /** Search term */
  search?: string;
}

export interface GetDiagnosesData {
  /** @example true */
  success?: boolean;
  data?: Diagnosis[];
}

export interface GetInvitationsData {
  /** @example true */
  success?: boolean;
  data?: Invitation[];
}

/** @example "doctor" */
export enum CreateInvitationRoleEnum {
  Admin = "admin",
  Doctor = "doctor",
  Nurse = "nurse",
  Receptionist = "receptionist",
}

export interface CreateInvitationPayload {
  /**
   * @format email
   * @example "doctor@example.com"
   */
  email: string;
  /** @example "doctor" */
  role: CreateInvitationRoleEnum;
}

export interface CreateInvitationData {
  /** @example true */
  success?: boolean;
  /** Invitation to join a clinic */
  data?: Invitation;
}

export interface CancelInvitationData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example "Invitation cancelled successfully" */
    message?: string;
  };
}

export interface ValidateInvitationData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example "user@example.com" */
    email?: string;
    /** @example "doctor" */
    role?: string;
    /** @example 1 */
    clinic_id?: number;
  };
}

export interface GetMedicinesParams {
  /** Name of the medicine */
  name?: string;
  /** ATC code of the medicine */
  code?: string;
}

export interface GetMedicinesData {
  /** @example true */
  success?: boolean;
  data?: Medicine[];
}

/** @example "iv" */
export enum CreateMedicineProcedureEnum {
  Iv = "iv",
  Sc = "sc",
  OralCapsule = "oral_capsule",
  OralTablet = "oral_tablet",
}

export interface CreateMedicinePayload {
  /** @example "Paracetamol" */
  name: string;
  /** @example "N02BE01" */
  atc_code?: string;
  /** @example "iv" */
  procedure: CreateMedicineProcedureEnum;
  /** @example "01:30" */
  default_time?: string;
}

export interface CreateMedicineData {
  /** @example true */
  success?: boolean;
  /** Medicine used in treatment protocols */
  data?: Medicine;
}

export interface GetMedicineData {
  /** @example true */
  success?: boolean;
  /** Medicine used in treatment protocols */
  data?: Medicine;
}

/** @example "iv" */
export enum UpdateMedicineProcedureEnum {
  Iv = "iv",
  Sc = "sc",
  OralCapsule = "oral_capsule",
  OralTablet = "oral_tablet",
}

export interface UpdateMedicinePayload {
  /** @example "Paracetamol" */
  name: string;
  /** @example "N02BE01" */
  atc_code: string;
  /** @example "iv" */
  procedure: UpdateMedicineProcedureEnum;
  /** @example "01:30" */
  default_time?: string;
}

export interface UpdateMedicineData {
  /** @example true */
  success?: boolean;
  /** Medicine used in treatment protocols */
  data?: Medicine;
}

export interface DeleteMedicineData {
  /** @example true */
  success?: boolean;
  /** @example "Medicine deleted successfully" */
  message?: string;
}

export interface GetPatientsParams {
  /** Name of the patient */
  name?: string;
}

export interface GetPatientsData {
  /** @example true */
  success?: boolean;
  data?: PatientResource[];
}

export interface CreatePatientData {
  /** @example true */
  success?: boolean;
  data?: PatientResource;
}

export interface GetPatientData {
  /** @example true */
  success?: boolean;
  data?: PatientResource;
}

export interface UpdatePatientData {
  /** @example true */
  success?: boolean;
}

export interface DeletePatientData {
  /** @example true */
  success?: boolean;
}

export type StorePatientRelativesPayload = Relative[];

export interface StorePatientRelativesData {
  /** @example true */
  success?: boolean;
}

export interface GetProfileData {
  /** @example true */
  success?: boolean;
  data?: ProfileResource;
}

export interface UpdateUserProfilePayload {
  /**
   * Updated name
   * @example "John Doe"
   */
  name?: string;
  /**
   * Updated email
   * @format email
   * @example "john.doe@example.com"
   */
  email?: string;
  /**
   * New password
   * @format password
   * @example "newpassword123"
   */
  password?: string;
}

export type UpdateUserProfileData = ApiResponse;

export interface GetProtocolsParams {
  /** Name of the protocol */
  name?: string;
}

export interface GetProtocolsData {
  /** @example true */
  success?: boolean;
  data?: ProtocolResource[];
}

export interface CreateProtocolData {
  /** @example true */
  success?: boolean;
  /** Treatment protocol template */
  data?: Protocol;
}

export interface GetProtocolData {
  /** @example true */
  success?: boolean;
  data?: ProtocolResource;
}

export interface UpdateProtocolData {
  /** @example true */
  success?: boolean;
  data?: ProtocolResource;
}

export interface DeleteProtocolData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example "Protocol deleted successfully" */
    message?: string;
  };
}

export interface GetAllRoomsParams {
  /** Filter rooms by sector ID */
  sector_id?: number;
}

export interface GetAllRoomsData {
  /** @example true */
  success?: boolean;
  data?: RoomResource[];
}

export interface CreateRoomData {
  /** @example true */
  success?: boolean;
  /** Room within a clinic sector */
  data?: Room;
}

export interface GetRoomData {
  /** @example true */
  success?: boolean;
  /** Room within a clinic sector */
  data?: Room;
}

export type UpdateRoomPayload = Room & {
  beds?: Bed[];
};

export interface UpdateRoomData {
  /** @example true */
  success?: boolean;
  /** Room within a clinic sector */
  data?: Room;
}

export interface Cf9104Dbefd91A81Bebb07Cafe7E70CfData {
  /** @example true */
  success?: boolean;
}

export interface GetScheduleParams {
  /** @format date */
  date: string;
  sector_id?: number;
}

export interface GetScheduleData {
  /** @example true */
  success?: boolean;
  data?: VisitResource[];
}

export interface GetOpenSlotsParams {
  /** @format date */
  date: string;
  sector_id?: number;
  duration?: number;
}

export interface GetOpenSlotsData {
  /** @example true */
  success?: boolean;
  data?: {
    /** @example 1 */
    id?: number;
    /** @example "Room 1" */
    name?: string;
    beds?: {
      /** @example 1 */
      id?: number;
      /** @example "Bed 1" */
      name?: string;
      times?: string[];
    }[];
  }[];
}

export interface GetSectorsData {
  /** @example true */
  success?: boolean;
  data?: SectorResource[];
}

export interface GetTreatmentPlansData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource[];
}

export interface CreateTreatmentPlanData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource;
}

export interface GetPatientTreatmentPlansData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource[];
}

export interface PlanVisitsPayload {
  /** @example "2022-01-01" */
  start_date?: string;
  /** @example "11:00" */
  start_time?: string;
}

export interface PlanVisitsData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource;
}

export interface ConfirmTreatmentPlanData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource;
}

export interface GetTreatmentPlanData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource;
}

export interface UpdateTreatmentPlanData {
  /** @example true */
  success?: boolean;
  data?: TreatmentPlanResource;
}

export interface DeleteTreatmentPlanData {
  /** @example true */
  success?: boolean;
}

export interface CancelTreatmentPlanData {
  /** @example true */
  success?: boolean;
}

export interface GetVisitData {
  /** @example true */
  success?: boolean;
  data?: VisitResource;
}

export interface ChangeVisitTreatmentStatusPayload {
  status?: VisitTreatmentStatus;
}

export interface ChangeVisitTreatmentStatusData {
  /** @example true */
  success?: boolean;
  data?: VisitResource;
}

export interface ChangeVisitStatusPayload {
  status?: VisitStatus;
}

export interface ChangeVisitStatusData {
  /** @example true */
  success?: boolean;
  data?: VisitResource;
}

export interface RescheduleVisitPayload {
  /** @example "2022-01-01" */
  start_date?: string;
  /** @example "11:00" */
  start_time?: string;
}

export interface RescheduleVisitData {
  /** @example true */
  success?: boolean;
}

export interface GetWorkspaceData {
  /** @example true */
  success?: boolean;
  data?: ClinicResource;
}
