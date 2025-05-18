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
  CreateMedicineData,
  CreateMedicinePayload,
  DeleteMedicineData,
  GetMedicineData,
  GetMedicinesData,
  UpdateMedicineData,
  UpdateMedicinePayload,
} from "./data-contracts";

export namespace Medicines {
  /**
   * @description Get a list of all medicines
   * @tags Medicines
   * @name GetMedicines
   * @summary List all medicines
   * @request GET:/medicines
   * @secure
   */
  export namespace GetMedicines {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMedicinesData;
  }

  /**
   * No description
   * @tags Medicines
   * @name CreateMedicine
   * @summary Create a new medicine
   * @request POST:/medicines
   * @secure
   */
  export namespace CreateMedicine {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateMedicinePayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateMedicineData;
  }

  /**
   * No description
   * @tags Medicines
   * @name GetMedicine
   * @summary Get a specific medicine
   * @request GET:/medicines/{id}
   * @secure
   */
  export namespace GetMedicine {
    export type RequestParams = {
      /** Medicine ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetMedicineData;
  }

  /**
   * No description
   * @tags Medicines
   * @name UpdateMedicine
   * @summary Update a medicine
   * @request PUT:/medicines/{id}
   * @secure
   */
  export namespace UpdateMedicine {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateMedicinePayload;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateMedicineData;
  }

  /**
   * No description
   * @tags Medicines
   * @name DeleteMedicine
   * @summary Delete a medicine
   * @request DELETE:/medicines/{id}
   * @secure
   */
  export namespace DeleteMedicine {
    export type RequestParams = {
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteMedicineData;
  }
}
