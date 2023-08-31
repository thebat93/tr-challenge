import { TradeRepublicIcon } from "./TradeRepublicIcon";

import s from "./header.module.scss";

const Header = () => (
  <header className={s.header}>
    <a className={s.link} href="/">
      <TradeRepublicIcon />
    </a>
  </header>
);

export { Header };
