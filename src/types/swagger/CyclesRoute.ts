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
  GetCycleData,
  GetCyclesData,
  GetCyclesParams1StatusEnum,
} from "./data-contracts";

export namespace Cycles {
  /**
   * No description
   * @tags Treatment Cycles
   * @name GetCycle
   * @summary Get a single treatment cycle by ID
   * @request GET:/cycles/{id}
   * @secure
   */
  export namespace GetCycle {
    export type RequestParams = {
      /** Treatment Cycle ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCycleData;
  }

  /**
   * No description
   * @tags Treatment Cycles
   * @name GetCycles
   * @summary Get filtered list of treatment cycles
   * @request GET:/cycles
   * @secure
   */
  export namespace GetCycles {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter by one or more statuses */
      "status[]"?: GetCyclesParams1StatusEnum[];
      /** Filter by treatment plan ID */
      treatment_plan_id?: number;
      /** Filter by patient ID */
      patient_id?: number;
      /** Number of results per page (default: 15, max: 100) */
      per_page?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetCyclesData;
  }
}
