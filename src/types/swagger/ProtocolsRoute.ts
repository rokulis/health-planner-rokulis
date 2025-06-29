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
  CreateProtocolData,
  DeleteProtocolData,
  GetProtocolData,
  GetProtocolsData,
  StoreProtocolRequest,
  UpdateProtocolData,
} from "./data-contracts";

export namespace Protocols {
  /**
   * @description Get a list of all treatment protocols
   * @tags Protocols
   * @name GetProtocols
   * @summary List all protocols
   * @request GET:/protocols
   * @secure
   */
  export namespace GetProtocols {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Name of the protocol */
      name?: string;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProtocolsData;
  }

  /**
   * @description Create a new treatment protocol
   * @tags Protocols
   * @name CreateProtocol
   * @summary Create a new protocol
   * @request POST:/protocols
   * @secure
   */
  export namespace CreateProtocol {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StoreProtocolRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateProtocolData;
  }

  /**
   * @description Returns details for a specific treatment protocol
   * @tags Protocols
   * @name GetProtocol
   * @summary Get a specific protocol
   * @request GET:/protocols/{id}
   * @secure
   */
  export namespace GetProtocol {
    export type RequestParams = {
      /** Protocol ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetProtocolData;
  }

  /**
   * No description
   * @tags Protocols
   * @name UpdateProtocol
   * @summary Update a protocol
   * @request PUT:/protocols/{id}
   * @secure
   */
  export namespace UpdateProtocol {
    export type RequestParams = {
      /** Protocol ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = StoreProtocolRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateProtocolData;
  }

  /**
   * @description Delete an existing treatment protocol
   * @tags Protocols
   * @name DeleteProtocol
   * @summary Delete a protocol
   * @request DELETE:/protocols/{id}
   * @secure
   */
  export namespace DeleteProtocol {
    export type RequestParams = {
      /** Protocol ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteProtocolData;
  }
}
