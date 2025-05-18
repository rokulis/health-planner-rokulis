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
  LoginData,
  LoginPayload,
  LogoutData,
  RegisterData,
  RegisterPayload,
} from "./data-contracts";

export namespace Auth {
  /**
   * @description Login with email and password
   * @tags Authentication
   * @name Login
   * @summary User login
   * @request POST:/auth/login
   */
  export namespace Login {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = LoginPayload;
    export type RequestHeaders = {};
    export type ResponseBody = LoginData;
  }

  /**
   * @description Register a new user with invitation token
   * @tags Authentication
   * @name Register
   * @summary Register a new user
   * @request POST:/auth/register
   */
  export namespace Register {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = RegisterPayload;
    export type RequestHeaders = {};
    export type ResponseBody = RegisterData;
  }

  /**
   * @description Invalidate the user's token
   * @tags Authentication
   * @name Logout
   * @summary Logout user
   * @request POST:/auth/logout
   * @secure
   */
  export namespace Logout {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = LogoutData;
  }
}
