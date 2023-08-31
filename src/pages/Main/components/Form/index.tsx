import { useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { TextField } from "../../../../components/TextField";
import { Button } from "../../../../components/Button";
import { InstrumentID } from "../../../../models/instrument";

import s from "./form.module.scss";
import { Card } from "../../../../components/Card";

interface Form {
  isin: string;
}

interface Props {
  instruments: InstrumentID[];
  onSubmit: (newInstrument: InstrumentID) => void;
}

const ISIN_REGEXP = /^[A-Z]{2}[A-Z0-9]{9}[0-9]$/;

const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  WRONG_FORMAT:
    "ISIN is a 12-character alphanumeric code starting with a two letter country code",
  ALREADY_SUBSCRIBED: "You have already subscribed to this instrument",
};

const validationRules = {
  required: {
    value: true,
    message: VALIDATION_MESSAGES.REQUIRED,
  },
  pattern: {
    value: ISIN_REGEXP,
    message: VALIDATION_MESSAGES.WRONG_FORMAT,
  },
};

const Form = ({ instruments, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<Form>();

  const validate = useCallback(
    (form: Form) => {
      if (instruments.includes(form.isin)) {
        setError("isin", {
          message: VALIDATION_MESSAGES.ALREADY_SUBSCRIBED,
        });

        return false;
      }

      return true;
    },
    [instruments, setError]
  );

  const onSubscribe: SubmitHandler<Form> = useCallback(
    ({ isin }) => {
      if (!validate({ isin })) {
        return;
      }

      onSubmit(isin);
      reset();
    },
    [validate, reset, onSubmit]
  );

  return (
    <Card className={s.wrapper}>
      <form className={s.form} onSubmit={handleSubmit(onSubscribe)}>
        <div className={s.field}>
          <label htmlFor="isin">ISIN</label>
          <TextField
            id="isin"
            placeholder="Enter ISIN"
            aria-invalid={errors.isin ? "true" : "false"}
            {...register("isin", validationRules)}
          />
          {errors.isin && <div className={s.error}>{errors.isin.message}</div>}
        </div>
        <Button type="submit" className={s.button}>
          Subscribe
        </Button>
      </form>
    </Card>
  );
};

export { Form, ISIN_REGEXP };
