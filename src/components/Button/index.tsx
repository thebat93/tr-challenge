import { ReactNode } from "react";
import clsx from "clsx";

import s from "./button.module.scss";

type Props = {
  children: ReactNode;
  intent?: "primary" | "danger";
  className?: string;
} & JSX.IntrinsicElements["button"];

const Button = ({ children, intent = "primary", className, ...props }: Props) => (
  <button className={clsx(s.button, className, s[intent])} {...props}>
    <span className={s.buttonContent}>{children}</span>
  </button>
);

export { Button };
