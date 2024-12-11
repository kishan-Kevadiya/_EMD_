"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Mail, Lock, Loader } from "lucide-react";
import { loginSuperAdmin } from "@/lib/client-auth";
import { checkTokenValidity } from "@/lib/check-validity";

export default function LoginPage({ login }: { login: string }, lang : string) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const [isClient, setIsClient] = useState(false);

  const dict = {
    en: {
      title: "Login",
      subtitle: "Enter your credentials to access the admin panel",
      emailLabel: "Email address",
      emailPlaceholder: "...@gmail.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      signInButton: "Sign In",
      restrictedAccess: "This area is restricted to super admin only. If you need access, please contact your system administrator."
    },
    es: {
      title: "Iniciar sesión",
      subtitle: "Ingrese sus credenciales para acceder al panel de administración",
      emailLabel: "Dirección de correo electrónico",
      emailPlaceholder: "...@gmail.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Ingrese su contraseña",
      signInButton: "Iniciar sesión",
      restrictedAccess: "Esta área está restringida únicamente a superadministradores. Si necesita acceder, comuníquese con el administrador del sistema."
    }
  }
// @ts-expect-error
  const selectedDict = dict[login] || dict.en; 
  console.log('selectedDict', selectedDict)

  useEffect(() => {
    if (checkTokenValidity() == 'SA') {
      router.push(`${lang}/superAdmin`);
    } else {
      setIsClient(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);
    try {
      await loginSuperAdmin(email, password);
      router.push("/superAdmin");
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null;

  return (
    <div className="min-h-screen flex items-center bg justify-center bg-base-200 bg-color-green">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-base-content/60 text-center justify-center divider">
              {" "}
              {selectedDict.title}
            </h2>
            <p className="text-center text-base-content/60 mb-4">
              {selectedDict.subtitle}
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">{selectedDict.emailLabel}</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <Mail size={20} className="text-base-content/60" />
                  <input
                    id="email-address"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="grow text-base-content"
                    placeholder={selectedDict.emailPlaceholder}
                    autoFocus
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </label>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">{selectedDict.passwordLabel}</span>
                </label>
                <label className="input input-bordered flex items-center gap-2">
                  <Lock size={20} className="text-base-content/60" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="grow text-base-content"
                    placeholder={selectedDict.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </label>
              </div>

              {error && (
                <div className="alert alert-error">
                  <span className="text-sm">{error}</span>
                </div>
              )}

              <button
                type="submit"
                className={`btn btn-primary w-full`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading loading-bars loading-lg"></span>
                    Sync...
                  </>
                ) : (
                  `${selectedDict.signInButton}`
                )}
              </button>
            </form>

            <div className="divider">🔒</div>

            <p className="text-center text-sm text-base-content/70">
              {selectedDict.restrictedAccess}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
