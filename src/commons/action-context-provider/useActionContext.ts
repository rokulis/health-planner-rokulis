"use client";

import React from "react";

import { ActionContext } from '@/commons/action-context-provider/ActionContextProvider';

const useActionContext = () => React.useContext(ActionContext);

export { useActionContext };
