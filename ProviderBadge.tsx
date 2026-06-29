type Props = {
  name: string;
};

export default function ProviderBadge({ name }: Props) {
  return (
    <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-200">
      {name}
    </span>
  );
}
