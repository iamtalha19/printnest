export default function PackagingHero() {
  return (
    <section className="relative bg-white min-h-screen">
      <div className="bg-linear-to-r from-rose-500 via-purple-900 to-indigo-950 pt-16 pb-48 lg:pb-64 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
            <div className="lg:w-1/2">
              <span className="inline-block text-xs font-semibold tracking-widest text-white/70 uppercase mb-4">
                // Social Channels //
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Packaging Solutions
                <br />
                <span className="text-rose-400 underline decoration-2 underline-offset-8">
                  That Work
                </span>
              </h1>
            </div>
            <div className="lg:w-1/3 lg:text-right lg:pt-12">
              <p className="text-white/90 text-sm md:text-base leading-relaxed mb-6 max-w-sm lg:ml-auto">
                Reliable, custom packaging designed to protect, impress, &
                elevate your brand image.
              </p>
              <button className="bg-linear-to-r from-indigo-500 to-cyan-400 text-white font-semibold px-8 py-3 rounded-full hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg">
                View More
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="relative px-6 -mt-32 lg:-mt-48 max-w-7xl mx-auto">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl">
          <div className="aspect-21/9 relative">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              poster=""
            >
              <source
                src="https://themexriver.com/wp/printnest/v1-video-1.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>

      {/* White space below */}
      <div className="h-32 lg:h-48" />
    </section>
  );
}
