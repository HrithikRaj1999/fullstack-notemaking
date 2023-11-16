import React from "react";

import {
  Dialog,
  DialogBody, DialogHeader
} from "@material-tailwind/react";

interface ModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export function NewModal({ showModal, setShowModal }: ModalProps) {
  const closeTab = () => {
    setShowModal(false);
    window.close();
  };

  return (
    <>
      <Dialog
        open={showModal}
        handler={closeTab}
        dismiss={{
          enabled: false,
          outsidePress: false,
          bubbles: false,
          outsidePressEvent: undefined,
        }}
      >
        <DialogHeader>⚠️ Warning</DialogHeader>
        <DialogBody divider className="h-44">
          Another instance of note has opened, kindly close this tab and use that tab as we currently do not provide multi tab options otherwise
          functionality will break
        </DialogBody>
      </Dialog>
    </>
  );
}
