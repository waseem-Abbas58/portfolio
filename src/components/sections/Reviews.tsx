import Image from "next/image";
import { Star } from "lucide-react";
import { Atmosphere } from "@/components/background/Atmosphere";
import { Reveal, SectionHead } from "@/components/ui/Reveal";
import { Spotlight } from "@/components/ui/Interactive";
import { Button } from "@/components/ui/Button";
import { fiverr, reviews } from "@/content/profile";

function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="flex items-center gap-0.5 text-cyan" role="img" aria-label="Rated 5 out of 5">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} fill="currentColor" strokeWidth={0} aria-hidden />
      ))}
      <span aria-hidden className="ml-1.5 text-[15px] font-bold leading-none">5</span>
    </span>
  );
}

/** Verified client reviews, copied word for word from the Fiverr account. */
export function Reviews() {
  return (
    <section id="reviews" className="relative isolate overflow-hidden py-20 md:py-28">
      <Atmosphere variant="experience" />
      <div className="container-page">
        <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <SectionHead
            index="03"
            label="Client reviews"
            lines={["What clients", <span key="b">say <span className="text-shine">after delivery.</span></span>]}
            intro="Real reviews from real orders, word for word from my Fiverr account."
            className="!mb-0"
          />
          <Reveal delay={0.15}>
            <div className="glass rounded-[28px] p-6 md:p-7">
              <div className="flex items-center gap-4">
                <span className="font-display text-[56px] font-bold leading-none tracking-[-0.04em]">{fiverr.rating}</span>
                <div>
                  <Stars size={18} />
                  <p className="mt-1.5 text-[14px] text-muted">
                    {fiverr.reviews} reviews from {fiverr.orders} completed orders
                  </p>
                </div>
              </div>
              <Button href={fiverr.profile} external icon="external" variant="secondary" className="mt-5 w-full">
                View all reviews on Fiverr
              </Button>
            </div>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((r, i) => (
            <li key={r.client}>
              <Reveal delay={(i % 3) * 0.09} flip className="h-full">
                <Spotlight className="glass group flood-card card-fx h-full overflow-hidden rounded-[28px] p-6 md:p-7">
                  <span aria-hidden className="fill-fx" />
                  <figure className="flex h-full flex-col">
                    <Stars />
                    <blockquote className="mt-5 flex-1 text-[17px] font-medium leading-[1.55] tracking-[-0.01em]">
                      {r.text}
                    </blockquote>
                    <figcaption className="mt-7 flex items-center gap-3">
                      {r.photo ? (
                        <Image src={r.photo} alt="" width={46} height={46} className="h-[46px] w-[46px] rounded-full bg-white object-cover" />
                      ) : (
                        <span aria-hidden className="grid h-[46px] w-[46px] place-items-center rounded-full bg-accent font-display text-[18px] font-bold uppercase text-on-accent">
                          {r.client[0]}
                        </span>
                      )}
                      <span>
                        <span className="block text-[15px] font-semibold">{r.client}</span>
                        <span className="mt-0.5 flex items-center gap-1.5 text-[13.5px] text-muted">
                          <Image
                            src={`https://cdn.jsdelivr.net/npm/flag-icons@7.2.3/flags/4x3/${r.flag}.svg`}
                            alt=""
                            width={18}
                            height={13}
                            className="h-[13px] w-[18px] rounded-[2px] object-cover"
                          />
                          {r.country}
                        </span>
                      </span>
                    </figcaption>
                  </figure>
                </Spotlight>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
