export default function IframeEmbed({ src }: { src: string }) {
  return (
    <div className="w-full h-[600px] rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-shadow duration-500 hover:shadow-md">
      <iframe
        src={src}
        className="w-full h-full border-none"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    </div>
  );
}
