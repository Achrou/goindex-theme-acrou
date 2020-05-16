import { Notification } from 'element-ui';

export default function check() {
  let g2index_verison = window.gdconfig.g2index_verison;
  if (!g2index_verison || process.env.G2INDEX_VERSION !== g2index_verison) {
    Notification.success({
      title: "通知",
      dangerouslyUseHTMLString: true,
      message: `
        检测到有新版本，<a href="https://github.com/Aicirou/goindex-theme-acrou">前往GitHub</a></br>
        New version detected, <a href="https://github.com/Aicirou/goindex-theme-acrou">Go to GitHub</a>
      `,
      duration: 0
    });
  }
}
