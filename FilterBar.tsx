type Props = {
  active: string;
  onChange: (filter: string) => void;
};

const filters = ["Todos", "Gratuitos", "Certificado", "Iniciante"];

export default function FilterBar({ active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onChange(filter)}
          className={
            active === filter
              ? "rounded-full bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-2 text-sm font-bold text-white"
              : "rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm text-slate-300 transition hover:text-white"
          }
        >
          {filter}
        </button>
      ))}
    </div>
  );
}
