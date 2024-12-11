'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { checkTokenValidity } from '@/lib/check-validity'
import Loader from '../../Loader/Loader'
import { loginEventHost } from '@/lib/client-auth'
import { getDictionary } from '@/lib/dictionary'

export default function HostLogin({ params }: { params: { locationId: string, eventId: string, localeFromUrl: string | null } },) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const router = useRouter()  

  const dict = {
    en: {
      title: "Login",
      subtitle: "Enter your credentials to access the admin panel",
      emailLabel: "Email address",
      emailPlaceholder: "...@gmail.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter your password",
      signInButton: "Sign In",
      restrictedAccess: "This area is restricted to event host only. If you need access, please contact your system administrator."
    },
    es: {
      title: "Iniciar sesión",
      subtitle: "Ingrese sus credenciales para acceder al panel de administración",
      emailLabel: "Dirección de correo electrónico",
      emailPlaceholder: "...@gmail.com",
      passwordLabel: "Contraseña",
      passwordPlaceholder: "Ingrese su contraseña",
      signInButton: "Iniciar sesión",
      restrictedAccess: "Esta área está restringida únicamente al organizador del evento. Si necesita acceder, comuníquese con el administrador del sistema.."
    }
  }
// @ts-expect-error
  const selectedDict = dict[params.localeFromUrl] || dict.en; 

  useEffect(() => {
    if (checkTokenValidity() === 'HS') {
      router.push(`/location/${params.locationId}/event/${params.eventId}/hs/dashboard`);
    } else {
      setIsClient(true)
    }
  }, [params.eventId, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)
    try {
      await loginEventHost(email, password, params.eventId, params.locationId)
      router.push(`/location/${params.locationId}/event/${params.eventId}/hs/dashboard`)
    } catch (error) {
      setError('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isClient) {
    return <Loader />
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 glass">
      <div className="w-full max-w-md">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-base-content/60 text-center justify-center divider">
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
                    type="email"
                    placeholder={selectedDict.emailPlaceholder}
                    className="grow"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    autoFocus
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
                    type={showPassword ? 'text' : 'password'}
                    placeholder={selectedDict.passwordPlaceholder}
                    className="grow"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="btn btn-ghost btn-circle btn-sm"
                  >
                    {showPassword ? (
                      <EyeOff size={20} className="text-base-content/60" />
                    ) : (
                      <Eye size={20} className="text-base-content/60" />
                    )}
                  </button>
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
                    Sync...!
                  </>
                ) : (
                  `${selectedDict.signInButton}`
                )}
              </button>
            </form>

            <div className="divider">🎫</div>

            <p className="text-center text-sm text-base-content/70">
             {selectedDict.restrictedAccess}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

