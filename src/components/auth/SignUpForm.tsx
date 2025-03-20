"use client";

import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import { EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
export interface InputProps {
  type: string;
  placeholder: string;
  name?: string; // Add the optional 'name' property
  value: string; // Ensure the value property is required
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export default function SignUpForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    fname: "",
    lname: "",
    post: "",
    dateAmbauche: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    post: "",
    dateAmbauche: "",
    email: "",
    password: "",
  });

  // Fonction de validation
  const validateForm = (): boolean => {
    let isValid = true;
    const newErrors = { fname: "", lname: "", post: "", dateAmbauche: "", email: "", password: "" };

    if (!form.fname.trim()) {
      newErrors.fname = "Le nom est requis.";
      isValid = false;
    }
    if (!form.lname.trim()) {
      newErrors.lname = "Le prénom est requis.";
      isValid = false;
    }
    if (!form.post.trim()) {
      newErrors.post = "Le poste est requis.";
      isValid = false;
    }
    if (!form.dateAmbauche.trim()) {
      newErrors.dateAmbauche = "La date d'embauche est requise.";
      isValid = false;
    }
    if (!form.email.trim()) {
      newErrors.email = "L'email est requis.";
      isValid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email.trim())) {
      newErrors.email = "Veuillez entrer une adresse e-mail valide.";
      isValid = false;
    }
    if (!form.password.trim()) {
      newErrors.password = "Le mot de passe est requis.";
      isValid = false;
    } else if (form.password.length < 6) {
      newErrors.password = "Le mot de passe doit contenir au moins 6 caractères.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // Gestion de la soumission du formulaire
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Inscription réussie !");
      router.push("/signin"); // Redirection vers la page de connexion
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center"
      style={{ backgroundImage: "url('/images/loginarabsoft.png')" }}
    >
      <div className="flex flex-col items-center justify-center w-full max-w-md p-6 bg-white bg-opacity-90 rounded-lg shadow-lg">
        <img src="/images/arabsoft.png" alt="Company Logo" className="h-16 mb-4" />
        <h1 className="mb-4 text-lg font-semibold text-center text-gray-800">Créer un compte</h1>

        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label>Nom <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                name="fname"
                placeholder="Entrez votre nom"
                value={form.fname}
                onChange={(e) => setForm({ ...form, fname: e.target.value })}
              />
              {errors.fname && <p className="text-red-500 text-sm">{errors.fname}</p>}
            </div>
            <div>
              <Label>Prénom <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                name="lname"
                placeholder="Entrez votre prénom"
                value={form.lname}
                onChange={(e) => setForm({ ...form, lname: e.target.value })}
              />
              {errors.lname && <p className="text-red-500 text-sm">{errors.lname}</p>}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <Label>Poste <span className="text-error-500">*</span></Label>
              <Input
                type="text"
                name="post"
                placeholder="Entrez votre poste"
                value={form.post}
                onChange={(e) => setForm({ ...form, post: e.target.value })}
              />
              {errors.post && <p className="text-red-500 text-sm">{errors.post}</p>}
            </div>
            <div>
              <Label>Date d&apos;embauche <span className="text-error-500">*</span></Label>
              <Input
                type="date"
                name="dateAmbauche"
                value={form.dateAmbauche}
                onChange={(e) => setForm({ ...form, dateAmbauche: e.target.value })}
              />
              {errors.dateAmbauche && <p className="text-red-500 text-sm">{errors.dateAmbauche}</p>}
            </div>
          </div>

          <div>
            <Label>Email <span className="text-error-500">*</span></Label>
            <Input
              type="email"
              name="email"
              placeholder="Entrez votre email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <Label>Mot de passe <span className="text-error-500">*</span></Label>
            <div className="relative">
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Entrez votre mot de passe"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 cursor-pointer"
              >
                {showPassword ? <EyeIcon className="fill-gray-500" /> : <EyeCloseIcon className="fill-gray-500" />}
              </span>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="w-full px-4 py-3 text-sm font-medium text-white bg-brand-500 rounded-lg hover:bg-brand-600"
          >
            S&apos;inscrire
          </button>
        </form>

        <p className="mt-5 text-sm text-center text-gray-700">
          Vous avez déjà un compte ?{" "}
          <Link href="/signin" className="text-brand-500 hover:text-brand-600">
            Se connecter
          </Link>
        </p>
      </div>
    </div>
  );
}
