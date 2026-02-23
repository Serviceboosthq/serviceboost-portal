<div className="flex justify-between items-center 
                bg-slate-900/70 
                backdrop-blur-xl 
                border border-slate-800 
                rounded-2xl 
                p-6 
                shadow-2xl shadow-black/40 
                mb-8">

  {/* LEFT SIDE */}
  <div className="flex items-center gap-6">

    <img
      src="/logo.png"
      className="h-16 w-auto drop-shadow-xl"
      alt="ServiceBoost Pro"
    />

    <div>
      <h1 className="text-4xl font-extrabold 
                     bg-gradient-to-r 
                     from-white to-slate-400 
                     bg-clip-text text-transparent">
        Executive Dashboard
      </h1>
      <p className="text-slate-400 text-sm mt-1">
        Multi-Branch Revenue Control Center
      </p>
    </div>
  </div>

  {/* RIGHT SIDE */}
  <div className="flex items-center gap-6">

    {/* Company Badge */}
    <div className="bg-slate-800/80 
                    border border-slate-700 
                    px-5 py-3 
                    rounded-xl 
                    text-slate-300 
                    shadow-md">
      Company: Demo Pest Control
    </div>

    {/* Weather */}
    <div className="text-right">
      <p className="text-slate-400 text-sm">Weather</p>
      <p className="text-3xl font-bold">59°F</p>
      <p className="text-slate-400 text-sm">Clear</p>
    </div>

    {/* Google Rating */}
    <div className="text-right">
      <p className="text-slate-400 text-sm">Google Rating</p>
      <div className="flex items-center justify-end gap-2">
        <span className="text-yellow-400 text-2xl">★</span>
        <span className="text-3xl font-bold">4.8</span>
      </div>
      <p className="text-slate-400 text-sm">312 Reviews</p>
    </div>

  </div>

</div>