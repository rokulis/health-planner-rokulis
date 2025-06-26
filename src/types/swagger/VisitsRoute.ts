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
  GetVisitData,
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
}
