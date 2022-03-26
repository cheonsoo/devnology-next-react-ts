# 필요한 그래프를 직접 그려보자
---
&nbsp;&nbsp;&nbsp;

두 배열의 차이점을 시각화한 그래프 라이브러리를 찾아보는데 딱 맞는게 없네...  
Canvas 로 한번 그려볼까?

### Sample UI  
![alt=sample;width=700px](/posts/visualizedArrayCompare/visualizedArrayCompare_1.png)  
[Show Live Demo](http://blog.devnology.co.kr/experiment/visualizedArrayCompare)  
&nbsp;&nbsp;  

---
&nbsp;&nbsp;  

### Implementation  
사실 구현자체는 간단하다. 이 그래프는 크게 세가지 부분으로 나눌 수 있는데,
* 모듈(사각형 영역, 배열의 한 값을 표시)
* 이동 내역 검출
* 이동 경로 표시

이 중에서 좀 주의깊게 봐야할 부분은 이동 경로 표시 부분이다.  
그냥 일직선으로 그리면 편하겠지만 그래도 이왕하는거 BezierCurve 로 구현했다.  
Bezier Curve 는 한점에서 한점으로의 이동 시, 설정된 몇개의 조절점(Control Point) 에 의해 특정한 곡선의 형태를 띄는 방식으로  
엄청나게 많은 분야에서 사용되고 있으며, 직접 구현할 필요는 없더라도 알아두면 사용처가 굉장히 많은 곡선의 형태이다.  

[(예제) Canvas 로 간단한 라인 차트를 그려보자](http://blog.devnology.co.kr/experiment/simpletimelinechart)  

canvas 에서 Bezier 곡선을 그리는 함수는 아래와 같다.  
```
void ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);
```

여기서 cp1 은 조절점1(Control Point 1), cp2 는 조절점2, 그리고 x, y 는 도달점이다.  
시작점은 ctx.moveTo(x, y) 로 설정한다.  
cp1 과 cp2 를 구하는 공식은 아래와 같다. (일반적인 경우)

```
from = { x: 50, y: 50 }
to = { x: 300, y: 300 }
cp1 = { x: (to.x + from.x) / 2, y: from.y } // 175, 50
cp2 = { x: (to.x + from.x) / 2, y: to.y } // 175, 300
```
여기서 cp1 과 cp2 를 다양한 방정식으로 구하면 좀 더 원만하거나 극적인 형태의 곡선을 그릴 수 있다.  

그런데 이렇게 곡선을 그리고 화살표를 붙여보니 아래와 같은 현상이 발생되었다.  
&nbsp;

보는 것과 같이 화살표의 각도가 이상하다. 그래프의 각도가 커지면 커질수록 더 이상해진다.  
&nbsp;

&nbsp;
|![width=300px;height=400px](/posts/visualizedArrayCompare/visualizedArrayCompare_2.png)|![width=300px;height=400px](/posts/visualizedArrayCompare/visualizedArrayCompare_3.png)|
|:---:|:---:|
|**[각도 수정 전]**|**[각도 수정 후]**|
&nbsp;


```js
/*
 * B(t) = (1 - t)^3*P0 + (3(1 - t)^2 * t * P1) + (3 * (1 - t) * t^2 * P2) + (t^3 * P3)
 * 0 <= t <= 1 -> 여기서 t 값은 Bezier 곡선의 진행상태를 시작점을 0, 도착점을 1로 봤을때 비율로 대입해줄 수 있다.
 */
function getBezierCoord(p0, p1, p2, p3, t = 0) {
  const bx = (Math.pow((1 - t), 3) * p0.x) + (3 * Math.pow((1 - t), 2) * t * p1.x) + (3 * (1 - t) * Math.pow(t, 2) * p2.x) + (Math.pow(t, 3) * p3.x);
  const by = (Math.pow((1 - t), 3) * p0.y) + (3 * Math.pow((1 - t), 2) * t * p1.y) + (3 * (1 - t) * Math.pow(t, 2) * p2.y) + (Math.pow(t, 3) * p3.y);
  return { x: bx, y: by }
}

function pointsToNormalisedVec(p, pp){
  let len;
  norm.y = pp.x - p.x;
  norm.x = -(pp.y - p.y);
  len = Math.sqrt(norm.x * norm.x + norm.y * norm.y);
  norm.x /= len;
  norm.y /= len;
  return norm;
}

const arrowWidth = 5;
bezierCoord = getBezierCoord(from, cp1, cp2, to, 0.97);
norm = pointsToNormalisedVec(bezierCoord, to);
ctx.beginPath();
const p1 = {
  x: to.x + (arrowWidth * norm.x + arrowlength * -norm.y),
  y: to.y + (arrowWidth * norm.y + arrowlength * norm.x)
};
const p2 = {
  x: to.x + (arrowWidth * -norm.x + arrowlength * -norm.y),
  y: to.y + (arrowWidth * -norm.y + arrowlength * norm.x)
};
ctx.moveTo(p1.x, p1.y);
ctx.lineTo(to.x, to.y);
ctx.lineTo(p2.x, p2.y);

// 만약 색이 다 채워진 삼각형을 그리고 싶다면
if (fillArrow)
  ctx.fill();

ctx.stroke();
```

&nbsp;


[WIKI: Bezier Curve](https://en.wikipedia.org/wiki/User_talk:Twirlip)  

&nbsp;&nbsp;  

---
&nbsp;&nbsp;  

[React 나 Vue 에서 사용가능한 NPM Module 보기](https://www.npmjs.com/package/visualized-array-compare)  

[Git](https://github.com/cheonsoo/visualized-array-compare)  

### Usage
* Installation
```
# npm i visualized-array-compare
```
&nbsp;


* Usage in React project  
TypeScript 용 Definition 을 정의하지 않아 일단 ts-ignore 로 에러를 다 무시해주었다...만 권장되는 방법은 아니다...  
시간이 될 때 TS 용 모듈로 제작할 예정...  
과연 누가 쓸까... 란 생각이 들긴 하지만 개인적인 용도로라도 쓰면 되니깐...  
개인 프로젝트라 대충 작성하여 코드가 엉망이긴 하지만 어떻게 쓰이는지는 이해할 수 있을듯...  

```js
import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
// @ts-ignore
import ArrayCompare from 'visualized-array-compare';

const StyledDiv = styled.div`
  padding: 20px;
  > div {
    display: flex;
    align-items: center;
    justify-content: left;

    > div {
      height: 30px;
    }
    div:nth-child(1) {
      width: 150px;
      display: flex;
      align-items: center;
      justify-content: left;
    }
    div:nth-child(2) {
      width: 150px;
      > select {
        width: 100%;
        height: 100%;
      }
    }
  }
`;

const VisualizedArrayCompare: React.FC = () => {
  const [arrayCompare, setArrayCompare] = useState(null);
  const [prev, setPrev] = useState<String[]>([]);
  const [current, setCurrent] = useState<String[]>([]);
  const [options, setOptions] = useState({
    lineWidth: 1,
    lineStyle: 'RGBA(57, 150, 250, 1.00)',
    lineStyleStayed: '#000000',
    lineStyleMoved: 'RGBA(57, 150, 250, 1.00)',
    lineStyleAdded: 'green',
    lineStyleRemoved: 'red',
    fillArrow: true,
    fillStyle: 'RGBA(57, 150, 250, 1.00)',
    arrowStart: false,
    arrowEnd: true,
    showModuleMove: true,
    showGroupMove: false
  });

  const canvas = useRef(null);

  useEffect(() => {
    const prev = [
      'ModuleA',
      'ModuleB',
      'ModuleC',
      'ModuleD',
      'ModuleE',
      'ModuleF',
      'ModuleG',
      'ModuleH',
      'ModuleI',
      'ModuleJ',
      'ModuleK',
    ];
    const current = [
      'ModuleB',
      'ModuleC',
      'ModuleE',
      'ModuleF',
      'ModuleG',
      'ModuleA',
      'ModuleNew',
      'ModuleH',
      'ModuleJ',
      'ModuleI',
      'ModuleK',
    ];

    setPrev(prev);
    setCurrent(current);
  }, []);

  useEffect(() => {
    if (prev && current && canvas) {
      const arrayCompare = new ArrayCompare({
        canvas: canvas.current,
        prev: prev,
        current: current,
        options
      });
      arrayCompare.draw();

      setArrayCompare(arrayCompare);
    }
  }, [prev, current, canvas]);

  function handleChange(evt: any) {
    const selected = evt.target.value;

    if (arrayCompare) {
      let value = evt.target.value;
      if (value === 'all') {
        // @ts-ignore
        arrayCompare.options.showModuleMove = true;
        // @ts-ignore
        arrayCompare.options.showGroupMove = true;
      } else if (value === 'single') {
        // @ts-ignore
        arrayCompare.options.showModuleMove = true;
        // @ts-ignore
        arrayCompare.options.showGroupMove = false;
      } else {
        // @ts-ignore
        arrayCompare.options.showModuleMove = false;
        // @ts-ignore
        arrayCompare.options.showGroupMove = true;
      }
      // @ts-ignore
      arrayCompare.redraw();
    }
  }

  return (
    <div>
      <StyledDiv>
        <div>
          <div>Show Moves</div>
          <div>
            <select defaultValue='single' onChange={handleChange}>
              <option value='all'>All</option>
              <option value='single'>Single Move</option>
              <option value='group'>Group Move</option>
            </select>
          </div>
        </div>
        <div style={{ marginTop: '15px' }}>
          <span style={{ color: 'blue', paddingRight: '10px' }}>Moved</span>
          <span style={{ color: 'green', paddingRight: '10px'  }}>New</span>
          <span style={{ color: 'red', paddingRight: '10px'  }}>Removed</span>
          <span style={{ color: '#000000', paddingRight: '10px'  }}>No Change</span>
        </div>
      </StyledDiv>
      <div>
        <canvas ref={canvas} id="module-compare-canvas" />
      </div>
    </div>
  );
};
export default VisualizedArrayCompare;

```

---
### 마치며...  

역시 포스트 작성은 어려운 일이다...  
전체 소스에 대한 리뷰를 작성하고 싶었지만 Bezier 곡선의 초안만으로 진이 다 빠져버렸다...  
누가 보지도 않는 블로그, 일단 여기서 마무리 하고 추후에 다시 내용을 보충해야겠다...  
