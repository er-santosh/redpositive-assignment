import Modal from "@/components/ui/modal/modal";
import ModalToggle from "@/components/ui/modal/modal-toggle";
import { ReactNode } from "react";

export interface ConfirmModalProps
  extends React.ComponentPropsWithoutRef<"div"> {
  trigger: ReactNode;
  proceed: () => void;
  selectItem: () => void;
}

function ConfirmModal({
  trigger,
  children,
  proceed,
  selectItem,
}: ConfirmModalProps) {
  return (
    <ModalToggle>
      {({ isModalOpen, toggleModal }) => (
        <>
          <button
            onClick={() => {
              toggleModal();
              selectItem();
            }}
          >
            {trigger}
          </button>

          <Modal
            title={"Confirm Dialog"}
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
          >
            <div className="p-4">{children}</div>
            <div className="flex items-center justify-center space-x-4 py-4">
              <button onClick={toggleModal} className="btn">
                Cancel
              </button>
              <button onClick={proceed} className="btn btn-error">
                Proceed
              </button>
            </div>
          </Modal>
        </>
      )}
    </ModalToggle>
  );
}

export default ConfirmModal;
