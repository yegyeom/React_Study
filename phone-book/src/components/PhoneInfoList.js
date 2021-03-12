import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';
//여러개의 PhoneInfo 컴포넌트들을 보여줌

class PhoneInfoList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }

  //검색 시 App이 리렌더링됨에 따라 PhoneInfoList도 리렌더링 되므로 API 사용
  //다음에 받아올 data가 현재 data랑 다른 배열일 때 true로 설정
  //같은 배열이면 false => 리렌더링 X
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data !== this.props.data;
  }

  //map을 통해 data 배열을 JSX로 변환
  //key값: 배열을 렌더링할 때 꼭 필요한 값 (데이터를 추가할 때마다 고정적인 고유 값 부여)
  render() {
    console.log('render PhoneInfoList');
    const { data, onRemove, onUpdate } = this.props; //넘어온 props 구조분해 할당
    const list = data.map(
      info => (
      <PhoneInfo 
        key={info.id} 
        info={info}
        onRemove={onRemove}
        onUpdate={onUpdate}
        />)
    );

    return (
      <div>
        {list}    
      </div>
    );
  }
}

export default PhoneInfoList;