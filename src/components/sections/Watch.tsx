import { PromoVideo } from "./PromoVideo";
export function Watch() {
  return (
    <section className="section" id="watch">
      <div className="section-head">
        <h2>See it in two minutes.</h2>
        <p>
          A short tour of every feature.
          <br />
          Narrated in English or Arabic.
        </p>
      </div>
      <PromoVideo />
    </section>
  );
}
