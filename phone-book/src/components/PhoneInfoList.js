import React, { Component } from 'react';
import PhoneInfo from './PhoneInfo';
//�������� PhoneInfo ������Ʈ���� ������

class PhoneInfoList extends Component {
  static defaultProps = {
    list: [],
    onRemove: () => console.warn('onRemove not defined'),
    onUpdate: () => console.warn('onUpdate not defined'),
  }

  //�˻� �� App�� ���������ʿ� ���� PhoneInfoList�� �������� �ǹǷ� API ���
  //������ �޾ƿ� data�� ���� data�� �ٸ� �迭�� �� true�� ����
  //���� �迭�̸� false => �������� X
  shouldComponentUpdate(nextProps, nextState){
    return nextProps.data !== this.props.data;
  }

  //map�� ���� data �迭�� JSX�� ��ȯ
  //key��: �迭�� �������� �� �� �ʿ��� �� (�����͸� �߰��� ������ �������� ���� �� �ο�)
  render() {
    console.log('render PhoneInfoList');
    const { data, onRemove, onUpdate } = this.props; //�Ѿ�� props �������� �Ҵ�
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