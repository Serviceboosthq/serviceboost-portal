<div className="mb-10">

  <div className="flex justify-between items-center 
                  bg-slate-900/60 
                  backdrop-blur-2xl 
                  border border-slate-800 
                  rounded-3xl 
                  px-8 py-6 
                  shadow-2xl shadow-black/40">

    {/* LEFT SIDE */}
    <div className="flex items-center gap-8">

      <img
        src="/logo.png"
        alt="ServiceBoost Pro"
        className="h-18 w-auto drop-shadow-2xl"
      />

      <div>
        <h1 className="text-4xl font-extrabold tracking-tight
                       bg-gradient-to-r 
                       from-white via-slate-300 to-slate-500 
                       bg-clip-text text-transparent">
          Executive Dashboard
        </h1>

        <p className="text-slate-400 text-sm mt-2">
          Multi-Branch Revenue Control Center
        </p>
      </div>

    </div>

    {/* RIGHT SIDE */}
    <div className="flex items-center gap-10">

      {/* Company Badge */}
      <div className="bg-slate-800/80 
                      border border-slate-700 
                      px-6 py-3 
                      rounded-2xl 
                      text-slate-300 
                      shadow-lg">
        <span className="text-slate-500 text-xs block">
          Company
        </span>
        <span className="font-semibold">
          Demo Pest Control
        </span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-slate-700"></div>

      {/* Weather */}
      <div className="text-right">
        <span className="text-slate-500 text-xs block">
          Weather
        </span>
        <span className="text-3xl font-bold tracking-tight">
          59°F
        </span>
        <span className="text-slate-400 text-sm block">
          Clear
        </span>
      </div>

      {/* Google Rating */}
      <div className="text-right">
        <span className="text-slate-500 text-xs block">
          Google Rating
        </span>
        <div className="flex items-center justify-end gap-2">
          <span className="text-yellow-400 text-xl">★</span>
          <span className="text-3xl font-bold tracking-tight">
            4.8
          </span>
        </div>
        <span className="text-slate-400 text-sm block">
          312 Reviews
        </span>
      </div>

    </div>

  </div>

  {/* Subtle Red Accent Line */}
  <div className="h-[2px] mt-6 bg-gradient-to-r from-red-600 via-red-500 to-transparent"></div>

</div>