import React from "react";

import {
  ConfirmationModalContext,
  ModalContextType,
} from "../context/ConfirmContextProvider";

const useConfirm = (): ModalContextType =>
  React.useContext(ConfirmationModalContext);

export { useConfirm };
