import { FC, useState, useEffect } from "react";
import Image from "next/image";
import styles from "@styles/Home.module.css";

import { useQuery } from "@apollo/client";

import Toolbar from "@mui/material/Toolbar";
import { Box } from "@mui/material";

import Navbar from "@components/navbar";
import Footer from "@components/footer";

interface Props {
  // layout props
  themeMode: string;
  setThemeMode: (arg0: string) => void;
}

const Layout: FC<Props> = ({ children, themeMode, setThemeMode }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <Box>
        <p>Loading...</p>
      </Box>
    );
  }

  // useQuery
  return (
    <>
      <Navbar collections={[]} />
      <Toolbar />

      <main>{children}</main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}

      <Footer themeMode={themeMode} setThemeMode={setThemeMode} />
    </>
  );
};

export default Layout;
