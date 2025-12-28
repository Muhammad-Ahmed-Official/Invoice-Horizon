import { motion, AnimatePresence } from "framer-motion"
import { BarChart3, ClipboardList, Package, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function AuthLeftSide() {
  const [activeStep, setActiveStep] = useState(0);
    const inventoryStats = [
    { label: "Precision Tracking", icon: ClipboardList, description: "Monitor every asset in real-time." },
    { label: "Intelligent Analytics", icon: BarChart3, description: "Predict demand and optimize stock." },
    { label: "Secure Logistics", icon: ShieldCheck, description: "End-to-end security for your supply chain." },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % inventoryStats.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])
    
  return (
          <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-charcoal p-12 flex-col justify-between">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-linear-to-br from-charcoal via-charcoal/80 to-transparent z-10" />
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=2070&auto=format&fit=crop"
            alt="Inventory Logistics"
            className="w-full h-full object-cover opacity-50"
          />
          {/* Glass Overlay Pattern */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "radial-gradient(circle at 2px 2px, #C5A059 1px, transparent 0)",
              backgroundSize: "32px 32px",
            }}
          />
        </div>

        <div className="relative z-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-gold"
          >
            <div className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center shadow-lg shadow-gold/20">
              <Package className="text-charcoal w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white uppercase">InvenTrack Pro</span>
          </motion.div>
        </div>

        <div className="relative z-20 max-w-md">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="w-12 h-1 bg-gold rounded-full" />
              <h1 className="text-5xl font-bold text-white leading-tight">
                Streamline your <span className="text-gold">Operations</span> with total clarity.
              </h1>
              <div className="space-y-2">
                <div className="flex items-center gap-4 text-white">
                  {(() => {
                    const { icon: Icon, label } = inventoryStats[activeStep]
                    return (
                      <>
                        <Icon className="w-6 h-6 text-gold" />
                        <span className="text-lg font-semibold tracking-wide">{label}</span>
                      </>
                    )
                  })()}
                </div>
                <p className="text-white/60 pl-10 leading-relaxed">{inventoryStats[activeStep].description}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-20 text-white/40 text-xs tracking-widest uppercase font-medium"> 
          © 2025 InvenTrack Systems • Precision at Scale 
        </div>
      </div>
  )
}
