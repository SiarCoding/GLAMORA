import { SITE, ADDRESS_LINE, speaks } from "@/lib/site";
import { seq } from "@/lib/pages";

/* Türkçe sayfalar — /tr/<slug>. Same template and facts as the German pages
 * (numbers come from SITE.numbers), written for Turkish-speaking customers in
 * Hamburg searching "abiye", "tesettür abiye", "nişan / kına elbisesi".
 * `group` = hreflang partner, see lib/registry.js.
 * GLAMORA'nın kendi terzisi YOK — tadilat vaat etme. */

const N = SITE.numbers;
const T = {
  models: `${N.models}'den fazla`,
  sizes: `${N.sizeMin}–${N.sizeMax} beden`,
  priceDress: `${N.priceLow} € – ${N.priceHigh} €`,
  priceAbaya: `${N.abayaLow} € – ${N.abayaHigh} €`,
  priceFrom: `${N.priceLow} €`,
  orderDubai: `${N.orderWeeks[0]}–${N.orderWeeks[1]} hafta`,
  appointment: `${N.appointmentMin[0]}–${N.appointmentMin[1]} dakika`,
  companions: `en fazla ${N.companions} kişi`,
  market: "yaklaşık 240 € ile 1.000 €'nun üzeri",
};

// Only claim Turkish-language advice if the team actually speaks it (lib/site.js).
const langFact = speaks("tr") ? [["Danışmanlık", "Türkçe ve Almanca"]] : [];
const langFaq = speaks("tr")
  ? [["Türkçe danışmanlık var mı?", "Evet, ekibimizde Türkçe konuşan danışmanlarımız var."]]
  : [];

const visitFacts = [
  ["Adres", ADDRESS_LINE],
  ["Prova", `randevuyla, ${T.appointment}`],
  ["Bedenler", T.sizes],
  ["Danışmanlık", "ücretsiz ve bağlayıcı değil"],
];

const howToGetHere = [
  "GLAMORA'ya nasıl gelirim?",
  "S3 veya S5 ile Harburg Rathaus durağına gelin, mağaza yaklaşık 5 dakika yürüme mesafesinde. Hamburg Hbf'den yaklaşık 15 dakika, Wilhelmsburg'dan yaklaşık 6 dakika sürer. Harburg merkezinde birkaç otopark bulunur.",
];

