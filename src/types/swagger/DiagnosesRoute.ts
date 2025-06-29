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

import { GetDiagnosesData } from "./data-contracts";

export namespace Diagnoses {
  /**
   * No description
   * @tags Diagnoses
   * @name GetDiagnoses
   * @summary Get a list of diagnoses
   * @request GET:/diagnoses
   * @secure
   */
  export namespace GetDiagnoses {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Search term */
      search?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetDiagnosesData;
  }
}
