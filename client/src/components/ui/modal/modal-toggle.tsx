import { ReactElement, ReactNode, useState } from "react";

export interface ModalProps {
  isModalOpen: boolean;
  toggleModal: () => void;
  title?: string | ReactNode;
  actions?: boolean;
}
export interface ModalToggleProps {
  children: (props: ModalProps) => ReactElement;
}

export default function ModalToggle({ children }: ModalToggleProps) {
  let [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return children({ isModalOpen, toggleModal });
}
