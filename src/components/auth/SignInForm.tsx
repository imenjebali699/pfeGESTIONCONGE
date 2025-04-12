"use client";

import React, { useState, useCallback } from "react";
import Button from "@/components/ui/button/Button";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {jwtDecode} from "jwt-decode";
import Label from "../form/Label";
import Input from "../form/input/InputField";

interface JWTPayload {
  role: string;
  sub: string;
  // Ajoutez d'autres champs si nécessaire
}

export default function SignInForm() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = useCallback((): boolean => {
    let isValid = true;
    setEmailError("");
    setPasswordError("");

    if (!email.trim()) {
      setEmailError("L'email est requis.");
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:8081/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Email ou mot de passe invalide.");
      }

      const { token } = await res.json();
      localStorage.setItem("token", token);

      const decoded = jwtDecode<JWTPayload>(token);
      console.log("Token décodé :", decoded);

      // Normalisation des rôles : on retire le préfixe "ROLE_" si présent
      const role = decoded.role.toUpperCase().replace(/^ROLE_/, "");

      switch (role) {
        case "ADMIN":
          router.push("/dashboard_admin");
          break;
        case "RESPONSABLE_RH":
          router.push("/tableauboardrh");
          break;
        case "MANAGER":
          router.push("/dashboardmanager");
          break;
        case "EMPLOYE":
          router.push("/dashboardemployee");
          break;
        default:
          throw new Error("Rôle non reconnu.");
      }
    } catch (error) {
      console.error("Erreur lors de la connexion :", error);
      setEmailError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginarabsoft.png')" }}
    >
      <div className="flex flex-col justify-center w-full max-w-md mx-auto bg-white bg-opacity-90 rounded-lg shadow-lg p-6">
        <div className="flex justify-center mb-4">
          <img 
            src="/images/arabsoft.png" 
            alt="Company Logo" 
            className="h-16"
            width={64}
            height={64}
          />
        </div>
        <h1 className="mb-4 text-center text-lg font-semibold text-gray-800 dark:text-white">
          Connexion
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6" noValidate>
          <div>
            <Label htmlFor="email">
              Email <span className="text-error-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="info@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!emailError}
              aria-describedby="email-error"
            />
            {emailError && (
              <p id="email-error" className="text-red-500 text-sm mt-1">
                {emailError}
              </p>
            )}
          </div>
          <div>
            <Label htmlFor="password">
              Mot de passe <span className="text-error-500">*</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-invalid={!!passwordError}
                aria-describedby="password-error"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2"
                aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? (
                  <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                ) : (
                  <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                )}
              </button>
            </div>
            {passwordError && (
              <p id="password-error" className="text-red-500 text-sm mt-1">
                {passwordError}
              </p>
            )}
          </div>
          <Button 
            className="w-full" 
            size="sm" 
            type="submit"
            disabled={isLoading}
            aria-busy={isLoading}
          >
            {isLoading ? "Connexion en cours..." : "Connexion"}
          </Button>
        </form>
        <p className="mt-5 text-sm text-center text-gray-700 dark:text-gray-400">
          Vous n&apos;avez pas de compte ?{" "}
          <Link 
            href="/signup" 
            className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
            aria-label="S'inscrire"
          >
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
}
