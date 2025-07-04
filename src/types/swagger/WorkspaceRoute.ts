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

import { GetWorkspaceData } from "./data-contracts";

export namespace Workspace {
  /**
   * No description
   * @tags Workspace
   * @name GetWorkspace
   * @summary Get workspace information
   * @request GET:/workspace
   * @secure
   */
  export namespace GetWorkspace {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetWorkspaceData;
  }
}
