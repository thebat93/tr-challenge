import { ReactNode } from "react";

import s from "./card.module.scss";
import clsx from "clsx";

const Card = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => <div className={clsx(s.card, className)}>{children}</div>;

export { Card };
