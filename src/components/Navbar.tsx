"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NavLink } from "@/types/nav";

const navLinks: NavLink[] = [
  { href: "/", label: "Inicio" },
  { href: "/buscar", label: "Buscar" },
  { href: "/favoritos", label: "Favoritos" },
  { href: "/acerca", label: "Acerca" },
];

export default function Navbar() {
  const pathname = usePathname();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode");
      setDarkMode(true);
    }
  }, []);

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode =
      document.body.classList.contains("dark-mode");

    setDarkMode(isDarkMode);

    localStorage.setItem(
      "theme",
      isDarkMode ? "dark" : "light"
    );
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={
                pathname === link.href ? "active" : ""
              }
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <button onClick={toggleDarkMode}>
        {darkMode ? "☀ Claro" : "🌙 Oscuro"}
      </button>
    </nav>
  );
}