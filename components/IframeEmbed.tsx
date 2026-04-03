export default function IframeEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-sm border border-zinc-300 bg-zinc-100 transition-shadow duration-500 hover:shadow-md">
      <iframe
        src={src}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
