import { SITE } from "@/lib/site";

/* UI strings for the landing-page template in the three site languages.
 * Content (H1, lead, FAQ …) lives in lib/pages*.js; this file only holds the
 * chrome around it. */

export const LOCALES = {
  de: { lang: "de", hreflang: "de", og: "de_DE", dir: "ltr", prefix: "" },
  tr: { lang: "tr", hreflang: "tr", og: "tr_TR", dir: "ltr", prefix: "/tr" },
  ar: { lang: "ar", hreflang: "ar", og: "ar_AR", dir: "rtl", prefix: "/ar" },
};

export const LANGUAGE_LABEL = { de: "Deutsch", tr: "Türkçe", ar: "العربية" };

export const UI = {
  de: {
    skip: "Direkt zum Inhalt",
    home: "GLAMORA",
    cta: "Anprobe-Termin vereinbaren",
    route: "Route planen",
    updated: "Stand",
    faqEyebrow: "Häufige Fragen",
    faqTitle: "Fragen & Antworten",
    visitEyebrow: "Besuchen Sie uns",
    visitTitle: "Anprobe in Hamburg-Harburg",
    visitBody: "Schreiben Sie uns Anlass, Datum, Größe und Budget – Ihre Vorauswahl hängt beim Termin bereit.",
    mailCta: "Termin per E-Mail anfragen",
    mailSubject: "Anprobe-Termin",
    whatsapp: "WhatsApp",
    address: "Adresse",
    hours: "Öffnungszeiten",
    transit: "Anfahrt",
    contact: "Kontakt",
    openMaps: "In Google Maps öffnen",
    related: "Weiterlesen",
    view: "Ansehen →",
    hoursLabel: SITE.hoursLabel,
    transitText: SITE.transit,
    valueProp: SITE.valueProp,
    languages: "Sprachen",
  },
  tr: {
    skip: "İçeriğe geç",
    home: "GLAMORA",
    cta: "Prova randevusu al",
    route: "Yol tarifi",
    updated: "Güncelleme",
    faqEyebrow: "Sık sorulan sorular",
    faqTitle: "Sorular ve cevaplar",
    visitEyebrow: "Mağazamıza bekleriz",
    visitTitle: "Hamburg-Harburg'da prova",
    visitBody: "Bize davetin türünü, tarihini, bedeninizi ve bütçenizi yazın – randevunuzda size uygun modeller hazır bekler.",
    mailCta: "E-posta ile randevu iste",
    mailSubject: "Prova randevusu",
    whatsapp: "WhatsApp",
    address: "Adres",
    hours: "Çalışma saatleri",
    transit: "Ulaşım",
    contact: "İletişim",
    openMaps: "Google Haritalar'da aç",
    related: "Diğer sayfalar",
    view: "İncele →",
    hoursLabel: "Salı – Cumartesi · 11:00 – 19:00, bu saatler dışında randevuyla",
    transitText: "S3 / S5 ile Harburg Rathaus durağı (yaklaşık 5 dakika yürüme) · Hamburg Hbf'den yaklaşık 15 dakika · Harburg merkezinde otoparklar",
    valueProp: "Dubai couture kalitesi, uygun fiyata: abiye elbiseler 70 €'dan, abayalar 70 €'dan başlayan fiyatlarla – Hamburg butiklerinde benzer abiyeler genellikle 240 € ile 1.000 €'nun üzerinde.",
    languages: "Diller",
  },
  ar: {
    skip: "انتقل إلى المحتوى",
    home: "GLAMORA",
    cta: "احجزي موعد القياس",
    route: "الاتجاهات",
    updated: "آخر تحديث",
    faqEyebrow: "أسئلة شائعة",
    faqTitle: "أسئلة وأجوبة",
    visitEyebrow: "زورينا",
    visitTitle: "القياس في هامبورغ-هاربورغ",
    visitBody: "أرسلي لنا نوع المناسبة وتاريخها ومقاسك وميزانيتك – وسنجهّز لك مجموعة مختارة قبل موعدك.",
    mailCta: "اطلبي موعدًا عبر البريد الإلكتروني",
    mailSubject: "موعد قياس",
    whatsapp: "واتساب",
    address: "العنوان",
    hours: "ساعات العمل",
    transit: "الوصول",
    contact: "التواصل",
    openMaps: "افتحي في خرائط Google",
    related: "صفحات أخرى",
    view: "← عرض",
    hoursLabel: "الثلاثاء – السبت · 11:00 – 19:00، ومواعيد خارج هذه الأوقات بالاتفاق",
    transitText: "قطار S3 / S5 إلى محطة Harburg Rathaus (حوالي 5 دقائق سيرًا) · حوالي 15 دقيقة من محطة Hamburg Hbf · مواقف سيارات في وسط هاربورغ",
    valueProp: "جودة الأزياء الراقية من دبي بأسعار عادلة: فساتين سهرة ابتداءً من 70 € وعبايات ابتداءً من 70 € – بينما تبلغ أسعار الفساتين المشابهة في بوتيكات هامبورغ عادةً بين 240 € وأكثر من 1000 €.",
    languages: "اللغات",
  },
};

export function formatUpdated(locale) {
  const d = new Date(`${SITE.updated}T12:00:00Z`);
  const loc = { de: "de-DE", tr: "tr-TR", ar: "ar" }[locale];
  return d.toLocaleDateString(loc, { month: "long", year: "numeric", timeZone: "UTC" });
}
