import { ExternalLink } from "lucide-react";
import type { Course } from "../types/Course";

type Props = {
  course: Course;
};

export default function SearchResultCard({ course }: Props) {
  return (
    <article className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur transition hover:-translate-y-1 hover:border-cyan-300/40">
      <p className="text-xs uppercase tracking-[0.25em] text-cyan-300">
        {course.provider}
      </p>

      <h3 className="mt-3 text-xl font-bold text-white">{course.title}</h3>

      <p className="mt-4 min-h-16 text-sm leading-6 text-slate-300">
        {course.description}
      </p>

      <div className="mt-5 flex flex-wrap gap-2 text-xs text-slate-300">
        <span className="rounded-full bg-white/10 px-3 py-1">{course.area}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">{course.level}</span>
        <span className="rounded-full bg-white/10 px-3 py-1">{course.duration}</span>
        {course.free && (
          <span className="rounded-full bg-violet-500/20 px-3 py-1 text-violet-200">
            Gratuito
          </span>
        )}
        {course.certificate && (
          <span className="rounded-full bg-emerald-400/10 px-3 py-1 text-emerald-300">
            Certificado
          </span>
        )}
      </div>

      <a
        href={course.url}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-gradient-to-r from-violet-600 to-cyan-500 px-4 py-3 text-sm font-bold text-white transition hover:scale-[1.02]"
      >
        Acessar curso <ExternalLink size={16} />
      </a>
    </article>
  );
}
