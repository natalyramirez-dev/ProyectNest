"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

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

  const links = [
    { href: "/", label: "Inicio" },
    { href: "/buscar", label: "Buscar" },
    { href: "/favoritos", label: "Favoritos" },
    { href: "/acerca", label: "Acerca" },
  ];

  const toggleDarkMode = () => {
    document.body.classList.toggle("dark-mode");

    const isDark = document.body.classList.contains("dark-mode");

    setDarkMode(isDark);

    localStorage.setItem("theme", isDark ? "dark" : "light");
  };

  return (
    <nav className="navbar">
      <ul className="navbar-links">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={pathname === link.href ? "active" : ""}
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