export const PAGES_TR = [
  /* ─────────────────────────── Abiye Hamburg ─────────────────────────────── */
  {
    slug: "abiye-hamburg",
    group: "main",
    nav: "Abiye Hamburg",
    title: `Hamburg Abiye Mağazası – Dubai Abiye Elbiseler ${T.priceFrom}'dan | GLAMORA`,
    description: `Hamburg'da abiye elbise: Harburg'daki butiğimizde ${T.models} Dubai modeli, ${T.sizes}, ${T.priceDress}. Randevulu özel prova, Lüneburger Straße 33.`,
    keywords: ["Hamburg abiye", "abiye mağazası Hamburg", "Hamburg abiye elbise", "Harburg abiye", "Almanya abiye mağazası", "Dubai abiye", "uzun abiye"],
    eyebrow: "Abiye · Hamburg",
    h1: "Hamburg'da abiye elbise – Dubai couture, randevulu özel prova",
    lead: `GLAMORA, Hamburg-Harburg'da (${SITE.street}) bir abiye butiğidir. Dubai'den gelen ${T.models} abiye, balo elbisesi ve abaya modelini ${T.sizes} aralığında, ${T.priceDress} fiyatlarla sunuyoruz. Prova randevuyla özel salonda yapılır ve ${T.appointment} sürer.`,
    facts: [
      ["Model", T.models],
      ["Fiyatlar", T.priceDress],
      ...langFact,
      ...visitFacts,
    ],
    sequences: [
      seq("abendkleider-1", {
        eyebrow: "Koleksiyon",
        title: "Saten, ipek, kristal.",
        body: "Her elbise Dubai'de üretilir: elle işlenmiş kristaller, balenli korseler ve Hamburg mağazalarında nadir bulunan kumaşlar.",
        points: ["Uzun abiye ve balo elbiseleri", "Balık, A kesim, Empire", "Zümrüt, şampanya, siyah, bordo"],
        focalX: 0.66,
      }),
      seq("abendkleider-2", {
        eyebrow: "Her davet için",
        title: "Düğün, nişan, gala.",
        body: "Düğün davetlisi, nişan, kına ya da mezuniyet balosu – davetinize, bedeninize ve bütçenize göre modelleri önceden hazırlıyoruz.",
        points: ["Size özel ön seçim", "Özel prova kabini ve ayna salonu", "Elbiseye uygun aksesuarlar"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Hamburg'da abiye nereden alınır?",
        body: [
          `Hazır giyim yerine özel bir abiye arıyorsanız, GLAMORA Harburg'da Dubai couture sunar: işlemeler, payetler, inciler ve korseler, ${T.sizes} aralığında. Büyük mağazaların aksine aynı anda yalnızca bir müşteriyle ilgileniyoruz – acele etmeden, davetinize uygun bir ön seçimle.`,
          "Mağazamız Lüneburger Straße'de, Harburg Rathaus S-Bahn durağına birkaç dakika yürüme mesafesinde. Wilhelmsburg, Veddel, Neugraben ve Buxtehude'den S-Bahn ile aktarmasız gelebilirsiniz.",
        ],
      },
      {
        h2: "GLAMORA'da abiye fiyatları ne kadar?",
        body: [
          `Abiye elbiselerimiz ${T.priceDress}, abayalarımız ${T.priceAbaya} arasındadır. Karşılaştırma için: Hamburg butiklerinde benzer abiyeler genellikle ${T.market} arasında satılıyor.`,
        ],
        table: {
          head: ["Kategori", "Fiyat aralığı", "Tipik davetler"],
          rows: [
            ["Abiye elbiseler", T.priceDress, "Düğün, gala, balo"],
            ["Abayalar (davet)", T.priceAbaya, "Düğün, nikah, bayram"],
            ["Mezuniyet / balo elbiseleri", T.priceDress, "Abiball, mezuniyet balosu"],
            ["Nişan, söz ve kına elbiseleri", T.priceDress, "Nişan, söz, kına gecesi"],
          ],
        },
      },
      {
        h2: "Hangi davete hangi abiye?",
        table: {
          head: ["Davet", "Uygun kesimler", "Renkler"],
          rows: [
            ["Salon düğünü (davetli)", "Uzun, payetli veya kristalli", "Zümrüt, safir, bordo, adaçayı"],
            ["Nişan / söz (gelin)", "Korse, pelerin kol, kristal kemer", "Lila, pudra, şampanya"],
            ["Kına gecesi (gelin)", "Kadife bindallı, işlemeli kaftan", "Kırmızı, bordo, mor, altın"],
            ["Mezuniyet balosu", "Tül balo elbisesi, payetli", "Pudra mavi, gümüş, rose gold"],
          ],
        },
      },
    ],
    faq: [
      ["Hamburg'da abiye mağazası var mı?", `Evet. GLAMORA, Hamburg-Harburg'da (${ADDRESS_LINE}) Dubai abiyeleri sunan bir butiktir: ${T.models} model, ${T.sizes}, randevulu prova.`],
      ["Abiye fiyatları ne kadar?", `Abiyeler ${T.priceDress}, abayalar ${T.priceAbaya}.`],
      ["Hamburg'da uygun fiyatlı ama kaliteli abiye nerede bulunur?", `GLAMORA'da: Dubai couture abiyeler ${T.priceFrom}'dan başlar. Hamburg butiklerinde benzer modeller genellikle ${T.market} arasındadır.`],
      ["Randevu gerekli mi?", "Randevu almanızı öneririz; böylece salon size ayrılır ve modelleriniz hazır bekler. Randevu yoksa uğrayabilirsiniz."],
      ["Mağazada olmayan beden veya renk sipariş edilebilir mi?", `Evet, Dubai'den sipariş ediyoruz; teslim süresi genellikle ${T.orderDubai}.`],
      ["Tadilat yapıyor musunuz?", "Hayır, kendi terzimiz yok. Provada size en iyi oturan modeli ve bedeni bulmanıza yardımcı oluyoruz."],
      ...langFaq,
      howToGetHere,
    ],
    related: ["tesettur-abiye-hamburg", "nisan-kina-elbisesi-hamburg", "abaya-hamburg"],
  },

  /* ─────────────────────────── Tesettür Abiye ────────────────────────────── */
  {
    slug: "tesettur-abiye-hamburg",
    group: "hijab",
    nav: "Tesettür Abiye",
    title: "Tesettür Abiye Hamburg – uzun kollu, kapalı Dubai abiyeleri | GLAMORA",
    description: `Hamburg'da tesettür abiye: uzun kollu, dik yakalı, astarlı Dubai abiyeleri, ${T.sizes}, ${T.priceDress}. İsteğe bağlı yalnızca kadın danışmanlarla prova, Harburg.`,
    keywords: ["tesettür abiye Hamburg", "kapalı abiye Hamburg", "tesettür abiye mağazası Almanya", "uzun kollu abiye", "tesettür nişan elbisesi", "Hamburg tesettür"],
    eyebrow: "Tesettür · Hamburg",
    h1: "Hamburg'da tesettür abiye – uzun kollu, kapalı ve astarlı",
    lead: `GLAMORA, Hamburg-Harburg'da tesettüre uygun abiyeler sunar: dik veya kapalı yaka, uzun kol, astarlı ve yere kadar uzun. Modeller Dubai'den gelir, ${T.priceDress} arasıdır ve ${T.sizes} aralığında bulunur. Prova isteğe bağlı olarak yalnızca kadın danışmanlarla yapılır.`,
    facts: [
      ["Özellikler", "Uzun kol, kapalı yaka, astarlı"],
      ["Fiyatlar", T.priceDress],
      ["Prova", "isteğe bağlı yalnızca kadınlar"],
      ...langFact,
      ...visitFacts.slice(0, 3),
    ],
    sequences: [
      seq("hijab-1", {
        eyebrow: "Tesettür couture",
        title: "Kapalı. Ve göz alıcı.",
        body: "Gül kurusu saten, kristal manşetler, kapalı yaka ve uzun kollar – başörtüsüyle uyumlu, ışıltıdan ödün vermeden.",
        points: ["Uzun kol ve kapalı yaka", "Astarlı, transparan değil", "Uyumlu renkte şal"],
        focalX: 0.66,
      }),
      seq("hijab-2", {
        eyebrow: "Düğün için",
        title: "Adaçayı, inci, şifon.",
        body: "Piskopos kollu akışkan şifon katlar ve yakada inciler – düğün, nikah ve bayram için.",
        points: ["Piskopos ve pelerin kollar", "İnci ve kristal işleme", "Yere kadar, yırtmaçsız"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Tesettüre uygun abiye nasıl anlaşılır?",
        table: {
          head: ["Kriter", "Nelere dikkat edilmeli", "GLAMORA'da"],
          rows: [
            ["Kollar", "Bileğe kadar, transparan değil", "Birçok model uzun kollu"],
            ["Yaka", "Kapalı veya dik yaka", "Dik yaka, bisiklet yaka"],
            ["Boy", "Yere kadar, yırtmaçsız", "Yere kadar modeller"],
            ["Kumaş", "Göstermeyen, vücuda yapışmayan", "Astarlı, A kesim, akışkan"],
          ],
        },
      },
      {
        h2: "Kolsuz bir abiye tesettüre nasıl uyarlanır?",
        body: ["Beğendiğiniz model kolsuz ya da açık yakalıysa üç kolay çözüm var: elbisenin renginde göstermeyen uzun kollu bir badi veya içlik, şifon bir bolero ya da pelerin, ya da elbisenin üzerine açık, işlemeli bir abaya. Provada bunları sizinle birlikte deneriz."],
      },
    ],
    faq: [
      ["Hamburg'da tesettür abiye nereden alınır?", `GLAMORA'da, ${ADDRESS_LINE}: Dubai'den uzun kollu, kapalı yakalı abiyeler.`],
      ["Prova yalnızca kadınlarla yapılabilir mi?", "Evet, isteğe bağlı olarak yalnızca kadın danışmanlar ilgilenir ve randevunuz boyunca salon kapalıdır."],
      ["Büyük beden tesettür abiye var mı?", `Evet, ${T.sizes} aralığında.`],
      ["Abaya da satıyor musunuz?", "Evet, Dubai'den davet abayaları – Abaya Hamburg sayfamıza bakabilirsiniz."],
      ...langFaq,
    ],
    related: ["abiye-hamburg", "abaya-hamburg", "nisan-kina-elbisesi-hamburg"],
  },

  /* ─────────────────────────── Abaya (TR) ────────────────────────────────── */
  {
    slug: "abaya-hamburg",
    group: "abaya",
    nav: "Abaya Hamburg",
    title: "Abaya Hamburg – Dubai abayalarını mağazada deneyin, Harburg | GLAMORA",
    description: `Hamburg'da abaya: düğün, nikah ve bayram için Dubai abayaları mağazada deneyin. ${T.priceAbaya}, 52–60 inç boylar. Lüneburger Straße 33, Hamburg-Harburg.`,
    keywords: ["abaya Hamburg", "Dubai abaya Hamburg", "abaya mağazası Hamburg", "bayramlık abaya", "ferace Hamburg"],
    eyebrow: "Abaya · Hamburg",
    h1: "Hamburg'da abaya – Dubai abayalarını mağazada deneyin",
    lead: `GLAMORA, Hamburg-Harburg'da Dubai abayalarını yerinde deneyebileceğiniz bir mağazadır. İpek krep, nida ve şifondan, altın işlemeli, incili ve kristalli davet abayaları ${T.priceAbaya} arasındadır. Prova isteğe bağlı olarak yalnızca kadınlarla yapılır.`,
    facts: [
      ["Fiyatlar", T.priceAbaya],
      ["Kumaşlar", "Nida, ipek krep, şifon"],
      ["Boylar", "52–60 inç"],
      ...langFact,
      ...visitFacts.slice(0, 2),
    ],
    sequences: [
      seq("abaya-1", {
        eyebrow: "Dubai abayaları",
        title: "Akışkan. İşlemeli. Asil.",
        body: "Altın sim şeritli siyah abayalar, kimono kesimler ve pelerinli modeller – Dubai'de üretildi, Hamburg'da deneniyor.",
        points: ["Nida, ipek krep, şifon", "Altın sim, inci, kristal", "İsteğe uygun şal"],
        focalX: 0.66,
      }),
      seq("abaya-2", {
        eyebrow: "Davet abayaları",
        title: "Nikah, düğün ve bayram.",
        body: "Nikah için inci işlemeli fildişi abayalar, düğün için zümrüt ve altın, bayram için sakin tonlar.",
        points: ["Fildişi ve şampanya gelin abayaları", "Doğru boy inç olarak", "Kadınlara özel prova"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Boyuma hangi abaya uzunluğu uygun?",
        body: ["Dubai abayaları omuzdan etek ucuna inç cinsinden ölçülür. Abaya ayakta yere yakın bitmelidir; topuklu ayakkabıyla bir boy uzununu seçin."],
        table: {
          head: ["Boy", "Abaya uzunluğu", "Topukluyla"],
          rows: [
            ["150–155 cm", "52 inç", "54 inç"],
            ["155–160 cm", "54 inç", "56 inç"],
            ["160–165 cm", "56 inç", "58 inç"],
            ["165–170 cm", "58 inç", "60 inç"],
            ["170 cm üzeri", "60 inç", "60 inç, alçak topuk"],
          ],
        },
      },
    ],
    faq: [
      ["Hamburg'da abaya nerede denenir?", `GLAMORA'da, ${ADDRESS_LINE}. Dubai davet abayalarını isteğe bağlı olarak yalnızca kadınlarla deneyebilirsiniz.`],
      ["Kaliteli bir Dubai abayası ne kadar?", `Bizde ${T.priceAbaya} arasında, kumaşa ve işlemeye göre.`],
      ["Hangi abaya uzunluğuna ihtiyacım var?", "Örnek: 160–165 cm boy için 56 inç, topuklu için 58 inç. Tablonun tamamı yukarıda."],
      ...langFaq,
    ],
    related: ["tesettur-abiye-hamburg", "abiye-hamburg", "nisan-kina-elbisesi-hamburg"],
  },

  /* ─────────────────────────── Nişan & Kına ──────────────────────────────── */
  {
    slug: "nisan-kina-elbisesi-hamburg",
    group: "verlobung",
    nav: "Nişan & Kına",
    title: "Nişan Elbisesi & Kına Elbisesi Hamburg – Bindallı, Söz | GLAMORA",
    description: `Hamburg'da nişan elbisesi, söz elbisesi ve kına elbisesi: Dubai couture, kadife bindallı ve kaftanlar, uzun kollu modeller. ${T.priceDress}, Harburg'da randevulu prova.`,
    keywords: ["nişan elbisesi Hamburg", "kına elbisesi Hamburg", "bindallı Hamburg", "söz elbisesi Hamburg", "kına kıyafeti", "nişanlık Almanya"],
    eyebrow: "Nişan · Söz · Kına",
    h1: "Hamburg'da nişan ve kına elbisesi – söz, nişan ve kına gecesi için",
    lead: `GLAMORA Hamburg-Harburg'da nişan, söz ve kına gecesi için Dubai'den couture elbiseler, kadife bindallılar ve işlemeli kaftanlar sunar; fiyatlar ${T.priceDress} arasındadır. Birçok model uzun kollu ve kapalı yakalıdır. Dilediğiniz renkte sipariş için düğünden 8–10 hafta önce gelmenizi öneririz (${T.orderDubai}).`,
    facts: [
      ["Fiyatlar", T.priceDress],
      ["Kına", "kırmızı, bordo, mor, altın"],
      ["Nişan", "lila, pudra, şampanya, zümrüt"],
      ["Hazırlık", "8–10 hafta önce ideal"],
      ...langFact,
      ...visitFacts.slice(0, 1),
    ],
    sequences: [
      seq("verlobung-1", {
        eyebrow: "Kına gecesi",
        title: "Kadife, altın ve mum ışığı.",
        body: "Kına gecesi için zümrüt, bordo ve mor tonlarında altın işlemeli kadife elbiseler ve kaftanlar – mum ışığında parlayan işlemeler.",
        points: ["Altın işlemeli kadife kaftanlar", "Kırmızı, bordo, mor", "İsteğe uygun duvak"],
        focalX: 0.66,
      }),
      seq("verlobung-2", {
        eyebrow: "Nişan ve söz",
        title: "Lila, şifon, kristal.",
        body: "Pelerin kollu, kristal kemerli hafif şifon elbiseler – nişanda romantik, nikahta zarif.",
        points: ["Pelerin kol ve korse", "Lila, pudra, şampanya", "Nikah elbisesi olarak da"],
        focalX: 0.66,
      }),
    ],
    sections: [
      {
        h2: "Nişanda ve kınada hangi renk giyilir?",
        table: {
          head: ["Tören", "Gelin", "Kesim"],
          rows: [
            ["Söz", "Pudra, pastel, şampanya", "Midi veya uzun, sade"],
            ["Nişan", "Lila, pudra, şampanya, zümrüt", "Korse, pelerin kol, A kesim"],
            ["Kına gecesi", "Kırmızı, bordo, mor, altın", "Kadife bindallı, işlemeli kaftan"],
            ["Nikah (resmi)", "Krem, pudra, adaçayı", "Midi, sade ipek"],
          ],
        },
      },
      {
        h2: "Dubai'den sipariş ne kadar sürer?",
        body: [`Stoktaki modelleri hemen alabilirsiniz. Dilediğiniz renk veya beden için Dubai'den sipariş genellikle ${T.orderDubai} sürer.`],
      },
    ],
    faq: [
      ["Hamburg'da nişan elbisesi nereden alınır?", `GLAMORA'da, ${ADDRESS_LINE}: Dubai'den nişan, söz ve kına elbiseleri, randevulu prova.`],
      ["Kına gecesinde gelin ne giyer?", "Geleneksel olarak kırmızı, bordo veya mor tonlarında, altın işlemeli kadife bir bindallı veya kaftan ve kırmızı duvak."],
      ["Uzun kollu, kapalı nişan elbisesi var mı?", "Evet, birçok model uzun kollu ve kapalı yakalıdır."],
      ["Nişan elbisesi fiyatları ne kadar?", `${T.priceDress} arasında.`],
      ...langFaq,
    ],
    related: ["abiye-hamburg", "tesettur-abiye-hamburg", "abaya-hamburg"],
  },
];
