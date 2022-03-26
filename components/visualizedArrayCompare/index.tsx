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
    console.log(selected);

    console.log(arrayCompare);
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
