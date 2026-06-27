"use client";

import Script from "next/script";

export default function BookCall() {
  return (
    <section
      id="book"
      className="py-24 px-6"
      style={{ background: "#FFFDF8" }}
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <p
            className="text-xs font-bold tracking-[0.18em] uppercase mb-4"
            style={{ color: "#F4611A" }}
          >
            Book a Call
          </p>
          <h2
            className="text-3xl sm:text-4xl font-black mb-4"
            style={{ color: "#1A0F3C", textWrap: "balance" } as React.CSSProperties}
          >
            Let&apos;s talk about your project.
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "#6B5E7A" }}>
            Pick a time that works for you. We&apos;ll spend 15 minutes
            understanding your goals — no sales pitch, no commitment.
          </p>
        </div>

        <div
          className="rounded-2xl overflow-hidden"
          style={{ border: "1px solid #E8D9C8" }}
        >
          <div id="tivra-cal-inline" className="w-full" style={{ minHeight: 600 }} />
        </div>
      </div>

      <Script
        id="cal-embed-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
(function(C,A,L){
  let p=function(a,ar){a.q.push(ar);};
  let d=C.document;
  C.Cal=C.Cal||function(){
    let cal=C.Cal;let ar=arguments;
    if(!cal.loaded){
      cal.ns={};cal.q=cal.q||[];
      d.head.appendChild(d.createElement("script")).src=A;
      cal.loaded=true;
    }
    if(ar[0]===L){
      const api=function(){p(api,arguments);};
      const namespace=ar[1];api.q=api.q||[];
      if(typeof namespace==="string"){
        cal.ns[namespace]=cal.ns[namespace]||api;
        p(cal.ns[namespace],ar);p(cal,[L,namespace,ar[2]]);
      }else p(cal,ar);return;
    }
    p(cal,ar);
  };
})(window,"https://app.cal.com/embed/embed.js","init");
Cal("init",{origin:"https://cal.com"});
Cal("inline",{
  elementOrSelector:"#tivra-cal-inline",
  calLink:"priyanshi-rana-vxu0bo/15min",
  layout:"month_view"
});
Cal("ui",{"hideEventTypeDetails":false,"layout":"month_view"});
          `,
        }}
      />
    </section>
  );
}
