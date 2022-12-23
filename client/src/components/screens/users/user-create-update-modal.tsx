import UserCreateUpdateForm, {
  IUserCreateUpdateForm,
} from "@/components/screens/users/user-create-update-form";
import Modal from "@/components/ui/modal/modal";
import ModalToggle from "@/components/ui/modal/modal-toggle";
import { BiEdit } from "react-icons/bi";

const UserCreateUpdateModal = ({
  editMode = false,
  editingUser,
  onSuccess,
}: IUserCreateUpdateForm) => {
  return (
    <ModalToggle>
      {({ isModalOpen, toggleModal }) => (
        <>
          <button
            className={editMode ? "" : "btn btn-success"}
            onClick={toggleModal}
          >
            {editMode ? <BiEdit size={25} color="blue" /> : "Add New"}
          </button>

          <Modal
            isModalOpen={isModalOpen}
            toggleModal={toggleModal}
            title={editMode ? "Update User" : "Create User"}
          >
            <UserCreateUpdateForm
              editMode={editMode}
              editingUser={editingUser}
              onSuccess={() => {
                toggleModal();
                onSuccess();
              }}
            />
          </Modal>
        </>
      )}
    </ModalToggle>
  );
};

export default UserCreateUpdateModal;
