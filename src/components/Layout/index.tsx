import { ReactNode } from "react";
import { Header } from "../Header";

import s from "./layout.module.scss";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <Header />
    <main className={s.main}>{children}</main>
  </>
);

export { Layout };
