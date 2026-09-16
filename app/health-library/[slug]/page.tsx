import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { articlesData, HealthArticle } from "@/data/articles";
import { treatmentsData } from "@/data/treatments";
import { doctorsData } from "@/data/doctors";
import { hospitalData } from "@/data/hospital";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/Container";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { SectionHeading } from "@/components/SectionHeading";
import { FAQAccordion } from "@/components/FAQAccordion";
import { DoctorCard } from "@/components/DoctorCard";
import { CTASection } from "@/components/CTASection";
import { FAQJsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import {
  Clock,
  Calendar,
  UserCheck,
  CheckCircle2,
  ShieldCheck,
  ArrowRight,
  BookOpen,
} from "lucide-react";

export function generateStaticParams() {
  return articlesData.map((a) => ({
    slug: a.slug,
  }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) {
    return { title: "Article Not Found" };
  }

  return {
    title: `${article.title} | Shashwat Hospital Health Library`,
    description: article.summary,
    openGraph: {
      title: article.title,
      description: article.summary,
      type: "article",
      publishedTime: article.publishedDate,
      modifiedTime: article.updatedDate,
      authors: [article.author],
    },
  };
}

export default function HealthArticleDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const article = articlesData.find((a) => a.slug === params.slug);
  if (!article) {
    notFound();
  }

  const relatedTreatments = treatmentsData.filter((t) =>
    article.relatedTreatmentSlugs.includes(t.slug)
  );

  const relatedDoctors = doctorsData.filter((d) =>
    article.relatedDoctorIds.includes(d.id)
  );

  // Article JSON-LD structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    headline: article.title,
    description: article.summary,
    image: article.imageUrl,
    datePublished: article.publishedDate,
    dateModified: article.updatedDate,
    author: {
      "@type": "Organization",
      name: article.author,
    },
    reviewedBy: {
      "@type": "Person",
      name: article.medicalReviewer,
      jobTitle: article.reviewerDesignation,
    },
    publisher: {
      "@type": "Hospital",
      name: hospitalData.name,
      url: SITE_URL,
    },
  };

  return (
    <div className="py-8 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      {article.faqs.length > 0 && <FAQJsonLd faqs={article.faqs} />}

      <Container>
        <Breadcrumbs
          items={[
            { label: "Health Library", href: "/health-library" },
            { label: article.title },
          ]}
        />

        {/* Article Header */}
        <div className="mt-6 max-w-4xl space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200">
              {article.category}
            </span>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-teal-600" />
                {article.readingTimeMinutes} min read
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                Published {formatDate(article.publishedDate)} (Updated {formatDate(article.updatedDate)})
              </span>
            </div>
          </div>

          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy-950 tracking-tight leading-tight">
            {article.title}
          </h1>

          <p className="text-base sm:text-lg text-surface-muted leading-relaxed">
            {article.summary}
          </p>

          {/* Medical Reviewer Badge */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-teal-100 text-teal-800 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
                  Medically Reviewed By
                </span>
                <span className="font-heading font-bold text-sm text-navy-950">
                  {article.medicalReviewer}
                </span>
                <span className="text-xs text-slate-500 block">
                  {article.reviewerDesignation}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Hero Image */}
        <div className="mt-8 relative aspect-video sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl border-4 border-white max-w-5xl">
          <Image
            src={article.imageUrl}
            alt={article.title}
            fill
            priority
            sizes="(max-width: 1024px) 100vw, 1100px"
            className="object-cover"
          />
        </div>

        {/* Article Body & Sidebar Grid */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Article Content */}
          <div className="lg:col-span-8 space-y-8">
            {article.sections.map((sec, sIdx) => (
              <section key={sIdx} className="space-y-4">
                <h2 className="font-heading text-xl sm:text-2xl font-bold text-navy-950">
                  {sec.heading}
                </h2>
                {sec.body.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    className="text-sm sm:text-base text-surface-muted leading-relaxed"
                  >
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {/* Key Takeaways Callout Box */}
            <div className="p-6 sm:p-8 rounded-3xl bg-teal-50/70 border border-teal-200 space-y-4 shadow-sm">
              <div className="flex items-center gap-2 text-teal-950 font-heading font-bold text-lg">
                <CheckCircle2 className="w-5 h-5 text-teal-700" />
                <h3>Key Clinical Takeaways</h3>
              </div>
              <ul className="space-y-2.5">
                {article.keyTakeaways.map((item, idx) => (
                  <li key={idx} className="text-xs sm:text-sm text-teal-950 flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-700 mt-2 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Medical Transparency Disclaimer */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-3">
              <ShieldCheck className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <div>
                <strong className="text-navy-950">Medical Notice: </strong>
                This article is published for patient educational awareness and does not replace individualized diagnostic assessment. Always consult our qualified orthopaedic doctors.
              </div>
            </div>

            {/* Article FAQs */}
            {article.faqs.length > 0 && (
              <div className="pt-8 space-y-4 border-t border-slate-200">
                <h3 className="font-heading font-bold text-xl text-navy-950">
                  Frequently Asked Questions
                </h3>
                <FAQAccordion faqs={article.faqs} />
              </div>
            )}
          </div>

          {/* Right Sidebar: Related Treatments & Doctors */}
          <div className="lg:col-span-4 space-y-6">
            {relatedTreatments.length > 0 && (
              <div className="p-6 rounded-3xl bg-white border border-surface-border shadow-card space-y-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                  Related Treatments
                </span>
                <div className="space-y-3">
                  {relatedTreatments.map((tr) => (
                    <Link
                      key={tr.id}
                      href={`/treatments/${tr.slug}`}
                      className="block p-3.5 rounded-xl bg-surface-bg hover:bg-teal-50 border border-surface-border transition-colors text-xs"
                    >
                      <span className="font-bold text-navy-950 block mb-1">
                        {tr.title}
                      </span>
                      <span className="text-teal-800 font-semibold inline-flex items-center gap-1">
                        <span>View Treatment Guide</span>
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* OPD Consultation Booking Card */}
            <div className="p-6 rounded-3xl bg-navy-900 text-white space-y-4 shadow-elevated">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block">
                Expert Consultation
              </span>
              <h4 className="font-heading font-bold text-lg text-white">
                Consult Our Orthopaedic Team in Nerul
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Receive an objective evaluation from our senior specialists at Shashwat Hospital.
              </p>
              <Link
                href="/appointment"
                className="w-full py-3 px-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-navy-950 font-bold text-xs flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Book OPD Consultation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16">
          <CTASection />
        </div>
      </Container>
    </div>
  );
}
