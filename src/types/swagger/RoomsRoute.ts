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
  Cf9104Dbefd91A81Bebb07Cafe7E70CfData,
  CreateRoomData,
  GetAllRoomsData,
  GetRoomData,
  Room,
  StoreRoomRequest,
  UpdateRoomData,
} from "./data-contracts";

export namespace Rooms {
  /**
   * No description
   * @tags Rooms
   * @name GetAllRooms
   * @summary List all rooms
   * @request GET:/rooms
   * @secure
   */
  export namespace GetAllRooms {
    export type RequestParams = {};
    export type RequestQuery = {
      /** Filter rooms by sector ID */
      sector_id?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetAllRoomsData;
  }

  /**
   * No description
   * @tags Rooms
   * @name CreateRoom
   * @summary Create a new room with optional beds
   * @request POST:/rooms
   * @secure
   */
  export namespace CreateRoom {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StoreRoomRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateRoomData;
  }

  /**
   * No description
   * @tags Rooms
   * @name GetRoom
   * @summary Get room details
   * @request GET:/rooms/{id}
   * @secure
   */
  export namespace GetRoom {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetRoomData;
  }

  /**
   * No description
   * @tags Rooms
   * @name UpdateRoom
   * @summary Update a room and its beds
   * @request PUT:/rooms/{id}
   * @secure
   */
  export namespace UpdateRoom {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = Room;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateRoomData;
  }

  /**
   * No description
   * @tags Rooms
   * @name Cf9104Dbefd91A81Bebb07Cafe7E70Cf
   * @summary Delete a room and its beds
   * @request DELETE:/rooms/{id}
   * @secure
   */
  export namespace Cf9104Dbefd91A81Bebb07Cafe7E70Cf {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = Cf9104Dbefd91A81Bebb07Cafe7E70CfData;
  }
}
