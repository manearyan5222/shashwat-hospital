import React from "react";
import Link from "next/link";
import Image from "next/image";
import { HealthArticle } from "@/data/articles";
import { formatDate } from "@/lib/utils";
import { Clock, Calendar, ArrowRight, UserCheck } from "lucide-react";

export function ArticleCard({ article }: { article: HealthArticle }) {
  return (
    <article className="group bg-white rounded-2xl border border-surface-border shadow-card hover:shadow-hover hover:-translate-y-1 transition-all duration-200 flex flex-col overflow-hidden">
      <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
        <Image
          src={article.imageUrl}
          alt={article.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3">
          <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-navy-950/80 backdrop-blur-sm text-teal-300 border border-navy-800">
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <div className="flex items-center gap-3 text-xs text-slate-500 mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              {article.readingTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              {formatDate(article.publishedDate)}
            </span>
          </div>

          <h3 className="font-heading font-bold text-base sm:text-lg text-navy-950 mb-2 group-hover:text-teal-800 transition-colors line-clamp-2">
            {article.title}
          </h3>

          <p className="text-xs sm:text-sm text-surface-muted leading-relaxed line-clamp-2">
            {article.summary}
          </p>
        </div>

        <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500 truncate max-w-[160px]">
            Reviewed by: {article.medicalReviewer}
          </span>
          <Link
            href={`/health-library/${article.slug}`}
            className="font-bold text-navy-900 group-hover:text-teal-800 inline-flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Read Article</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </article>
  );
}
