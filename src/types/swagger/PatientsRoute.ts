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

import {
  CreatePatientData,
  DeletePatientData,
  GetPatientData,
  GetPatientsData,
  StorePatientRelativesData,
  StorePatientRelativesPayload,
  StorePatientRequest,
  UpdatePatientData,
  UpdatePatientRequest,
} from "./data-contracts";

export namespace Patients {
  /**
   * No description
   * @tags Patients
   * @name GetPatients
   * @summary List all patients
   * @request GET:/patients
   * @secure
   */
  export namespace GetPatients {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Name of the patient */
      name?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPatientsData;
  }

  /**
   * No description
   * @tags Patients
   * @name CreatePatient
   * @summary Create a new patient
   * @request POST:/patients
   * @secure
   */
  export namespace CreatePatient {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StorePatientRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreatePatientData;
  }

  /**
   * No description
   * @tags Patients
   * @name GetPatient
   * @summary Get patient details
   * @request GET:/patients/{id}
   * @secure
   */
  export namespace GetPatient {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPatientData;
  }

  /**
   * No description
   * @tags Patients
   * @name UpdatePatient
   * @summary Update a patient
   * @request PUT:/patients/{id}
   * @secure
   */
  export namespace UpdatePatient {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdatePatientRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UpdatePatientData;
  }

  /**
   * No description
   * @tags Patients
   * @name DeletePatient
   * @summary Delete a patient
   * @request DELETE:/patients/{id}
   * @secure
   */
  export namespace DeletePatient {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeletePatientData;
  }

  /**
   * No description
   * @tags Patients
   * @name StorePatientRelatives
   * @summary Store patient relatives
   * @request PUT:/patients/{id}/relatives
   * @secure
   */
  export namespace StorePatientRelatives {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = StorePatientRelativesPayload;
    export type RequestHeaders = {};
    export type ResponseBody = StorePatientRelativesData;
  }
}
