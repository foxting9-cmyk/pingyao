import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AncientSceneBackground from "./AncientSceneBackground.jsx";
import IntroInkParticles from "./IntroInkParticles.jsx";

const scrollScenes = [
  { step: "01", start: 0 },
  { step: "02", start: 0.4 },
  { step: "03", start: 0.7 },
  { step: "04", start: 0.9 },
];

// const heroMapTwo = "/images/hero-map-02-v2.png"; // Removed per user request

const ACT1_IMAGES = {
  circle: "/images/home-act1/circle-layer.png",
  gate: "/images/home-act1/yingxun-gate.png",
};

/** 扇形菜单弹窗图集（图片来自原 Kashima 演示，可后续替换为平遥实拍） */
const galleryData = {
  chengqiang: [
    { img: "https://i.imgur.com/uie0DYt.png", text: "城墙角楼 — 推荐打卡" },
    { img: "https://i.imgur.com/sr5Nzcl.png", text: "垛口漫步" },
    { img: "https://i.imgur.com/0fXRCH0.png", text: "护城河视角" },
    { img: "https://i.imgur.com/rtSTqzj.png", text: "瓮城光影" },
  ],
  piaohao: [
    { img: "https://i.imgur.com/uEBhSVW.png", text: "票号匾额" },
    { img: "https://i.imgur.com/dKqQC2f.png", text: "账房陈设" },
    { img: "https://i.imgur.com/PZUeDuD.png", text: "银票纹样" },
    { img: "https://i.imgur.com/rdrh4Cg.png", text: "地下金库入口" },
  ],
  yamen: [
    { img: "https://i.imgur.com/azpsGoK.png", text: "大堂楹联" },
    { img: "https://i.imgur.com/mL3Jbv8.png", text: "牢狱展区" },
    { img: "https://i.imgur.com/Ve30zuN.png", text: "升堂场景" },
  ],
  miao: [
    { img: "https://i.imgur.com/qDm4na0.png", text: "双林彩塑" },
    { img: "https://i.imgur.com/r1R6SLG.png", text: "镇国寺大殿" },
    { img: "https://i.imgur.com/Jh2Q3kv.png", text: "寺观古柏" },
  ],
  tese: [
    { img: "https://i.imgur.com/lWbeAMh.png", text: "推光漆器" },
    { img: "https://i.imgur.com/UJlJTyn.png", text: "牛肉与碗托" },
    { img: "https://i.imgur.com/4zKFMi1.png", text: "民俗节庆" },
  ],
};

const TURTLE_SECTION_ID = "home-turtle-city";
const HE_JUAN_DURATION = 1.35;

function getSceneIndex(progress) {
  let currentIndex = 0;

  for (let index = 0; index < scrollScenes.length; index += 1) {
    if (progress >= scrollScenes[index].start) {
      currentIndex = index;
    }
  }

  return currentIndex;
}

