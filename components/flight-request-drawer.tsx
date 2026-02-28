"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { X, Plane, User, Mail, Phone, MapPin, ChevronDown, Send } from "lucide-react"

type FormData = {
  nombre: string
  apellido: string
  edad: string
  email: string
  telefono: string
  destino: string
}

const destinos = [
  { value: "Panama - Marcos Gelabert", label: "Panama - Marcos Gelabert" },
  { value: "Chitre", label: "Chitré" },
  { value: "David - Chiriqui", label: "David - Chiriquí" },
  { value: "Santiago", label: "Santiago" },
  { value: "Contadora", label: "Contadora" },
  { value: "Isla Colon - Bocas del Toro", label: "Isla Colón - Bocas del Toro" },
  { value: "Pedasi", label: "Pedasí" },
]

type Props = {
  open: boolean
  onClose: () => void
}

export function FlightRequestDrawer({ open, onClose }: Props) {
  const [form, setForm] = useState<FormData>({
    nombre: "",
    apellido: "",
    edad: "",
    email: "",
    telefono: "",
    destino: "",
  })

  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validate = () => {
    const newErrors: Partial<FormData> = {}
    if (!form.nombre.trim()) newErrors.nombre = "Requerido"
    if (!form.apellido.trim()) newErrors.apellido = "Requerido"
    if (!form.edad.trim()) newErrors.edad = "Requerido"
    if (!form.email.trim()) newErrors.email = "Requerido"
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = "Correo inválido"
    if (!form.telefono.trim()) newErrors.telefono = "Requerido"
    if (!form.destino) newErrors.destino = "Selecciona un destino"
    return newErrors
  }

  const handleSubmit = () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    const subject = encodeURIComponent(`Solicitud de Vuelo Chárter - ${form.nombre} ${form.apellido}`)
    const body = encodeURIComponent(
      `Solicitud de Vuelo Chárter\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n\n` +
      `INFORMACIÓN PERSONAL\n` +
      `Nombre: ${form.nombre} ${form.apellido}\n` +
      `Edad: ${form.edad}\n\n` +
      `INFORMACIÓN DE CONTACTO\n` +
      `Correo: ${form.email}\n` +
      `Teléfono: ${form.telefono}\n\n` +
      `INFORMACIÓN DEL VUELO\n` +
      `Destino: ${form.destino}\n\n` +
      `━━━━━━━━━━━━━━━━━━━━━━\n` +
      `Enviado desde aeroluxpanama.com`
    )

    window.location.href = `mailto:ventasinfo@aeroluxpanama.com?subject=${subject}&body=${body}`
  }

  const handleChange = (field: keyof FormData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const inputClass = (field: keyof FormData) =>
    `w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:bg-white/8 focus:ring-1 focus:ring-primary/50 ${
      errors[field] ? "border-red-500/60 focus:ring-red-500/40" : "border-white/10 focus:border-primary/40"
    }`

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(0,0,0,0.8)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 34 }}
            className="fixed top-0 right-0 h-full z-50 w-full max-w-md flex flex-col shadow-2xl"
            style={{ background: "rgba(0,0,0,0.9)", borderLeft: "1px solid rgba(255,255,255,0.06)" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="glass rounded-full p-2">
                  <Plane className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h2 className="font-serif font-bold text-lg leading-tight">Solicitar Vuelo Chárter</h2>
                  <p className="text-xs text-muted-foreground mt-0.5">Complete el formulario para continuar</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="glass rounded-full p-2 hover:scale-110 transition-transform hover:bg-primary/10"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Form */}
            <div className="flex-1 overflow-y-auto px-8 py-6 space-y-7">

              {/* Personal Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Información Personal
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Nombre <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Juan"
                        value={form.nombre}
                        onChange={(e) => handleChange("nombre", e.target.value)}
                        className={inputClass("nombre")}
                      />
                      {errors.nombre && <p className="text-xs text-red-400 mt-1">{errors.nombre}</p>}
                    </div>
                    <div>
                      <label className="text-xs text-muted-foreground mb-1.5 block">
                        Apellido <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Pérez"
                        value={form.apellido}
                        onChange={(e) => handleChange("apellido", e.target.value)}
                        className={inputClass("apellido")}
                      />
                      {errors.apellido && <p className="text-xs text-red-400 mt-1">{errors.apellido}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Edad <span className="text-primary">*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="30"
                      min="1"
                      max="120"
                      value={form.edad}
                      onChange={(e) => handleChange("edad", e.target.value)}
                      className={inputClass("edad")}
                    />
                    {errors.edad && <p className="text-xs text-red-400 mt-1">{errors.edad}</p>}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Contact Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Información de Contacto
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Correo Electrónico <span className="text-primary">*</span>
                    </label>
                    <input
                      type="email"
                      placeholder="juan@ejemplo.com"
                      value={form.email}
                      onChange={(e) => handleChange("email", e.target.value)}
                      className={inputClass("email")}
                    />
                    {errors.email && <p className="text-xs text-red-400 mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="text-xs text-muted-foreground mb-1.5 block">
                      Teléfono <span className="text-primary">*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+507 6000-0000"
                      value={form.telefono}
                      onChange={(e) => handleChange("telefono", e.target.value)}
                      className={inputClass("telefono")}
                    />
                    {errors.telefono && <p className="text-xs text-red-400 mt-1">{errors.telefono}</p>}
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="h-px bg-white/5" />

              {/* Flight Info */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Información del Vuelo
                  </span>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-1.5 block">
                    Destino <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={form.destino}
                      onChange={(e) => handleChange("destino", e.target.value)}
                      className={`${inputClass("destino")} appearance-none pr-10 cursor-pointer`}
                    >
                      <option value="" disabled className="bg-background text-muted-foreground">
                        Selecciona tu destino
                      </option>
                      {destinos.map((d) => (
                        <option key={d.value} value={d.value} className="bg-background text-foreground">
                          {d.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  </div>
                  {errors.destino && <p className="text-xs text-red-400 mt-1">{errors.destino}</p>}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/5 flex-shrink-0 space-y-3">
              <Button
                className="w-full bg-gradient-red group text-sm py-6"
                onClick={handleSubmit}
              >
                <Send className="h-4 w-4 mr-2 group-hover:translate-x-0.5 transition-transform" />
                Enviar Solicitud
              </Button>
              <p className="text-xs text-muted-foreground/60 text-center leading-relaxed">
                Al enviar esta solicitud, se abrirá tu cliente de correo para completar el envío a nuestro equipo.
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
