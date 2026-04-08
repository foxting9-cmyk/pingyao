import { useEffect, useRef } from "react";
import "./Timeline.css";

const TIMELINE_ITEMS = [
  {
    text: "西周筑城",
    bg: "/images/timeline/xizhou/2.jpg",
    image: "/images/timeline/xizhou/1.jpg",
    imageAlt: "西周筑城",
    imageLabel: "西周城池复原图",
    year: "公元前827年",
    description: [
      "历史背景：周宣王时期，平遥地区属古冀州，为西周分封的诸侯国领地。据《平遥县志》记载，此地最早称为\"平陶\"，因陶土资源丰富而得名。",
      "关键事件：西周时期开始筑建城池，形成了平遥古城的最初雏形。当时的城池规模较小，主要为军事防御功能。",
      "历史影响：奠定了平遥古城的基础格局，确立了城市选址和最初的城市形态。这一时期的筑城活动为后来的城市发展奠定了基础。",
    ],
    meta: ["时代特征：青铜时代", "城市功能：军事防御"],
  },
  {
    text: "秦置平陶县",
    bg: "/images/timeline/qin/2.png",
    image: "/images/timeline/qin/1.png",
    imageAlt: "秦代平陶",
    imageLabel: "秦代行政区划图",
    year: "公元前221年",
    description: [
      "历史背景：秦始皇统一六国后，实行郡县制，建立了中央集权的封建制度。",
      "关键事件：在平遥地区设置平陶县，属太原郡管辖。这是平遥作为行政区划的开始，标志着平遥正式纳入中央集权的治理体系。",
      "历史影响：确立了平遥的行政地位，促进了地方经济和文化的发展。郡县制的推行使平遥成为中原王朝治理体系的重要组成部分。",
    ],
    meta: ["时代特征：郡县制", "行政等级：县级"],
  },
  {
    text: "北魏改名平遥",
    bg: "/images/timeline/beiwai/2.jpg",
    image: "/images/timeline/beiwai/1.jpg",
    imageAlt: "北魏平遥",
    imageLabel: "北魏时期建筑",
    year: "公元424年",
    description: [
      "历史背景：北魏太武帝拓跋焘时期，鲜卑族政权统一北方，推行汉化政策。",
      "关键事件：为避太武帝拓跋焘名讳，平陶县改名为平遥县，这一名称沿用至今。北魏时期，平遥的城市建设得到进一步发展。",
      "历史影响：确定了\"平遥\"这一名称，成为城市历史的重要标志。北魏时期的城市建设为后来的发展奠定了基础。",
    ],
    meta: ["时代特征：民族融合", "城市发展：稳步增长"],
  },
  {
    text: "明洪武扩城",
    bg: "/images/timeline/ming/1.png",
    image: "/images/timeline/ming/1.png",
    imageAlt: "明洪武扩城",
    imageLabel: "明代城墙图",
    year: "1370年",
    description: [
      "历史背景：明朝建立后，为防御北方游牧民族入侵，在北方边境地区大规模筑城。",
      "关键事件：明洪武三年，平遥开始大规模筑建城墙。城墙周长6.4公里，高12米，设垛口3000个，敌楼72座，形成了完整的军事防御体系。城池布局遵循\"龟城\"设计理念，象征长寿吉祥。",
      "历史影响：形成了平遥古城的基本格局，城墙、街巷、建筑体系趋于完善，为后来的商业发展奠定了基础。龟城设计成为平遥古城的重要特色。",
    ],
    meta: ["时代特征：军事防御", "城市格局：龟城设计"],
  },
  {
    text: "票号兴起",
    bg: "/images/timeline/piaohao-rise/2.png",
    image: "/images/timeline/piaohao-rise/1.png",
    imageAlt: "票号兴起",
    imageLabel: "日升昌票号",
    year: "1823年",
    description: [
      "历史背景：清代中叶，晋商崛起，商业活动日益频繁，货币流通需求增加。",
      "关键事件：雷履泰创办日升昌票号，开创了中国汇兑业务的先河。日升昌票号的成功，带动了平遥票号业的蓬勃发展。",
      "历史影响：晋商文化达到鼎盛，平遥成为中国近代金融业的发源地，城市商业功能得到极大提升。票号的出现标志着中国金融业进入了一个新的发展阶段。",
    ],
    meta: ["时代特征：商业繁荣", "金融创新：汇兑业务"],
  },
  {
    text: "票号鼎盛",
    bg: "/images/timeline/piaohao-peak/2.png",
    image: "/images/timeline/piaohao-peak/1.png",
    imageAlt: "票号鼎盛",
    imageLabel: "票号鼎盛时期",
    year: "19世纪中后期",
    description: [
      "历史背景：鸦片战争后，中国社会发生重大变革，商业活动更加活跃。",
      "关键事件：平遥票号业进入鼎盛时期，先后涌现出百川通、协同庆、蔚泰厚等20多家票号，形成了庞大的金融网络，业务遍及全国甚至海外。",
      "历史影响：平遥成为\"中国的华尔街\"，城市建筑、商业文化、社会生活达到空前繁荣。票号的发展推动了中国近代金融业的进步。",
    ],
    meta: ["时代特征：金融中心", "票号数量：20多家"],
  },
  {
    text: "民国衰落",
    bg: "/images/timeline/minguo/4.png",
    image: "/images/timeline/minguo/2.png",
    imageAlt: "民国衰落",
    imageLabel: "民国时期平遥",
    year: "20世纪初",
    description: [
      "历史背景：辛亥革命后，中国进入民国时期，社会动荡不安，现代银行开始兴起。",
      "关键事件：随着现代银行的兴起和社会动荡，平遥票号业逐渐衰落。民国时期，平遥的商业地位下降，城市发展陷入停滞。",
      "历史影响：平遥从金融中心转变为普通县城，但也因此保留了大量历史建筑和文化遗产。这一时期的相对停滞为后来的文化遗产保护创造了条件。",
    ],
    meta: ["时代特征：社会变革", "城市状态：相对停滞"],
  },
  {
    text: "历史文化名城",
    bg: "/images/timeline/1986/2.png",
    image: "/images/timeline/1986/1.png",
    imageAlt: "历史文化名城",
    imageLabel: "历史文化名城",
    year: "1986年",
    description: [
      "历史背景：改革开放后，中国开始重视历史文化遗产的保护。",
      "关键事件：平遥被国务院公布为第二批国家历史文化名城，标志着平遥的历史价值得到国家认可，开始进入有计划的保护阶段。",
      "历史影响：开启了平遥古城保护的新篇章，为后续的世界遗产申报奠定了基础。历史文化名城的称号使平遥得到了更多的关注和保护资源。",
    ],
    meta: ["时代特征：文化保护", "保护级别：国家级"],
  },
  {
    text: "世界文化遗产",
    bg: "/images/timeline/1997/2.png",
    image: "/images/timeline/1997/1.png",
    imageAlt: "世界文化遗产",
    imageLabel: "世界文化遗产证书",
    year: "1997年",
    description: [
      "历史背景：中国积极参与世界文化遗产保护，推动优秀文化遗产走向世界。",
      "关键事件：平遥古城被联合国教科文组织列入世界文化遗产名录，成为中国首批世界文化遗产。",
      "历史影响：平遥古城的保护进入国际化视野，成为中国历史文化保护的典范。世界遗产的称号为平遥带来了国际知名度和旅游发展机遇。",
    ],
    meta: ["时代特征：国际化", "保护级别：世界级"],
  },
  {
    text: "保护修复",
    bg: "/images/timeline/modern/5.png",
    image: "/images/timeline/modern/1.png",
    imageAlt: "保护修复",
    imageLabel: "现代保护修复",
    year: "21世纪初",
    description: [
      "历史背景：进入21世纪，中国的文化遗产保护意识不断增强，旅游产业蓬勃发展。",
      "关键事件：平遥开始大规模的古城保护和修复工程，包括城墙修复、古建筑保护、历史街区整治等。同时，旅游业蓬勃发展，平遥成为中国著名的历史文化旅游目的地。",
      "历史影响：古城得到全面保护和合理利用，实现了文化遗产保护与旅游发展的良性互动。平遥成为文化遗产保护的成功范例。",
    ],
    meta: ["时代特征：可持续发展", "发展模式：保护与利用"],
  },
];

