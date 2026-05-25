export default function VideoEmbed({ src }: { src: string }) {
  return (
    <div className="w-full overflow-hidden border border-zinc-900 bg-zinc-100">
      <video controls className="w-full h-auto block" src={src}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
