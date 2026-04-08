import { useEffect, useRef, useState } from 'react';

function Timeline() {
  const shellRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!shellRef.current) return;

    const shell = shellRef.current;
    const items = shell.querySelectorAll('.item');
    const itemLength = items.length;

    // 初始化第一个项目
    items[0].classList.add('item--active');
    // 设置第一个节点的背景图片
    const firstBgImage = items[0].getAttribute('data-bg');
    if (firstBgImage) {
      shell.style.backgroundImage = `url(${firstBgImage})`;
    }

    const handleScroll = () => {
      const pos = window.scrollY;
      
      items.forEach((item, i) => {
        const min = item.offsetTop;
        const max = item.offsetHeight + item.offsetTop;

        if (i === itemLength - 2 && pos > min + item.offsetHeight / 2) {
          items.forEach(el => el.classList.remove('item--active'));
          items[itemLength - 1].classList.add('item--active');
          // 设置最后一个节点的背景图片
          const lastBgImage = items[itemLength - 1].getAttribute('data-bg');
          if (lastBgImage) {
            shell.style.backgroundImage = `url(${lastBgImage})`;
          }
          setActiveIndex(itemLength - 1);
        } else if (pos <= max - 10 && pos >= min) {
          items.forEach(el => el.classList.remove('item--active'));
          item.classList.add('item--active');
          // 设置当前节点的背景图片
          const bgImage = item.getAttribute('data-bg');
          if (bgImage) {
            shell.style.backgroundImage = `url(${bgImage})`;
          }
          setActiveIndex(i);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="page">
      <div className="shell" ref={shellRef} id="shell">
        <div className="top">
          <h2 className="title">平遥古城历史脉络</h2>
          <h3 className="subtitle">从西周始建到现代保护</h3>
        </div>
        <div className="timeline">
          {/* 核心历史节点 */}
          <div className="item" data-text="西周筑城" data-bg="/images/timeline/xizhou/2.jpg">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/xizhou/1.jpg" alt="西周筑城" />
                  <div className="image-overlay">
                    <span className="overlay-text">西周城池复原图</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">公元前827年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>周宣王时期，平遥地区属古冀州，为西周分封的诸侯国领地。据《平遥县志》记载，此地最早称为"平陶"，因陶土资源丰富而得名。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>西周时期开始筑建城池，形成了平遥古城的最初雏形。当时的城池规模较小，主要为军事防御功能。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>奠定了平遥古城的基础格局，确立了城市选址和最初的城市形态。这一时期的筑城活动为后来的城市发展奠定了基础。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：青铜时代</span>
                  <span className="meta-item">城市功能：军事防御</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="秦置平陶县" data-bg="/images/timeline/qin/2.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/qin/1.png" alt="秦代平陶" />
                  <div className="image-overlay">
                    <span className="overlay-text">秦代行政区划图</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">公元前221年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>秦始皇统一六国后，实行郡县制，建立了中央集权的封建制度。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>在平遥地区设置平陶县，属太原郡管辖。这是平遥作为行政区划的开始，标志着平遥正式纳入中央集权的治理体系。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>确立了平遥的行政地位，促进了地方经济和文化的发展。郡县制的推行使平遥成为中原王朝治理体系的重要组成部分。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：郡县制</span>
                  <span className="meta-item">行政等级：县级</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="北魏改名平遥" data-bg="/images/timeline/beiwai/2.jpg">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/beiwai/1.jpg" alt="北魏平遥" />
                  <div className="image-overlay">
                    <span className="overlay-text">北魏时期建筑</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">公元424年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>北魏太武帝拓跋焘时期，鲜卑族政权统一北方，推行汉化政策。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>为避太武帝拓跋焘名讳，平陶县改名为平遥县，这一名称沿用至今。北魏时期，平遥的城市建设得到进一步发展。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>确定了"平遥"这一名称，成为城市历史的重要标志。北魏时期的城市建设为后来的发展奠定了基础。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：民族融合</span>
                  <span className="meta-item">城市发展：稳步增长</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="明洪武扩城" data-bg="/images/timeline/ming/1.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/ming/1.png" alt="明洪武扩城" />
                  <div className="image-overlay">
                    <span className="overlay-text">明代城墙图</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">1370年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>明朝建立后，为防御北方游牧民族入侵，在北方边境地区大规模筑城。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>明洪武三年，平遥开始大规模筑建城墙。城墙周长6.4公里，高12米，设垛口3000个，敌楼72座，形成了完整的军事防御体系。城池布局遵循"龟城"设计理念，象征长寿吉祥。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>形成了平遥古城的基本格局，城墙、街巷、建筑体系趋于完善，为后来的商业发展奠定了基础。龟城设计成为平遥古城的重要特色。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：军事防御</span>
                  <span className="meta-item">城市格局：龟城设计</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="票号兴起" data-bg="/images/timeline/piaohao-rise/2.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/piaohao-rise/1.png" alt="票号兴起" />
                  <div className="image-overlay">
                    <span className="overlay-text">日升昌票号</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">1823年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>清代中叶，晋商崛起，商业活动日益频繁，货币流通需求增加。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>雷履泰创办日升昌票号，开创了中国汇兑业务的先河。日升昌票号的成功，带动了平遥票号业的蓬勃发展。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>晋商文化达到鼎盛，平遥成为中国近代金融业的发源地，城市商业功能得到极大提升。票号的出现标志着中国金融业进入了一个新的发展阶段。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：商业繁荣</span>
                  <span className="meta-item">金融创新：汇兑业务</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="票号鼎盛" data-bg="/images/timeline/piaohao-peak/2.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/piaohao-peak/1.png" alt="票号鼎盛" />
                  <div className="image-overlay">
                    <span className="overlay-text">票号鼎盛时期</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">19世纪中后期</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>鸦片战争后，中国社会发生重大变革，商业活动更加活跃。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>平遥票号业进入鼎盛时期，先后涌现出百川通、协同庆、蔚泰厚等20多家票号，形成了庞大的金融网络，业务遍及全国甚至海外。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>平遥成为"中国的华尔街"，城市建筑、商业文化、社会生活达到空前繁荣。票号的发展推动了中国近代金融业的进步。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：金融中心</span>
                  <span className="meta-item">票号数量：20多家</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="民国衰落" data-bg="/images/timeline/minguo/4.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/minguo/2.png" alt="民国衰落" />
                  <div className="image-overlay">
                    <span className="overlay-text">民国时期平遥</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">20世纪初</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>辛亥革命后，中国进入民国时期，社会动荡不安，现代银行开始兴起。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>随着现代银行的兴起和社会动荡，平遥票号业逐渐衰落。民国时期，平遥的商业地位下降，城市发展陷入停滞。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>平遥从金融中心转变为普通县城，但也因此保留了大量历史建筑和文化遗产。这一时期的相对停滞为后来的文化遗产保护创造了条件。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：社会变革</span>
                  <span className="meta-item">城市状态：相对停滞</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="历史文化名城" data-bg="/images/timeline/1986/2.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/1986/1.png" alt="历史文化名城" />
                  <div className="image-overlay">
                    <span className="overlay-text">历史文化名城</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">1986年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>改革开放后，中国开始重视历史文化遗产的保护。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>平遥被国务院公布为第二批国家历史文化名城，标志着平遥的历史价值得到国家认可，开始进入有计划的保护阶段。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>开启了平遥古城保护的新篇章，为后续的世界遗产申报奠定了基础。历史文化名城的称号使平遥得到了更多的关注和保护资源。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：文化保护</span>
                  <span className="meta-item">保护级别：国家级</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="世界文化遗产" data-bg="/images/timeline/1997/2.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/1997/1.png" alt="世界文化遗产" />
                  <div className="image-overlay">
                    <span className="overlay-text">世界文化遗产证书</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">1997年</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>中国积极参与世界文化遗产保护，推动优秀文化遗产走向世界。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>平遥古城被联合国教科文组织列入世界文化遗产名录，成为中国首批世界文化遗产。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>平遥古城的保护进入国际化视野，成为中国历史文化保护的典范。世界遗产的称号为平遥带来了国际知名度和旅游发展机遇。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：国际化</span>
                  <span className="meta-item">保护级别：世界级</span>
                </div>
              </div>
            </div>
          </div>

          <div className="item" data-text="保护修复" data-bg="/images/timeline/modern/5.png">
            <div className="content">
              <div className="image-gallery">
                <div className="image-container main-image">
                  <img className="img" src="/images/timeline/modern/1.png" alt="保护修复" />
                  <div className="image-overlay">
                    <span className="overlay-text">现代保护修复</span>
                  </div>
                </div>
              </div>
              <h2 className="content-title">21世纪初</h2>
              <div className="content-body">
                <p className="content-desc">
                  <strong>历史背景：</strong>进入21世纪，中国的文化遗产保护意识不断增强，旅游产业蓬勃发展。
                </p>
                <p className="content-desc">
                  <strong>关键事件：</strong>平遥开始大规模的古城保护和修复工程，包括城墙修复、古建筑保护、历史街区整治等。同时，旅游业蓬勃发展，平遥成为中国著名的历史文化旅游目的地。
                </p>
                <p className="content-desc">
                  <strong>历史影响：</strong>古城得到全面保护和合理利用，实现了文化遗产保护与旅游发展的良性互动。平遥成为文化遗产保护的成功范例。
                </p>
                <div className="timeline-meta">
                  <span className="meta-item">时代特征：可持续发展</span>
                  <span className="meta-item">发展模式：保护与利用</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        body {
          margin: 0;
          padding: 0;
          background:
            repeating-linear-gradient(
              90deg,
              rgba(182, 199, 209, 0.05) 0,
              rgba(182, 199, 209, 0.05) 1px,
              transparent 1px,
              transparent 64px
            ),
            linear-gradient(180deg, #f4f6f0 0%, #f7faf8 100%);
        }

        .page {
          background:
            repeating-linear-gradient(
              90deg,
              rgba(182, 199, 209, 0.05) 0,
              rgba(182, 199, 209, 0.05) 1px,
              transparent 1px,
              transparent 64px
            ),
            linear-gradient(180deg, #f4f6f0 0%, #f7faf8 100%);
          width: 100%;
          min-height: 100vh;
        }

        .shell {
          width: 100%;
          position: relative;
          padding: 80px 0;
          background-attachment: fixed;
          background-color: #f4f6f0;
          background-size: cover;
          background-position: center;
          transition: all 1s ease-in-out;
          min-height: 100vh;
        }

        .shell:before {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(rgba(134, 153, 173, 0.5), rgba(134, 153, 173, 0.6));
          content: "";
          z-index: 1;
        }

        .top {
          width: 100%;
          text-align: center;
          margin-bottom: 80px;
          position: relative;
          z-index: 2;
          padding: 30px;
        }

        .title {
          color: #5d6f84;
          font-size: 96px;
          font-weight: 900;
          margin: 0;
          text-shadow: 0 4px 20px rgba(134, 153, 173, 0.6), 0 0 30px rgba(244, 246, 240, 0.9);
          animation: fadeInDown 1s ease-out;
          line-height: 1.1;
          text-stroke: 2px rgba(134, 153, 173, 0.3);
          -webkit-text-stroke: 2px rgba(134, 153, 173, 0.3);
        }

        .subtitle {
          color: rgba(93, 111, 132, 0.95);
          font-size: 36px;
          letter-spacing: 5px;
          margin: 20px 0 0 0;
          font-weight: 800;
          animation: fadeInUp 1s ease-out 0.3s both;
          text-shadow: 0 3px 15px rgba(134, 153, 173, 0.5), 0 0 20px rgba(244, 246, 240, 0.8);
          line-height: 1.2;
          text-stroke: 1px rgba(134, 153, 173, 0.2);
          -webkit-text-stroke: 1px rgba(134, 153, 173, 0.2);
        }

        .timeline {
          display: flex;
          margin: 0 auto;
          flex-wrap: wrap;
          flex-direction: column;
          max-width: 900px;
          position: relative;
          z-index: 2;
        }

        .timeline:before {
          position: absolute;
          left: 50%;
          width: 4px;
          height: 100%;
          margin-left: -2px;
          content: "";
          background: linear-gradient(to bottom, rgba(134, 153, 173, 0.4), rgba(134, 153, 173, 0.2));
          box-shadow: 0 0 10px rgba(134, 153, 173, 0.3);
        }

        .item {
          padding: 40px 0;
          opacity: 0.3;
          filter: blur(2px);
          transition: all 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          box-sizing: border-box;
          width: calc(50% - 60px);
          display: flex;
          position: relative;
          transform: translateY(-80px) scale(0.9);
        }

        .item:before {
          content: attr(data-text);
          letter-spacing: 3px;
          width: 100%;
          position: absolute;
          color: rgba(86, 109, 130, 0.9);
          font-size: 18px;
          border-left: 3px solid rgba(86, 109, 130, 0.9);
          top: 70%;
          margin-top: -5px;
          padding-left: 15px;
          opacity: 0;
          right: calc(-100% - 56px);
          font: 900 24px "";
          letter-spacing: 5px;
          text-shadow: 0 2px 5px rgba(244, 246, 240, 0.8);
          transition: all 0.5s ease;
        }

        .item:nth-child(even) {
          align-self: flex-end;
        }

        .item:nth-child(even):before {
          right: auto;
          text-align: right;
          left: calc(-100% - 56px);
          padding-left: 0;
          border-left: none;
          border-right: 3px solid rgba(86, 109, 130, 0.9);
          padding-right: 15px;
        }

        .item--active {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0px);
        }

        .item--active:before {
          top: 50%;
          transition: all 0.5s ease 0.3s;
          opacity: 1;
          transform: translateY(-50%);
        }

        .content {
          background: rgba(248, 252, 249, 0.88);
          border-radius: 10px;
          padding: 30px;
          box-shadow: 0 10px 30px rgba(134, 153, 173, 0.2);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(182, 199, 209, 0.32);
          transition: all 0.5s ease;
        }

        .item--active .content {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(134, 153, 173, 0.3);
        }

        .image-gallery {
          margin-bottom: 20px;
        }

        .image-container {
          position: relative;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(134, 153, 173, 0.3);
          transform: perspective(1200px) rotateX(0deg) rotateY(0deg);
          transition: all 0.6s ease;
          filter: sepia(20%) grayscale(10%) brightness(0.95);
        }

        .main-image {
          margin-bottom: 15px;
          box-shadow: 0 12px 25px rgba(134, 153, 173, 0.4);
        }

        .item--active .image-container {
          transform: perspective(1200px) rotateX(5deg) rotateY(2deg) translateY(-10px);
          animation: float 6s ease-in-out infinite;
        }

        .item--active .main-image {
          transform: scale(1.05);
        }

        .item--active .image-container:hover {
          transform: perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(-15px) scale(1.08);
          box-shadow: 0 20px 40px rgba(134, 153, 173, 0.5);
          filter: sepia(0%) grayscale(0%) brightness(1);
        }

        @keyframes float {
          0%, 100% {
            transform: perspective(1200px) rotateX(5deg) rotateY(2deg) translateY(-10px);
          }
          50% {
            transform: perspective(1200px) rotateX(3deg) rotateY(-1deg) translateY(-5px);
          }
        }

        .img {
          width: 100%;
          height: auto;
          display: block;
          transition: all 0.5s ease;
        }

        .image-container:hover .img {
          transform: scale(1.05);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
          color: white;
          padding: 20px;
          transform: translateY(100%);
          transition: transform 0.3s ease;
        }

        .image-container:hover .image-overlay {
          transform: translateY(0);
        }

        .overlay-text {
          font-size: 14px;
          font-weight: bold;
        }

        .content-title {
          font-weight: normal;
          font-size: 48px;
          margin: 0 0 25px 0;
          transition: all 0.6s ease;
          color: #8699ad;
          text-shadow: 0 3px 8px rgba(134, 153, 173, 0.2);
          transform: perspective(1000px) rotateX(0deg);
        }

        .item--active .content-title {
          margin: -15px 0 25px 0;
          transform: perspective(1000px) rotateX(5deg) scale(1.1);
          animation: textFloat 8s ease-in-out infinite;
        }

        .content-body {
          transition: all 0.6s ease;
          transform: perspective(1000px) rotateX(0deg);
        }

        .item--active .content-body {
          transform: perspective(1000px) rotateX(3deg) translateY(-5px);
        }

        .content-desc {
          margin: 0 0 20px 0;
          font-size: 20px;
          color: rgba(134, 153, 173, 0.95);
          line-height: 30px;
          text-shadow: 0 1px 4px rgba(134, 153, 173, 0.1);
          transition: all 0.5s ease;
        }

        .item--active .content-desc {
          transform: translateX(5px);
        }

        @keyframes textFloat {
          0%, 100% {
            transform: perspective(1000px) rotateX(5deg) scale(1.1);
          }
          50% {
            transform: perspective(1000px) rotateX(2deg) scale(1.08);
          }
        }

        .content-desc strong {
          color: #8699ad;
          font-weight: 600;
        }

        .timeline-meta {
          margin-top: 20px;
          padding-top: 15px;
          border-top: 1px solid rgba(248, 249, 250, 0.2);
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .meta-item {
          background: rgba(134, 153, 173, 0.1);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          color: rgba(134, 153, 173, 0.8);
          backdrop-filter: blur(5px);
        }

        @keyframes fadeInDown {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @media only screen and (max-width: 767px) {
          .item {
            align-self: baseline !important;
            width: 100%;
            padding: 0 20px 150px 60px;
          }

          .item:before {
            left: -60px !important;
            padding: 0 !important;
            top: 50px;
            text-align: center !important;
            width: 50px;
            border: none !important;
            font-size: 12px;
          }

          .item:last-child {
            padding-bottom: 40px;
          }

          .timeline:before {
            left: 30px;
          }

          .content {
            padding: 20px;
          }

          .title {
            font-size: 42px;
          }

          .subtitle {
            font-size: 16px;
          }

          .content-title {
            font-size: 36px;
          }

          .content-desc {
            font-size: 16px;
          }
        }
      `}</style>
    </div>
  );
}

export default Timeline;
