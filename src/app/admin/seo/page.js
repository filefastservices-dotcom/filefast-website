const checks = [
  { title: "Canonical website", detail: "Use https://www.filefastglobal.com as the preferred public domain.", href: "https://www.filefastglobal.com" },
  { title: "XML sitemap", detail: "Submit the sitemap and monitor discovered and indexed URLs.", href: "https://www.filefastglobal.com/sitemap.xml" },
  { title: "Robots instructions", detail: "Confirm public pages are crawlable and admin/API routes remain restricted.", href: "https://www.filefastglobal.com/robots.txt" },
  { title: "Google Search Console", detail: "Inspect indexing, page experience, Core Web Vitals and search queries.", href: "https://search.google.com/search-console?resource_id=https%3A%2F%2Fwww.filefastglobal.com%2F" },
  { title: "Rich Results Test", detail: "Validate Organization, Service, Breadcrumb and FAQ structured data where eligible.", href: "https://search.google.com/test/rich-results" },
  { title: "PageSpeed Insights", detail: "Check mobile performance, LCP, INP, CLS and opportunities by URL.", href: "https://pagespeed.web.dev/" },
  { title: "Google Business Profile", detail: "Keep the business name, logo, website, contact details and review link consistent.", href: "https://business.google.com/" }
];
const tasks = [
  "Use the same approved FileFast logo on the website header, footer, admin header, favicon and social preview artwork.",
  "Check that every important service and blog page has a unique title, meta description and canonical URL.",
  "Add useful contextual internal links between service pages and relevant guides.",
  "Review Search Console indexing and fix discovered 404, redirect and duplicate-canonical issues.",
  "Check mobile LCP, INP and CLS on the homepage, service pages and blog articles.",
  "Publish genuine client testimonials only with permission and a traceable source.",
  "Refresh sitemap last-modified values only when the page actually changes."
];
export default function AdminSeoPage() {
  return <div className="space-y-6">
    <div><p className="text-xs font-bold uppercase tracking-wider text-gold-dark">Website growth centre</p><h1 className="mt-1 font-display text-2xl font-semibold text-navy">SEO & Google Visibility</h1><p className="mt-2 max-w-3xl text-sm leading-6 text-navy/65">A central workspace for checking search visibility, technical SEO, structured data, page speed and brand consistency. External Google tools open in a new tab; their account data is not displayed inside this dashboard.</p></div>
    <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{checks.map((item) => <a key={item.title} href={item.href} target="_blank" rel="noopener noreferrer" className="rounded border border-silver/70 bg-white p-5 transition hover:border-gold hover:shadow-sm"><h2 className="font-semibold text-navy">{item.title} ↗</h2><p className="mt-2 text-sm leading-5 text-navy/60">{item.detail}</p></a>)}</section>
    <section className="rounded border border-silver/70 bg-white p-5"><h2 className="font-semibold text-navy">SEO quality-control checklist</h2><p className="mt-1 text-xs text-navy/50">Review these before and after publishing a major content update.</p><ul className="mt-4 space-y-3">{tasks.map((task) => <li key={task} className="flex gap-3 text-sm leading-5 text-navy/75"><span aria-hidden="true" className="mt-0.5 inline-flex h-4 w-4 shrink-0 rounded border border-silver-dark/50" />{task}</li>)}</ul></section>
    <section className="rounded border border-silver/70 bg-white p-5"><h2 className="font-semibold text-navy">Quick access to website content</h2><div className="mt-3 flex flex-wrap gap-2">{[["Manage services","/admin/services"],["Manage blog","/admin/blog"],["Manage testimonials","/admin/testimonials"],["Lead analytics","/admin/analytics"],["Open homepage","/"]].map(([label,href]) => <a key={href} href={href} className="rounded border border-silver px-3 py-2 text-xs font-semibold text-navy hover:border-gold">{label} →</a>)}</div></section>
  </div>;
}