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

import { GetSectorsData } from "./data-contracts";

export namespace Sectors {
  /**
   * No description
   * @tags Sectors
   * @name GetSectors
   * @summary List all departments
   * @request GET:/sectors
   * @secure
   */
  export namespace GetSectors {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetSectorsData;
  }
}
