export default function Loading() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="text-center">
        <div className="relative mb-8">
          <div className="text-6xl mb-4 animate-pulse">🪄</div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 border-2 border-border-primary/30 rounded-full animate-spin">
              <div className="w-2 h-2 bg-primary-gold rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-white mb-4 font-decorative">
          <span className="text-white">Casting Magic...</span>
        </h2>

        <p className="text-text-secondary mb-6">
          Please wait while we prepare your magical experience
        </p>

        <div className="w-64 mx-auto">
          <div className="bg-bg-card rounded-full h-2 overflow-hidden">
            <div className="bg-gradient-to-r from-primary-dark-gold to-primary-gold h-full rounded-full animate-pulse w-full"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
