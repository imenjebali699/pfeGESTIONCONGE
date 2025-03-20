"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter();

  // Fonction de validation
  const validateForm = useCallback((): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("L'email est requis.");
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
      setEmailError("Veuillez entrer une adresse e-mail valide.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Le mot de passe est requis.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Le mot de passe doit contenir au moins 6 caractères.");
      isValid = false;
    }

    return isValid;
  }, [email, password]);

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      router.push("/tableauboardrh");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginarabsoft.png')" }}
    >
      <div className="flex flex-col justify-center w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <img src="/images/arabsoft.png" alt="Company Logo" className="h-16" />
        </div>
        <h1 className="mb-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
          Login
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label>Email <span className="text-error-500">*</span></Label>
            <Input
              type="email"
              placeholder="info@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}
          </div>

          <div>
            <Label>Mot de passe <span className="text-error-500">*</span></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </span>
            </div>
            {passwordError && <p className="text-red-500 text-sm">{passwordError}</p>}
          </div>

          <Button className="w-full" size="sm" type="submit">
            Connexion
          </Button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-700 dark:text-gray-400">
          Vous n&apos;avez pas de compte ?{" "}
          <Link href="/signup" className="text-brand-500 hover:text-brand-600 dark:text-brand-400">
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
