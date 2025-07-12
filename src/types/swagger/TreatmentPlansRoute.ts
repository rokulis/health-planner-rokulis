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
  CancelTreatmentPlanData,
  ConfirmTreatmentPlanData,
  CreateTreatmentPlanData,
  DeleteTreatmentPlanData,
  FinishTreatmentPlanData,
  GetPatientTreatmentPlansData,
  GetTreatmentPlanData,
  GetTreatmentPlansData,
  PlanVisitsData,
  PlanVisitsPayload,
  StoreTreatmentPlanRequest,
  UpdateTreatmentPlanData,
  UpdateTreatmentPlanRequest,
} from "./data-contracts";

export namespace TreatmentPlans {
  /**
   * No description
   * @tags Treatment Plans
   * @name GetTreatmentPlans
   * @summary List all treatment plans
   * @request GET:/treatment-plans
   * @secure
   */
  export namespace GetTreatmentPlans {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTreatmentPlansData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name CreateTreatmentPlan
   * @summary Create a new treatment plan
   * @request POST:/treatment-plans
   * @secure
   */
  export namespace CreateTreatmentPlan {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = StoreTreatmentPlanRequest;
    export type RequestHeaders = {};
    export type ResponseBody = CreateTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name GetPatientTreatmentPlans
   * @summary Fetch patient's treatment plans
   * @request GET:/treatment-plans/patient/{id}
   * @secure
   */
  export namespace GetPatientTreatmentPlans {
    export type RequestParams = {
      /** Patient ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetPatientTreatmentPlansData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name PlanVisits
   * @summary Propose treatment visits
   * @request POST:/treatment-plans/{id}/plan-visits
   * @secure
   */
  export namespace PlanVisits {
    export type RequestParams = {
      /** Treatment Plan */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = PlanVisitsPayload;
    export type RequestHeaders = {};
    export type ResponseBody = PlanVisitsData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name ConfirmTreatmentPlan
   * @summary Confirm treatment plan
   * @request POST:/treatment-plans/{id}/confirm
   * @secure
   */
  export namespace ConfirmTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: any;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ConfirmTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name GetTreatmentPlan
   * @summary Get treatment plan details
   * @request GET:/treatment-plans/{id}
   * @secure
   */
  export namespace GetTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name UpdateTreatmentPlan
   * @summary Update a treatment plan
   * @request PUT:/treatment-plans/{id}
   * @secure
   */
  export namespace UpdateTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = UpdateTreatmentPlanRequest;
    export type RequestHeaders = {};
    export type ResponseBody = UpdateTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name DeleteTreatmentPlan
   * @summary Delete a treatment plan
   * @request DELETE:/treatment-plans/{id}
   * @secure
   */
  export namespace DeleteTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = DeleteTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name CancelTreatmentPlan
   * @request DELETE:/treatment-plans/{id}/cancel
   * @secure
   */
  export namespace CancelTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: any;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CancelTreatmentPlanData;
  }

  /**
   * No description
   * @tags Treatment Plans
   * @name FinishTreatmentPlan
   * @request POST:/treatment-plans/{id}/finish
   * @secure
   */
  export namespace FinishTreatmentPlan {
    export type RequestParams = {
      /** Treatment Plan ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = FinishTreatmentPlanData;
  }
}
