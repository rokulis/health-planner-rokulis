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
  ChangeVisitStatusData,
  ChangeVisitStatusPayload,
  ChangeVisitTreatmentStatusData,
  ChangeVisitTreatmentStatusPayload,
  CreateVisitData,
  CreateVisitPayload,
  GetVisitData,
  GetVisitsData,
  GetVisitsParams1StatusEnum,
  RescheduleVisitData,
  RescheduleVisitPayload,
  UpdateVisitData,
  UpdateVisitPayload,
} from "./data-contracts";

export namespace Visits {
  /**
   * No description
   * @tags Visits
   * @name GetVisit
   * @summary getVisit
   * @request GET:/visits/{id}
   * @secure
   */
  export namespace GetVisit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetVisitData;
  }

  /**
   * No description
   * @tags Visits
   * @name UpdateVisit
   * @summary Update visit
   * @request PUT:/visits/{id}
   * @secure
   */
  export namespace UpdateVisit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateVisitPayload;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateVisitData;
  }

  /**
   * No description
   * @tags Visits
   * @name ChangeVisitTreatmentStatus
   * @summary Change visit treatment status
   * @request POST:/visits/{id}/treatments/{treatmentId}/change-status
   * @secure
   */
  export namespace ChangeVisitTreatmentStatus {
    export type RequestParams = {
      id: number;
      treatmentId: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ChangeVisitTreatmentStatusPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ChangeVisitTreatmentStatusData;
  }

  /**
   * No description
   * @tags Visits
   * @name ChangeVisitStatus
   * @summary Change visit status
   * @request POST:/visits/{id}/change-status
   * @secure
   */
  export namespace ChangeVisitStatus {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = ChangeVisitStatusPayload;
    export type RequestHeaders = {};
    export type ResponseBody = ChangeVisitStatusData;
  }

  /**
   * No description
   * @tags Visits
   * @name RescheduleVisit
   * @summary Reschedule visit
   * @request POST:/visits/{id}/reschedule
   * @secure
   */
  export namespace RescheduleVisit {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = RescheduleVisitPayload;
    export type RequestHeaders = {};
    export type ResponseBody = RescheduleVisitData;
  }

  /**
   * No description
   * @tags Visits
   * @name GetVisits
   * @summary Get filtered list of visits
   * @request GET:/visits
   * @secure
   */
  export namespace GetVisits {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by one or more statuses */
      "status[]"?: GetVisitsParams1StatusEnum[];
      /** Filter by treatment cycle ID */
      cycle_id?: number;
      /** Filter by patient ID */
      patient_id?: number;
      /** Filter by treatment plan ID */
      treatment_plan_id?: number;
      /**
       * Filter visits from this date (Y-m-d format)
       * @format date
       */
      date_from?: string;
      /**
       * Filter visits until this date (Y-m-d format)
       * @format date
       */
      date_to?: string;
      /** Number of results per page (default: 15, max: 100) */
      per_page?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetVisitsData;
  }

  /**
   * No description
   * @tags Visits
   * @name CreateVisit
   * @summary Create visit
   * @request POST:/visits
   * @secure
   */
  export namespace CreateVisit {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateVisitPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateVisitData;
  }
}
