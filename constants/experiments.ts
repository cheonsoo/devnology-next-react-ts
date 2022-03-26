type ObjType = {
  [key: string]: {
    [path: string]: string | boolean
  }
}

const experiments: ObjType = {
  scrollbyscreen: {
    publish: true,
    path: '/pages/scrollByScreen/combined/index.html',
    type: 'iframe',
    title: 'Scroll By Screen',
    desc: '한 페이지 씩 스크롤하기'
  },
  zoomimagescroll: {
    publish: true,
    path: '/pages/zoomImageScroll/index.html',
    type: 'iframe',
    title: 'Zoom Image Scroll',
    desc: '스크롤 할 때 이미지 확대 이벤트'
  },
  simpletimelinechart: {
    publish: true,
    path: '/pages/simpleTimelineChart/index.html',
    type: 'iframe',
    title: 'Simple Timeline Canvas Chart',
    desc: 'Canvas 로 구현한 간단한 라인차트'
  },
  astar: {
    publish: true,
    path: '/pages/astar/v1.0.7/index.html',
    type: 'iframe',
    title: 'Astar Path Finding Algorighm V1.0.0',
    desc: 'Java Script 로 Astar 구현하기'
  },
  visualizedArrayCompare: {
    publish: true,
    path: '@/components/visualizedArrayCompare/index.tsx',
    type: 'component',
    title: 'Visualize changed between two arrays',
    desc: '두 개의 배열에서 변경된 내역을 canvas 로 직접 그려보자'
  }
};

export default experiments;
