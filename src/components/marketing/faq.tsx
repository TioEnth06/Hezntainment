import { Eyebrow, Section, SectionTitle } from "@/components/marketing/section";

const faqs = [
  {
    q: "Apa bedanya workspace switcher?",
    a: "Setiap brand (mis. Jeparanesia, Siinbooth) adalah workspace terpisah. Ganti brand di sidebar, maka Monitor Data dan Laporan KPI memuat ulang hanya data workspace aktif.",
  },
  {
    q: "Platform apa yang di-SYNC di Monitor Data?",
    a: "Phase 1: metrik publik TikTok, Instagram, dan YouTube. SYNC per baris atau SYNC ALL masuk antrean agar tidak kena rate-limit.",
  },
  {
    q: "Bagaimana KPI Sosmed vs Editor dihitung?",
    a: "Sosmed menarget Create Scripts (breakdown DRAFT / PROSES / DONE). Editor menarget Finish Videos — dihitung saat status jadi READY_TO_REVIEW atau PUBLISHED di bulan berjalan.",
  },
  {
    q: "Apakah Editor bisa lihat billing atau Manajemen Tim?",
    a: "Tidak. Menu Administrasi (Tim, Inventaris Brand) khusus Admin. Editor fokusat Dashboard/Kalender; Sosmed bisa Monitor Data + Laporan KPI.",
  },
  {
    q: "Kapan integrasi Web3 / Superteam?",
    a: "Phase 1 mengunci Web2 core. Phase 2 menambahkan Connect via Superteam Hub tanpa mengubah alur Monitor & KPI yang sudah dipakai harian.",
  },
];

export function Faq() {
  return (
    <Section id="faq" tone="surface">
      <Eyebrow>FAQ</Eyebrow>
      <SectionTitle>Jawaban langsung sebelum trial.</SectionTitle>
      <div className="mt-10 divide-y divide-line">
        {faqs.map((item) => (
          <details key={item.q} className="group py-5">
            <summary className="cursor-pointer list-none text-base font-semibold text-ink marker:content-none group-open:text-accent md:text-lg">
              {item.q}
            </summary>
            <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              {item.a}
            </p>
          </details>
        ))}
      </div>
    </Section>
  );
}
