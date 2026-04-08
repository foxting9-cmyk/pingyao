# P1 阶段1 任务说明

本文档说明 **P1** 需要完成的「阶段1：项目基础搭建」具体要做哪些事、做到什么程度，完成后其他组员才能基于你的代码拉分支开发。

---

## 一、阶段1 要达成什么

1. **依赖装好**：项目能跑起来，且已包含路由、图谱库。
2. **路由配好**：5 个页面路径可用，点导航能跳转。
3. **导航栏做好**：全站统一的顶部导航，水彩古风风格。
4. **5 个页面有占位**：每个路由对应一个简单页面，避免别人拉分支后报错。

其他人（P2～P6）会基于你这套「可运行的基础」各自开发，所以阶段1 必须**先完成并推送到 `main`**。

---

## 二、具体要做的事

### 1. 安装依赖

在项目根目录（也就是当前仓库根目录 `pinyao/`，有 `package.json` 的目录）执行：

```bash
npm install
npm install react-router-dom
npm install vis-network vis-data
```

（若项目尚未初始化，需先在仓库根目录创建 Vite React 项目后再安装。）

确认：

- `package.json` 里出现 `react-router-dom`、`vis-network`、`vis-data`。
- 执行 `npm run dev` 能启动开发服务器且不报错。

---

### 2. 路由配置（`src/App.jsx`）

在 `App.jsx` 里：

- 使用 **React Router v6**：`BrowserRouter`、`Routes`、`Route`。
- 配置 **5 个路由**：

| 路径 | 对应页面组件 | 说明 |
|------|--------------|------|
| `/` | Home | 首页（后面 P2 做滚动引入和内容） |
| `/explore` | ExploreGraph | 探索图谱（P4 做） |
| `/timeline` | Timeline | 时空叙事（P5 做） |
| `/ask` | Ask | 智能问答（P6 做） |
| `/about` | About | 关于我们（P6 做） |

- 在合适位置**挂载全局导航栏**（例如在 `BrowserRouter` 内、`Routes` 外放一个 `<Navigation />`），这样每个页面顶部都有导航。
- 首页 `/` 要预留**滚动引入区域**（可先留一个空 div 或占位组件，例如 `<section className="scroll-hero">首页滚动区（P2 实现）</section>`），方便 P2 后续替换成 ScrollHero。

示例结构（仅作参考，可按你项目实际路径调整）：

```jsx
// 结构示意
<BrowserRouter>
  <Navigation />
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/explore" element={<ExploreGraph />} />
    <Route path="/timeline" element={<Timeline />} />
    <Route path="/ask" element={<Ask />} />
    <Route path="/about" element={<About />} />
  </Routes>
</BrowserRouter>
```

---

### 3. 全局导航栏（`src/components/Navigation.jsx`）

新建 `Navigation.jsx`，实现：

- **固定顶部**（如 `position: fixed; top: 0; left: 0; right: 0; z-index: 100`）。
- **五个链接**：首页、探索图谱、时空叙事、智能问答、关于。用 React Router 的 `Link` 或 `NavLink`，`to` 分别为 `/`、`/explore`、`/timeline`、`/ask`、`/about`。
- **水彩古风**（按计划）：
  - 背景：淡彩底或浅色描边。
  - 文字：古典字体（如宋体、仿宋），淡青或赭色。
  - hover：略加深或轻微晕染。
- **响应式**：小屏时能收起或换行，不挤爆布局。

导航栏要在每个页面都出现，所以放在 `App.jsx` 里、包在 `Routes` 外层即可。

---

### 4. 五个页面占位组件

在 `src/pages/` 下新建 5 个页面组件，每个组件**先做占位即可**（后面由 P2～P6 填内容）：

| 文件 | 路径 | 占位内容建议 |
|------|------|--------------|
| `Home.jsx` | `/` | 标题「首页」+ 上面说的滚动引入占位区域（空 div 或简单文案） |
| `ExploreGraph.jsx` | `/explore` | 标题「探索图谱」（P4 后续做图谱与推荐路线） |
| `Timeline.jsx` | `/timeline` | 标题「时空叙事」（P5 后续做时间轴与故事） |
| `Ask.jsx` | `/ask` | 标题「智能问答」（P6 后续做问答与关于） |
| `About.jsx` | `/about` | 标题「关于我们」（P6 后续做简介与致谢） |

每个页面可以就一句话 + 简单样式，例如：

```jsx
// 示例：ExploreGraph.jsx 占位
export default function ExploreGraph() {
  return (
    <div className="page-placeholder">
      <h1>探索图谱</h1>
      <p>本页由 P4 实现。</p>
    </div>
  );
}
```

注意：**首页 Home.jsx** 里记得留一块滚动引入的占位（如 `<section className="scroll-hero">...</section>`），方便 P2 直接替换成 ScrollHero。

---

## 三、建议的目录结构（阶段1 完成后）

```
src/
├── components/
│   └── Navigation.jsx    # 全局导航栏
├── pages/
│   ├── Home.jsx          # 首页（含滚动区占位）
│   ├── ExploreGraph.jsx
│   ├── Timeline.jsx
│   ├── Ask.jsx
│   └── About.jsx
├── App.jsx               # 路由 + 挂载导航
├── main.jsx
└── style.css             # 或按项目现有方式
```

若计划里还有 `data/`、`style.css` 等，可以先把空目录或文件建好，方便后续 P3、P4 直接往里面加。

---

## 四、自测清单（做完请勾一遍）

- [ ] `npm run dev` 能启动，无报错。
- [ ] 访问 `/`、`/explore`、`/timeline`、`/ask`、`/about` 都能打开对应占位页。
- [ ] 顶部导航栏 5 个链接都能正确跳转。
- [ ] 首页有预留滚动引入区域（供 P2 接 ScrollHero）。
- [ ] 导航栏样式符合「水彩古风」描述（淡彩/古典字体/淡青或赭色）。

---

## 五、提交与推送

阶段1 全部做完并自测通过后，在项目目录执行：

```bash
git add .
git commit -m "feat(phase1): 项目基础、路由、导航栏、五页占位"
git push origin main
```

推送成功后，把仓库地址和 **《组员协作说明》** 发给组员，让大家：

1. `git clone` 仓库；
2. 按文档创建各自分支（`feat/phase2-home` 等）；
3. 开始做各自阶段。

这样 P1 的职责就完成了，后续合并顺序按《组员协作说明》里的「五、最后合并代码时」操作即可。
