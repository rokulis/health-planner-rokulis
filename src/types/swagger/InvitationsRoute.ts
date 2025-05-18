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
  CancelInvitationData,
  CreateInvitationData,
  CreateInvitationPayload,
  GetInvitationsData,
  ValidateInvitationData,
} from "./data-contracts";

export namespace Invitations {
  /**
   * @description Get a list of all invitations
   * @tags Invitations
   * @name GetInvitations
   * @summary List all invitations
   * @request GET:/invitations
   * @secure
   */
  export namespace GetInvitations {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = GetInvitationsData;
  }

  /**
   * @description Create a new invitation for a staff member to join the clinic
   * @tags Invitations
   * @name CreateInvitation
   * @summary Create a new invitation
   * @request POST:/invitations
   * @secure
   */
  export namespace CreateInvitation {
    export type RequestParams = {};
    export type RequestQuery = {};
    export type RequestBody = CreateInvitationPayload;
    export type RequestHeaders = {};
    export type ResponseBody = CreateInvitationData;
  }

  /**
   * @description Cancel a pending invitation
   * @tags Invitations
   * @name CancelInvitation
   * @summary Cancel an invitation
   * @request DELETE:/invitations/{id}
   * @secure
   */
  export namespace CancelInvitation {
    export type RequestParams = {
      /** Invitation ID */
      id: number;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = CancelInvitationData;
  }

  /**
   * @description Check if an invitation token is valid and return the associated email
   * @tags Invitations
   * @name ValidateInvitation
   * @summary Validate an invitation token
   * @request GET:/invitations/{token}/validate
   */
  export namespace ValidateInvitation {
    export type RequestParams = {
      /** Invitation token */
      token: string;
    };
    export type RequestQuery = {};
    export type RequestBody = never;
    export type RequestHeaders = {};
    export type ResponseBody = ValidateInvitationData;
  }
}
