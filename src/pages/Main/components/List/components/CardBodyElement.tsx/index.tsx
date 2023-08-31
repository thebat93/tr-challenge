import clsx from "clsx";

import s from "./CardBodyElement.module.scss";

const formatNumber = (number: number) =>
  Math.round((number + Number.EPSILON) * 100) / 100;

const CardBodyElement = ({
  label,
  value,
  intent = "primary",
}: {
  label: string;
  value?: number;
  intent?: "primary" | "success" | "danger";
}) => (
  <div className={s.wrapper}>
    <span>{label}</span>:{" "}
    {value ? (
      <span className={clsx(s.value, s[intent])}>{formatNumber(value)}</span>
    ) : (
      "-"
    )}
  </div>
);

export { CardBodyElement, formatNumber };
