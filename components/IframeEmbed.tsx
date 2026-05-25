export default function IframeEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-[600px] overflow-hidden border border-zinc-900 bg-zinc-100">
      <iframe
        src={src}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