function HomeHeroParallax() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const heroSceneRef = useRef(null);
  const act1Ref = useRef(null);
  const audioRef = useRef(null);
  const heroScrollTriggerRef = useRef(null);
  const heJuanTweenRef = useRef(null);
  const heJuanPlayingRef = useRef(false);
  const [progress, setProgress] = useState(0);

  const [popupOpen, setPopupOpen] = useState(false);
  const [popupTitle, setPopupTitle] = useState("");
  const [popupType, setPopupType] = useState(null);

  const openWindow = useCallback((title, type) => {
    setPopupTitle(title);
    setPopupType(type);
    setPopupOpen(true);
  }, []);

  const closeWindow = useCallback(() => {
    setPopupOpen(false);
    setPopupType(null);
  }, []);

  const goToTurtleCity = useCallback(() => {
    closeWindow();
    const section = sectionRef.current;
    const st = heroScrollTriggerRef.current;
    const heroEl = heroSceneRef.current;
    const act1El = act1Ref.current;

    if (!section || !heroEl || !act1El) {
      document.getElementById(TURTLE_SECTION_ID)?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }

    if (st?.progress >= 0.995) {
      document.getElementById(TURTLE_SECTION_ID)?.scrollIntoView({ behavior: "instant", block: "start" });
      return;
    }

    if (heJuanPlayingRef.current) return;
    heJuanPlayingRef.current = true;
    heJuanTweenRef.current?.kill();

    const circle = section.querySelector(".home-act1__circle");
    const gate = section.querySelector(".home-act1__gate");
    const clouds = section.querySelectorAll(".home-act1__cloud");
    const aside = section.querySelector(".home-act1__aside");

    const tl = gsap.timeline({
      onComplete: () => {
        heJuanTweenRef.current = null;
        heJuanPlayingRef.current = false;
        const endY =
          st?.end ?? Math.max(0, section.offsetTop + section.offsetHeight - window.innerHeight);
        window.scrollTo({ top: endY, left: 0, behavior: "instant" });
        setProgress(1);
        ScrollTrigger.refresh();
        requestAnimationFrame(() => {
          document.getElementById(TURTLE_SECTION_ID)?.scrollIntoView({ behavior: "instant", block: "start" });
        });
      },
    });

    heJuanTweenRef.current = tl;

    tl.to(heroEl, {
      opacity: 0,
      duration: HE_JUAN_DURATION,
      ease: "power2.inOut",
    })
      .to(
        act1El,
        {
          scaleX: 0.04,
          opacity: 0,
          pointerEvents: "none",
          duration: HE_JUAN_DURATION,
          ease: "power2.inOut",
        },
        "<"
      );

    if (circle) {
      tl.to(
        circle,
        { scale: 0.01, opacity: 0, duration: HE_JUAN_DURATION, ease: "power2.inOut" },
        "<"
      );
    }
    if (gate) {
      tl.to(
        gate,
        { scale: 0.8, opacity: 0, duration: HE_JUAN_DURATION, ease: "power2.inOut" },
        "<"
      );
    }
    if (clouds.length) {
      tl.to(clouds, { opacity: 0, duration: 1.0 }, "<");
    }
    if (aside) {
      tl.to(aside, { opacity: 0, duration: 1.0 }, "<");
    }
  }, [closeWindow]);

  const tryPlayAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio && audio.paused) {
      audio.play().catch(() => {});
    }
  }, []);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const section = sectionRef.current;
    const sticky = stickyRef.current;
    if (!section || !sticky) return undefined;

    const ctx = gsap.context(() => {
      if (heroSceneRef.current) {
        gsap.set(heroSceneRef.current, { opacity: 1 });
      }
      if (act1Ref.current) {
        gsap.set(act1Ref.current, {
          opacity: 1,
          scaleX: 1,
          transformOrigin: "center center",
          pointerEvents: "auto",
        });
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom bottom",
          pin: sticky,
          pinSpacing: false,
          anticipatePin: 1,
          scrub: true,
          onUpdate: (self) => {
            setProgress(self.progress);
          },
        },
      });

      timeline
        .to(
          heroSceneRef.current,
          {
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut",
          },
          0.35
        )
        .to(
          act1Ref.current,
          {
            scaleX: 0.04,
            opacity: 0,
            pointerEvents: "none",
            duration: 1.5,
            ease: "power2.inOut",
          },
          "<"
        )
        .to(
          ".home-act1__circle", // 获取圆圈，将其缩小
          {
            scale: 0.01,
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
          },
          "<" // 同步执行
        )
        .to(
          ".home-act1__gate", // 迎薰门同步消失
          {
            scale: 0.8,
            opacity: 0,
            duration: 1.5,
            ease: "power2.inOut"
          },
          "<"
        )
        .to(
          ".home-act1__cloud", // 云纹同步消失
          {
            opacity: 0,
            duration: 1.0,
          },
          "<"
        )
        .to(
          ".home-act1__aside", // 旁侧图片同步消失
          {
            opacity: 0,
            duration: 1.0,
          },
          "<"
        )
        // 收尾留极短过渡，直接进入下一幕
        .to({}, { duration: 0.25 });

      heroScrollTriggerRef.current = timeline.scrollTrigger ?? null;
    }, section);

    return () => {
      heJuanTweenRef.current?.kill();
      heJuanTweenRef.current = null;
      heroScrollTriggerRef.current = null;
      ctx.revert();
    };
  }, []);

  const safeSceneIndex = getSceneIndex(progress);

  const goScene = (index) => {
    const section = sectionRef.current;
    if (!section) return;

    const maxDistance = section.offsetHeight - window.innerHeight;
    const targetY = section.offsetTop + maxDistance * scrollScenes[index].start;
    window.scrollTo({ top: targetY, behavior: "smooth" });
  };

  const gridItems = popupType ? galleryData[popupType] ?? [] : [];

  return (
    <section className="scroll-demo" ref={sectionRef}>
      <div className="scroll-demo__sticky" ref={stickyRef} onClick={tryPlayAudio}>
        <div className="scroll-demo__visuals">
          <div ref={heroSceneRef} className="hero-ancient-scene">
            <AncientSceneBackground layer />
            <IntroInkParticles variant="layer" />
          </div>

          <div className="scroll-demo__black-line-overflow" />

          <div ref={act1Ref} className="home-act1">
            <div className="home-act1__scroll-edge home-act1__scroll-edge--left" />
            <div className="home-act1__scroll-edge home-act1__scroll-edge--right" />

            <div className="home-act1__music">
              <audio ref={audioRef} controls loop>
                <source src="/travel/music/bgm/bgm1.mp3" type="audio/mpeg" />
              </audio>
            </div>

            <div className="home-act1__main">
              <div className="home-act1__gate-wrap">
                <div className="home-act1__buttons-layer">
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--1"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow("城墙漫步", "chengqiang");
                    }}
                  />
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--2"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow("票号文化", "piaohao");
                    }}
                  />
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--3"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow("古县衙", "yamen");
                    }}
                  />
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--4"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow("寺观彩塑", "miao");
                    }}
                  />
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--5"
                    onClick={(e) => {
                      e.stopPropagation();
                      goToTurtleCity();
                    }}
                    aria-label="合卷，进入龟城形制"
                  />
                  <button
                    type="button"
                    className="home-act1__nav-btn home-act1__nav-btn--special"
                    onClick={(e) => {
                      e.stopPropagation();
                      openWindow("平遥拾遗", "tese");
                    }}
                  >
                    <img src="/images/home-act1/LFQU2Nj.png" alt="精选" className="home-act1__special-thumb" />
                  </button>
                </div>

                <div
                  className="home-act1__popup"
                  style={{ display: popupOpen ? "block" : "none" }}
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby="home-act1-popup-title"
                >
                  <button type="button" className="home-act1__popup-close" onClick={closeWindow}>
                    &times;
                  </button>
                  <h3
                    id="home-act1-popup-title"
                    style={{
                      margin: 0,
                      color: "var(--home-act1-accent)",
                      borderBottom: "1px solid var(--home-act1-accent)",
                    }}
                  >
                    {popupTitle}
                  </h3>
                  <div className="home-act1__popup-body">
                    {/* 弹窗内渲染对应类型的图集（票号 / 城墙 / 府衙 / 寺观 / 特色） */}
                    <div className="home-act1__grid is-visible">
                      {gridItems && gridItems.length > 0 ? (
                        <div className="home-act1__grid-inner">
                          {gridItems.map((it, idx) => (
                            <figure className="home-act1__tile" key={idx}>
                              <img src={it.img} alt={it.text} />
                              <figcaption className="home-act1__tile-caption">{it.text}</figcaption>
                            </figure>
                          ))}
                        </div>
                      ) : (
                        <p className="home-act1__empty">暂无内容</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="home-act1__cloud home-act1__cloud--cw">
                  <img src="/images/home-act1/MXrEHi7.png" alt="" />
                </div>
                <div className="home-act1__cloud home-act1__cloud--ccw">
                  <img src="https://i.imgur.com/uFqyxPW.png" alt="" />
                </div>
                <img src={ACT1_IMAGES.circle} className="home-act1__circle" alt="" />
                <img src={ACT1_IMAGES.gate} className="home-act1__gate" alt="平遥古城迎薰门立绘" />
              </div>

              <div className={`home-act1__aside ${popupOpen ? "home-act1__aside--popup-open" : ""}`}>
                <img src="/images/home-act1/LFQU2Nj.png" alt="" />
              </div>
            </div>
          </div>

          <div className="scroll-demo__fade" />
        </div>

        <div className="scroll-demo__progress" aria-hidden="true">
          <span style={{ transform: `scaleX(${0.08 + progress * 0.92})` }} />
        </div>
      </div>
    </section>
  );
}

export default HomeHeroParallax;
