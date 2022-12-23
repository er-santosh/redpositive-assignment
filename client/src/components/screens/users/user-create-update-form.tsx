import { createUpdateUser } from "@/api/user.api";
import {
  createUpdateUserInput,
  createUpdateUserSchema,
} from "@/schemas/user.schema";
import { IUserResponse } from "@/types/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

export interface IUserCreateUpdateForm {
  editMode?: boolean;
  editingUser?: IUserResponse;
  onSuccess: () => void;
}

const UserCreateUpdateForm = ({
  editMode,
  editingUser,
  onSuccess,
}: IUserCreateUpdateForm) => {
  const { mutate, isLoading: saving } = useMutation(createUpdateUser, {
    onSuccess(success) {
      reset();
      onSuccess();
      toast.success(success.message);
    },
    onError(error) {
      toast.error("Something went wrong");
    },
  });
  const onFormSubmit = (values: createUpdateUserInput) => {
    mutate(values);
  };
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<createUpdateUserInput>({
    resolver: zodResolver(createUpdateUserSchema),
    defaultValues: { _id: "", name: "", email: "", phone: "", hobbies: "" },
  });

  useEffect(() => {
    reset(editingUser);
  }, [editingUser, reset]);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)}>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          aria-invalid={errors.name ? true : false}
          type="text"
          className={`form-control ${errors.name ? "form-control-error" : ""}`}
          id="name"
          placeholder="name"
          {...register("name")}
        />
        <span className="error-text">{errors.name && errors.name.message}</span>
      </div>
      <div className="form-group">
        <label htmlFor="email">Email</label>
        <input
          aria-invalid={errors.email ? true : false}
          type="text"
          className={`form-control ${errors.email ? "form-control-error" : ""}`}
          id="email"
          placeholder="email address"
          {...register("email")}
        />
        <span className="error-text">
          {errors.email && errors.email.message}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="phone">Phone</label>
        <input
          aria-invalid={errors.phone ? true : false}
          type="text"
          className={`form-control ${errors.phone ? "form-control-error" : ""}`}
          id="phone"
          placeholder="phone number"
          {...register("phone")}
        />
        <span className="error-text">
          {errors.phone && errors.phone.message}
        </span>
      </div>
      <div className="form-group">
        <label htmlFor="hobbies">Hobbies</label>
        <input
          aria-invalid={errors.hobbies ? true : false}
          type="text"
          className={`form-control ${
            errors.hobbies ? "form-control-error" : ""
          }`}
          id="hobbies"
          placeholder="hobbies"
          {...register("hobbies")}
        />
        <span className="error-text">
          {errors.hobbies && errors.hobbies.message}
        </span>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={saving}
          className={`btn ${saving ? "btn-disabled" : ""}`}
        >
          {saving ? "Saving ...." : "Save"}
        </button>
      </div>
    </form>
  );
};

export default UserCreateUpdateForm;
