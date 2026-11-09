"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";

import LanguageSwitcher from "@/component/language-switcher";
import { archivo, logoFont, martianMono } from "../../font";
import styles from "./printer.module.css";

const PRICE_PER_DAY = 350;
const CONTACT_EMAIL = "alexis@anzieu.com";
const MESSAGE_MAX_LENGTH = 32;

// Order matters: it drives the gallery layout and matches gallery.alts.
const PHOTOS = ["IMG_3601.jpg", "IMG_3449.jpg", "IMG_3602.jpg", "IMG_3454.jpg"];

type TitledItem = { title: string; description: string };

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Same format the printer stamps on real prints: "26/04/2024, 23:09".
function formatPrintTime(date: Date) {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}, ${pad(
    date.getHours()
  )}:${pad(date.getMinutes())}`;
}

function PrintStrip({ message, alt }: { message: string; alt: string }) {
  // Rendered after mount so server and client markup match.
  const [printedAt, setPrintedAt] = React.useState("");
  React.useEffect(() => setPrintedAt(formatPrintTime(new Date())), []);

  return (
    <figure className={styles.printer} aria-label={alt}>
      <div className={styles.printerLip} aria-hidden="true">
        <span className={styles.printerSlot} />
      </div>
      <div className={styles.feed}>
        <div className={styles.stripShadow}>
          <div className={styles.strip}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.svg" alt="" className={styles.stripLogo} />
            <div className={styles.stripPhoto}>
              <Image
                src="/printer/IMG_3449.jpg"
                alt=""
                fill
                sizes="280px"
                priority
              />
            </div>
            <p className={styles.stripMeta}>
              <span>{printedAt || " "}</span>
              <span className={styles.stripMessage}>{message || " "}</span>
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}

export default function PrinterPage() {
  const { t, lang } = useTranslation("main");

  const [message, setMessage] = React.useState(() =>
    t("printer.hero.messageDefault")
  );

  const dialogRef = React.useRef<HTMLDialogElement>(null);
  const [openPhoto, setOpenPhoto] = React.useState<number | null>(null);

  const openLightbox = (index: number) => {
    setOpenPhoto(index);
    dialogRef.current?.showModal();
  };
  const closeLightbox = () => dialogRef.current?.close();

  const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
    t("printer.cta.mailSubject")
  )}`;

  const alts = t("printer.gallery.alts", {}, { returnObjects: true }) as string[];
  const receiptItems = t("printer.receipt.items", {}, { returnObjects: true }) as string[];
  const whyItems = t("printer.why.items", {}, { returnObjects: true }) as TitledItem[];
  const steps = t("printer.steps.items", {}, { returnObjects: true }) as TitledItem[];

  const price = t("printer.hero.price", { price: PRICE_PER_DAY });

  return (
    <div className={`${styles.page} ${archivo.variable} ${martianMono.variable}`}>
      <header className={`${styles.wrap} ${styles.header}`}>
        <Link href={`/${lang}`} className={`${styles.brand} ${logoFont.className}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.svg" alt="" className={styles.brandMark} />
          Flybooth
        </Link>
        <LanguageSwitcher currentLang={lang} chevronColor="black" />
      </header>

      <main>
        <section className={`${styles.wrap} ${styles.hero}`}>
          <div className={styles.heroCopy}>
            <h1 className={styles.display}>{t("printer.hero.title")}</h1>
            <p className={styles.lead}>{t("printer.hero.lead")}</p>
            <div className={styles.actions}>
              <a href={mailto} className={styles.button}>
                {t("printer.hero.cta")}
              </a>
              <p className={styles.priceNote}>{price}</p>
            </div>
          </div>

          <div className={styles.heroObject}>
            <PrintStrip message={message} alt={t("printer.hero.stripAlt")} />
            <label className={styles.messageField}>
              <span>{t("printer.hero.messageLabel")}</span>
              <input
                type="text"
                value={message}
                maxLength={MESSAGE_MAX_LENGTH}
                onChange={(e) => setMessage(e.target.value)}
              />
            </label>
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <div className={styles.sectionIntro}>
            <h2 className={styles.heading}>{t("printer.gallery.title")}</h2>
            <p className={styles.muted}>{t("printer.gallery.subtitle")}</p>
          </div>
          <div className={styles.gallery}>
            {PHOTOS.map((photo, index) => (
              <button
                key={photo}
                type="button"
                className={styles.tile}
                onClick={() => openLightbox(index)}
                aria-label={`${t("printer.gallery.enlarge")}: ${alts[index]}`}
              >
                <Image
                  src={`/printer/${photo}`}
                  alt={alts[index]}
                  fill
                  sizes="(min-width: 900px) 50vw, 100vw"
                />
              </button>
            ))}
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.section} ${styles.offer}`}>
          <div className={styles.offerReceipt}>
            <h2 className={styles.heading}>{t("printer.receipt.title")}</h2>
            <div className={styles.receiptShadow}>
              <div className={styles.receipt}>
                <p className={`${styles.receiptBrand} ${logoFont.className}`}>Flybooth</p>
                <p className={styles.receiptHeading}>{t("printer.receipt.heading")}</p>
                <ul className={styles.receiptItems}>
                  {receiptItems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <div className={styles.receiptTotal}>
                  <span>{t("printer.receipt.total")}</span>
                  <span className={styles.receiptAmount}>${PRICE_PER_DAY}</span>
                </div>
                <p className={styles.receiptPerDay}>{t("printer.receipt.perDay")}</p>
                <p className={styles.receiptThanks}>{t("printer.receipt.thanks")}</p>
              </div>
            </div>
          </div>

          <div className={styles.offerWhy}>
            <h2 className={styles.heading}>{t("printer.why.title")}</h2>
            <dl className={styles.why}>
              {whyItems.map((item) => (
                <div key={item.title}>
                  <dt>{item.title}</dt>
                  <dd>{item.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className={`${styles.wrap} ${styles.section}`}>
          <h2 className={styles.heading}>{t("printer.steps.title")}</h2>
          <ol className={styles.steps}>
            {steps.map((step) => (
              <li key={step.title}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className={`${styles.wrap} ${styles.closing}`}>
          <h2 className={styles.display}>{t("printer.cta.title")}</h2>
          <p className={styles.lead}>{t("printer.cta.subtitle")}</p>
          <div className={styles.actions}>
            <a href={mailto} className={styles.button}>
              {t("printer.cta.button")}
            </a>
            <a href={mailto} className={styles.emailLink}>
              {CONTACT_EMAIL}
            </a>
          </div>
        </section>
      </main>

      <footer className={`${styles.wrap} ${styles.footer}`}>
        <p>
          © {new Date().getFullYear()} Flybooth. {t("printer.footer.rights")}
        </p>
        <p>{t("printer.footer.codedWithLove")}</p>
      </footer>

      <dialog
        ref={dialogRef}
        className={styles.lightbox}
        onClose={() => setOpenPhoto(null)}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog element itself.
          if (e.target === e.currentTarget) closeLightbox();
        }}
      >
        {openPhoto !== null && (
          <div className={styles.lightboxFrame}>
            <Image
              src={`/printer/${PHOTOS[openPhoto]}`}
              alt={alts[openPhoto]}
              fill
              sizes="100vw"
              quality={85}
            />
          </div>
        )}
        <button
          type="button"
          className={styles.lightboxClose}
          onClick={closeLightbox}
        >
          {t("printer.gallery.close")}
        </button>
      </dialog>
    </div>
  );
}
