import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAppDispatch } from "../../redux";
import { useHistory } from "react-router-dom";

import PageHeader from "../../components/page-header";
import FormInput from "../../components/form-input";
import Button from "../../components/button";

import { postNewListingAction } from "../../redux/data/data-slice";

import { textFormValidation } from "../../utils/functions";
import FormSelect from "../../components/form-select";

type FormInputs = {
  title: string;
  client_name: string;
  budget: string;
  duration: string;
  created_at: string;
};

const CreateNewGig = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormInputs>({
    mode: "onChange",
  });
  const history = useHistory();
  const dispatch = useAppDispatch();

  const [skills, setSkills] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submitForm: SubmitHandler<FormInputs> = async (data: any) => {
    setIsSubmitting(true);

    const payload = { ...data };

    await dispatch(postNewListingAction(payload));

    setIsSubmitting(false);
  };

  const skillOptions = [
    {
      value: 1,
      label: "HTML",
    },
    {
      value: 2,
      label: "CSS",
    },
    {
      value: 3,
      label: "ReactJS",
    },
    {
      value: 4,
      label: "Redux",
    },
    {
      value: 5,
      label: "TypeScript",
    },
    {
      value: 6,
      label: "Next.js",
    },
  ];

  return (
    <React.Fragment>
      <PageHeader title="Create a New Gig" />

      <form className="new_listing_form">
        <FormInput
          type="text"
          placeholder="Title (e.g; Senior Accountant Needed)"
          readOnly={isSubmitting}
          errorMessage={errors?.title?.message}
          inputRef={{
            ...register("title", textFormValidation(true)),
          }}
        />
        <FormInput
          type="text"
          placeholder="Client name (e.g; PayGate)"
          readOnly={isSubmitting}
          errorMessage={errors?.client_name?.message}
          inputRef={{
            ...register("client_name", textFormValidation(true)),
          }}
        />
        <FormInput
          type="text"
          placeholder="Budget (e.g; $3,000)"
          readOnly={isSubmitting}
          errorMessage={errors?.budget?.message}
          inputRef={{
            ...register("budget", textFormValidation(true)),
          }}
        />
        <FormInput
          type="text"
          placeholder="Duration (e.g; 3-months)"
          readOnly={isSubmitting}
          errorMessage={errors?.duration?.message}
          inputRef={{
            ...register("duration", textFormValidation(true)),
          }}
        />
        <FormSelect
          name="skills"
          placeholder="Select skills..."
          defaultValue={skills}
          onChange={(selections: any) => setSkills(selections)}
          isMulti={true}
          options={skillOptions}
        />

        <div className="actions">
          <Button
            text="Cancel"
            className="btn_secondary"
            onClick={() => history.push("/my-listings")}
            disabled={isSubmitting}
          />

          <Button
            text="Submit"
            onClick={handleSubmit((data) => submitForm(data))}
            loading={isSubmitting}
            disabled={!isValid || isSubmitting}
          />
        </div>
      </form>
    </React.Fragment>
  );
};

export default CreateNewGig;
