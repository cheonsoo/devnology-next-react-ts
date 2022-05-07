type ObjType = {
  [key: string]: {
    [path: string]: string | boolean;
  };
};

const experiments: ObjType = {
  scrollbyscreen: {
    publish: true,
    path: '/experiments/scrollbyscreen/index.html',
    type: 'local',
    title: 'Scroll By Screen',
    desc: '한 페이지 씩 스크롤하기',
  },
  zoomimagescroll: {
    publish: true,
    path: '/experiments/zoomimagescroll/index.html',
    type: 'local',
    title: 'Zoom Image Scroll',
    desc: '스크롤 할 때 이미지 확대 이벤트',
  },
  simpletimelinechart: {
    publish: true,
    path: '/experiments/simpletimelinechart/index.html',
    type: 'local',
    title: 'Simple Timeline Canvas Chart',
    desc: 'Canvas 로 구현한 간단한 라인차트',
  },
  astar: {
    publish: true,
    path: 'http://static.devnology.co.kr/apps/astar/index.html',
    type: 's3',
    title: 'Astar Path Finding Algorighm V1.0.0',
    desc: 'Java Script 로 Astar 구현하기',
  },
  visualizedArrayCompare: {
    publish: true,
    path: 'http://static.devnology.co.kr/apps/visualized-array-compare/index.html',
    type: 's3',
    title: 'Visualize changed between two arrays',
    desc: '두 개의 배열에서 변경된 내역을 canvas 로 직접 그려보자',
  },
  canvaseditor: {
    publish: true,
    path: 'http://static.devnology.co.kr/apps/canvas-editor/index.html',
    type: 's3',
    title: '동영상에서 추출한 이미지를 간단히 수정할 수 있는 웹 에디터',
    desc: '동영상에서 이미지를 추출하여 테스트 및 도형을 머지하는 간단 웹 에디터',
  }
};

export default experiments;
