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

import { PlanCycleData } from "./data-contracts";

export namespace TreatmentCycles {
  /**
   * No description
   * @tags Treatment Cycles
   * @name PlanCycle
   * @summary Plan a treatment cycle
   * @request POST:/treatment-cycles/{id}/plan
   * @secure
   */
  export namespace PlanCycle {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: any;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = PlanCycleData;
  }
}
