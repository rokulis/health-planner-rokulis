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

import { StartCycleData } from "./data-contracts";

export namespace TreatmentCycles {
  /**
   * No description
   * @tags Treatment Cycles
   * @name StartCycle
   * @summary Start treatment cycle
   * @request POST:/treatment-cycles/{id}/start
   * @secure
   */
  export namespace StartCycle {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: any;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = StartCycleData;
  }
}
