"use client";

import Link from "next/link";
import styles from "./header.module.css";
import { GrTechnology } from "react-icons/gr";
import { useState, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface NavbarProps {
  isAdmin: boolean
}

const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
          CLOUD
          <GrTechnology />
          HOSTING
        </Link>
        <div className={styles.menu}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>

      <div
        className={styles.navLinksWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0, 100% 0, 100% 100%, 0 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggle(false)}
            href="/"
            className={styles.navLink}
          >
            Home
          </Link>
          <Link
            onClick={() => setToggle(false)}
            href="/about"
            className={styles.navLink}
          >
            About
          </Link>
          <Link
            onClick={() => setToggle(false)}
            href="/articles?pageNumber=1"
            className={styles.navLink}
          >
            Articles
          </Link>
          {
            isAdmin && (
              <Link
                onClick={() => setToggle(false)}
                href="/admin"
                className={styles.navLink}
              >
                Admin Dashboard
              </Link>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