function Timeline() {
  const shellRef = useRef(null);

  useEffect(() => {
    const shell = shellRef.current;
    if (!shell) return;

    const items = Array.from(shell.querySelectorAll(".item"));
    if (items.length === 0) return;

    const setActiveItem = (index) => {
      items.forEach((element) => element.classList.remove("item--active"));
      const target = items[index];
      if (!target) return;

      target.classList.add("item--active");
      const bgImage = target.getAttribute("data-bg");
      if (bgImage) {
        shell.style.backgroundImage = `url(${bgImage})`;
      }
    };

    setActiveItem(0);

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      window.requestAnimationFrame(() => {
        const position = window.scrollY;
        const itemLength = items.length;

        items.forEach((item, index) => {
          const min = item.offsetTop;
          const max = item.offsetTop + item.offsetHeight;

          if (index === itemLength - 2 && position > min + item.offsetHeight / 2) {
            setActiveItem(itemLength - 1);
            return;
          }

          if (position >= min && position <= max - 10) {
            setActiveItem(index);
          }
        });

        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="history-timeline">
      <div className="timeline-page">
        <div className="shell" ref={shellRef} id="shell">
          <div className="top">
            <h2 className="title">平遥古城历史脉络</h2>
            <h3 className="subtitle">从西周始建到现代保护</h3>
          </div>

          <div className="timeline">
            {TIMELINE_ITEMS.map((entry) => (
              <div key={entry.text} className="item" data-text={entry.text} data-bg={entry.bg}>
                <div className="content">
                  <div className="image-gallery">
                    <div className="image-container main-image">
                      <img className="img" src={entry.image} alt={entry.imageAlt} />
                      <div className="image-overlay">
                        <span className="overlay-text">{entry.imageLabel}</span>
                      </div>
                    </div>
                  </div>

                  <h2 className="content-title">{entry.year}</h2>
                  <div className="content-body">
                    {entry.description.map((paragraph) => {
                      const separatorIndex = paragraph.indexOf("：");
                      if (separatorIndex === -1) {
                        return (
                          <p key={paragraph} className="content-desc">
                            {paragraph}
                          </p>
                        );
                      }

                      const label = paragraph.slice(0, separatorIndex + 1);
                      const detail = paragraph.slice(separatorIndex + 1);

                      return (
                        <p key={paragraph} className="content-desc">
                          <strong>{label}</strong>
                          {detail}
                        </p>
                      );
                    })}

                    <div className="timeline-meta">
                      {entry.meta.map((meta) => (
                        <span key={meta} className="meta-item">
                          {meta}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
