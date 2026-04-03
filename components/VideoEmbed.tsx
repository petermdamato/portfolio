export default function VideoEmbed({ src }: { src: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-zinc-300 bg-zinc-100 transition-shadow duration-500 hover:shadow-md">
      <video controls className="w-full h-auto block" src={src}>
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
