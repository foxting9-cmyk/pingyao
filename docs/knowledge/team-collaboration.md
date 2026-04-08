# 组员协作说明：如何连上仓库并开始开发

本文档给 **P2～P6** 使用，用于从 P1 建好的仓库拉代码、建自己的分支、日常同步和最后合并。

---

## 一、第一次：克隆仓库到本机

1. 确保本机已安装 **Git**（在终端输入 `git --version` 能显示版本号即可）。
2. 选一个你想放项目的目录（如桌面或 `D:\projects`），在终端执行：

   ```bash
   cd 你想放项目的目录
   git clone https://github.com/520XXX205/pingyao.git
   cd pingyao
   ```

3. 完成后，当前目录就是项目根目录，且已经和远程的 `main` 分支同步。

**仓库地址**：`https://github.com/520XXX205/pingyao.git`  
（若 P1 后续换了地址，以 P1 通知为准。）

---

## 二、创建并切换到你的分支

按你的角色选**一个**分支名，在项目目录下执行（只执行和你对应的那一行）：

| 角色 | 分支名 | 命令 |
|------|--------|------|
| P2 首页 | `feat/phase2-home` | `git checkout -b feat/phase2-home` |
| P3 数据 | `feat/phase3-data` | `git checkout -b feat/phase3-data` |
| P4 探索图谱 | `feat/phase4-explore` | `git checkout -b feat/phase4-explore` |
| P5 时空叙事 | `feat/phase5-timeline` | `git checkout -b feat/phase5-timeline` |
| P6 问答与关于 | `feat/phase6-ask-about` | `git checkout -b feat/phase6-ask-about` |

例如 P2 执行：

```bash
git checkout -b feat/phase2-home
```

之后你做的修改、提交都会在这个分支上，不会直接影响别人的分支和 `main`。

---

## 三、日常开发：保存进度并推送到远程

在你自己的分支上开发时，经常做这三步即可：

```bash
cd pingyao
git add .
git commit -m "简短说明你改了什么"
git push -u origin 你的分支名
```

例如 P2 第一次推送时：

```bash
git push -u origin feat/phase2-home
```

之后同一分支再推送可以简写为：

```bash
git push
```

**若推送时提示要登录**：  
- Username 填你的 **GitHub 用户名**（若你已加入该仓库）或 P1 的账号（若仓库是 P1 的、你只是克隆）。  
- Password 填 **Personal Access Token**（在 GitHub → Settings → Developer settings → Personal access tokens 里生成，勾选 `repo`）。GitHub 不再支持用登录密码推送。

---

## 四、和 main 保持同步（减少最后合并冲突）

P1 或别人把代码合并进 `main` 后，建议你定期把 `main` 的更新拉到自己分支里：

```bash
cd pingyao
git fetch origin
git checkout main
git pull origin main
git checkout 你的分支名
git merge main
```

例如 P2 的分支是 `feat/phase2-home`，则最后两行是：

```bash
git checkout feat/phase2-home
git merge main
```

若有冲突，按提示打开冲突文件，删掉 `<<<<<<<`、`=======`、`>>>>>>>` 标记并保留正确代码，然后：

```bash
git add 冲突文件
git commit -m "merge main 并解决冲突"
```

---

## 五、最后合并代码时（由 P1 或负责人操作）

在 `main` 分支上，按依赖顺序依次合并各人分支，例如：

```bash
cd pingyao
git checkout main
git pull origin main

git merge feat/phase3-data
git push origin main

git merge feat/phase2-home
git push origin main

# 接着合并 phase4、phase5、phase6...
```

有冲突时，解决冲突后 `git add`、`git commit` 再 `git push origin main`。

---

## 六、常用命令速查

| 操作 | 命令 |
|------|------|
| 查看当前分支 | `git branch` |
| 查看当前状态 | `git status` |
| 拉取 main 最新 | `git checkout main` → `git pull origin main` |
| 回到自己分支 | `git checkout 你的分支名` |
| 推送自己分支 | `git push` 或 `git push origin 你的分支名` |

---

## 七、遇到问题

- **没有权限推送**：让 P1 在 GitHub 仓库的 Settings → Collaborators 里添加你的 GitHub 账号为协作者；或用 P1 提供的 Token（仅限信任环境）。
- **冲突不知道留哪边**：和改同一文件的同学或 P1 沟通，一起决定保留哪段代码。
- **克隆很慢**：可用国内镜像或 VPN；或让 P1 导出 zip 发给你，你再在本机 `git init` 并 `git remote add origin ...` 关联远程（适合只读、不推送的情况）。

有问题在群里问 P1 或一起对一下本文档步骤即可。


上传代码
cd c:\Users\34484\Desktop\pinyao
git add 组员协作说明.md
git commit -m "docs: 添加组员协作说明"
git push origin main