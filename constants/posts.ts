type ObjType = {
  [key: string]: {
    [path: string]: string | boolean;
  };
};

const posts: ObjType = {
  makingblog: {
    publish: false,
    path: '@/static/posts/makingblog/makingblog.md',
    title: 'Build a personal blog with limeted budget',
    desc: '소 비용으로 개인 블로그 개발 및 구축 (feat. AWS)',
  },
  scrollbyscreen: {
    publish: false,
    path: '@/static/posts/scrollbyscreen/scrollbyscreen.md',
    title: 'Scroll By Screen',
    desc: '한 페이지 씩 스크롤하기',
  },
  zoomimagescroll: {
    publish: false,
    path: '@/static/posts/zoomimagescroll/zoomimagescroll.md',
    title: 'Zoom Image Scroll',
    desc: '애플 홈페이지처럼 스크롤시 애니메이션이 실행되는 간지나는 메인 화면을 만들어보자!',
  },
  simpletimelinechart: {
    publish: false,
    path: '@/static/posts/simpletimelinechart/simpletimelinechart.md',
    title: 'Simple Timeline Canvas Chart',
    desc: 'Canvas 로 구현한 간단한 라인차트',
  },
  astar: {
    publish: true,
    path: '@/static/posts/astar/astar.md',
    title: 'A* path finding algorithm',
    desc: 'Java Script 로 구현한 A* 최단거리 알고리즘',
  },
  visualizedArrayCompare: {
    publish: true,
    path: '@/static/posts/visualizedArrayCompare/visualizedArrayCompare.md',
    title: 'Visualize changes history between two arrays',
    desc: '두 개의 배열의 변경점을 시각화하여 모듈화하려고 했는데 마땅한 라이브러리가 없네... 직접 그려보자!',
  },
  varcal: {
    publish: true,
    path: '@/static/posts/varcal/varcal.md',
    title: 'VarCal - Calculator with variables',
    desc: '숫자 및 산술연식을 변수에 대입하여 계산하는 계산기. React Native 로 만들고 Expo 로 배포하기.',
  },
  authentication: {
    publish: false,
    path: '@/static/posts/authentication/authentication.md',
    title: 'NodeJS 로 Session 관리 구축하기',
    desc: 'NodeJS 로 Session 관리 구축하기',
  },
  reactMarkdown: {
    publish: false,
    path: '@/static/posts/reactMarkdown/reactMarkdown.md',
    title: 'React-markdown 사용 시 Custom Component 적용하기',
    desc: `
    React-markdown 사용 시 Code-Block 이나 Image 태그가 제대로 동작하지 않거나, Markdown 에서 이미지의 사이즈를 조정할 수 없다는 점 때문에
    Custom Component 를 적용해보았다.
    `,
  },
  myself: {
    publish: false,
    path: '@/static/posts/myself/myself.md',
    title: '나는 좋은 개발자였을까? (feat. 젊은 개발자들에게)',
    desc: `좋은 개발자란 월급받고 일하는 한, 은퇴할 때까지 역량개발을 해야하는 숙명을 받아들이고 억지로던 자발적으로던 꾸준히 이어갈 수 있는 사람이라고 생각한다.`,
  },
  awssetup: {
    publish: true,
    path: '@/static/posts/awssetup/awssetup.md',
    title: 'NextJ + ReactJS 블로그 운영을 위한 AWS EC2 셋업',
    desc: `저렴한 블로그 운영을 위한 AWS EC2 세팅`,
  },
  reactmarkdown: {
    publish: true,
    path: '@/static/posts/reactmarkdown/reactmarkdown',
    title: 'React Markdown 문법',
    desc: `React Markdown 문법 정리 및 예제`,
  },
};

export default posts;
