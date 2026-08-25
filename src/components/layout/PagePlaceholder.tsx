export default function PagePlaceholder({ title }: { title: string }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-start justify-center px-4 py-32 md:px-8">
      <h1 className="text-4xl font-bold text-white md:text-5xl">{title}</h1>
      <p className="mt-4 text-neutral-400">Content coming soon.</p>
    </div>
  );
}
