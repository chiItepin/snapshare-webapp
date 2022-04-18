import React, { FunctionComponent } from 'react';
import Link from 'next/link';
import {
  Button,
} from '@nextui-org/react';

const SideBar: FunctionComponent = () => (
  <aside className="side-bar">
    <Button.Group
      vertical
      flat
      auto
      light
    >
      <Button>Notifications</Button>
      <Link href="/account" passHref><Button>Account</Button></Link>
    </Button.Group>
  </aside>
);

export default SideBar;
