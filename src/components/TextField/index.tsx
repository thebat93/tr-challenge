import { InputHTMLAttributes, forwardRef } from "react";

import s from "./textField.module.scss";

const TextField = forwardRef(
  (
    props: InputHTMLAttributes<HTMLInputElement>,
    ref: React.ForwardedRef<HTMLInputElement>
  ) => <input ref={ref} className={s.textField} {...props} />
);

export { TextField };
