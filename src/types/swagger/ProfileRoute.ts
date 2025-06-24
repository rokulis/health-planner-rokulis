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
  UpdateUserProfileData,
  UpdateUserProfilePayload,
} from "./data-contracts";

export namespace Profile {
  /**
   * No description
   * @tags Profile
   * @name UpdateUserProfile
   * @summary Update user's profile
   * @request PUT:/profile
   * @secure
   */
  export namespace UpdateUserProfile {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = UpdateUserProfilePayload;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateUserProfileData;
  }
}
