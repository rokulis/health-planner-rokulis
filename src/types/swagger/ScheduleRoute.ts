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

import { GetOpenSlotsData, GetScheduleData } from "./data-contracts";

export namespace Schedule {
  /**
   * No description
   * @tags Schedule
   * @name GetSchedule
   * @summary Get all Visits for the given date
   * @request GET:/schedule
   * @secure
   */
  export namespace GetSchedule {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format date */
      date: string;
      sector_id?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetScheduleData;
  }

  /**
   * No description
   * @tags Schedule
   * @name GetOpenSlots
   * @summary Get all Visits for the given date
   * @request GET:/schedule/open-slots
   * @secure
   */
  export namespace GetOpenSlots {
    export type RequestParams = {};
    export type RequestQuery = {
      /** @format date */
      date: string;
      sector_id?: number;
      duration?: number;
    };
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetOpenSlotsData;
  }
}
