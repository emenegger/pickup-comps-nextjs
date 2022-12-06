import { Tabs, TabList, Tab, TabPanels, TabPanel, Icon } from "@chakra-ui/react";
import * as React from "react";
import { FiMenu, FiBarChart } from "react-icons/fi";
import { BiBasketball } from "react-icons/bi";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Button } from "react-bootstrap";
import Link from 'next/link';

const NavBar = () => {
  return (
    <Tabs>
      <TabList justifyContent="space-between" alignItems="flex-end">
        <Link href="/"> <Tab> <Icon as={BiBasketball}/></Tab></Link>
        <Link href="/comparison"><Tab>Your Comps</Tab></Link>
        <Tab>Sign In</Tab>
        <Tab>Sign Out</Tab>
      </TabList>
    </Tabs>
  );
};


export default NavBar;
