export default function VideoEmbed({ src }: { src: string }) {
  return (
    <div className="w-full rounded-2xl overflow-hidden shadow-sm border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-900 transition-shadow duration-500 hover:shadow-md">
      <video controls className="w-full h-auto block">
        <source src={src} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}
