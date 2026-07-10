import Pill from '@/components/ui/Pill';
import { COMPANY_LEGAL_NAME } from '@/lib/constants/company';

export interface LegalSection {
  heading: string;
  paragraphs?: React.ReactNode[];
  bullets?: React.ReactNode[];
}

interface LegalLayoutProps {
  pill: string;
  titleTop: string;
  titleAccent: string;
  intro: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalLayout({
  pill,
  titleTop,
  titleAccent,
  intro,
  lastUpdated,
  sections,
}: LegalLayoutProps) {
  return (
    <section className="bg-white">
      <div className="flex min-h-[420px] w-full items-start justify-center bg-[#2d3142] px-4 pb-14 pt-[calc(var(--navbar-height)+0.75rem)] text-center max-md:min-h-0 max-md:px-6 max-md:pt-[calc(var(--navbar-height)+0.25rem)] md:min-h-[480px] md:pt-[calc(var(--navbar-height)+0.5rem)]">
        <div className="mx-auto w-full max-w-[1040px]">
          <Pill className="mb-12">{pill}</Pill>
          <h1 className="m-0 font-heading text-[2.7rem] font-black leading-[1.2] tracking-[-0.02em] text-white md:text-[4.5rem] md:leading-[1.08]">
            {titleTop}
            <br />
            <span className="inline-block bg-[linear-gradient(171.05deg,#FFD23F_5.73%,#FFA726_94.27%)] bg-clip-text text-transparent">
              {titleAccent}
            </span>
          </h1>
          <p className="mx-auto mt-8 max-w-[760px] text-[0.95rem] leading-[1.6] text-white/50 md:text-[1.15rem]">
            {intro}
          </p>
          <p className="mt-6 text-sm font-semibold text-[#FFD23F]">Last updated: {lastUpdated}</p>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1480px] px-6 py-16 md:py-20">
        <div className="rounded-[1.25rem] border-[1.5px] border-[rgba(255,210,63,0.3)] bg-[linear-gradient(135deg,rgba(255,210,63,0.15)_0%,rgba(255,210,63,0.08)_100%)] p-6 md:p-8">
          <p className="text-base font-extrabold leading-[1.6] text-[#2D3142] md:text-lg">
            Travellink and SK Voyages are the units of {COMPANY_LEGAL_NAME}.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-12">
          {sections.map((section, index) => (
            <div key={section.heading}>
              <h2 className="mb-4 text-[1.4rem] font-extrabold leading-[1.3] text-[#111827] md:text-[1.75rem]">
                <span className="text-[#FFA726]">{index + 1}.</span> {section.heading}
              </h2>

              {section.paragraphs?.map((paragraph, paragraphIndex) => (
                <p
                  key={paragraphIndex}
                  className="mb-4 text-base leading-[1.75] text-[#6b7280] last:mb-0"
                >
                  {paragraph}
                </p>
              ))}

              {section.bullets && (
                <ul className="mt-4 flex list-none flex-col gap-3 p-0">
                  {section.bullets.map((bullet, bulletIndex) => (
                    <li
                      key={bulletIndex}
                      className="relative pl-6 text-base leading-[1.75] text-[#6b7280] before:absolute before:left-0 before:top-[0.7em] before:h-2 before:w-2 before:rounded-full before:bg-[#FFD23F]"
                    >
                      {bullet}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
