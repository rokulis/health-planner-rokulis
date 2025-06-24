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

import { GetClinicData } from "./data-contracts";

export namespace Clinic {
  /**
   * No description
   * @tags Clinic
   * @name GetClinic
   * @summary Get clinic information
   * @request GET:/clinic
   * @secure
   */
  export namespace GetClinic {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetClinicData;
  }
}
