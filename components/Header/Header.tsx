"use client";

import Link from "next/link";
import css from "./Header.module.css";

import clsx from "clsx";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ModalLogin from "../ModalLogin/ModalLogin";
import ModalRegister from "../ModalRegister/ModalRegister";
import { useAuthStore } from "@/lib/store/authStore";

export default function Header() {
  const [isLoginModal, setIsLoginModal] = useState(false);
  const [isRegisterModal, setIsRegisterModal] = useState(false);
  const { user, isAuthenticated } = useAuthStore();
  const router = usePathname();

  return (
    <>
      <header className={css.header}>
        <div className={`container ${css.headerContainer}`}>
          <Link href="/" className={css.logo}>
            <svg width={28} height={28}>
              <use href="/icons.svg#ukraine"></use>
            </svg>
            <span>LearnLingo</span>
          </Link>

          <nav className={css.navigation}>
            <Link
              href="/"
              className={clsx(css.navLink, router === "/" && css.currentUrl)}
            >
              Home
            </Link>
            <Link
              href="/teachers"
              className={clsx(
                css.navLink,
                router === "/teachers" && css.currentUrl,
              )}
            >
              Teachers
            </Link>
          </nav>

          {!isAuthenticated ? (
            <div className={css.authBtnBox}>
              <button
                type="button"
                className={css.loginBtn}
                onClick={() => setIsLoginModal(true)}
              >
                <svg width={20} height={20}>
                  <use href="/icons.svg#log-in"></use>
                </svg>
                Log in
              </button>
              <button
                type="button"
                className={css.registerBtn}
                onClick={() => setIsRegisterModal(true)}
              >
                Registration
              </button>
            </div>
          ) : (
            <button
              type="button"
              className={css.registerBtn}
              onClick={() => {}}
            >
              Log out
            </button>
          )}
        </div>
      </header>

      {isLoginModal && <ModalLogin onClose={() => setIsLoginModal(false)} />}
      {isRegisterModal && (
        <ModalRegister onClose={() => setIsRegisterModal(false)} />
      )}
    </>
  );
}
