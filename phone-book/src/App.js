import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2 //�� �����͸� �ĺ��ϱ� ����, �����͸� �߰��� ������ ���ڸ� 1�� ����
  state = {
    information: [
      {
        id: 0,
        name: 'minjun',
        phone: '010-0000-0000'
      },
      {
        id:1 ,
        name: 'gildong',
        phone: '010-0000-0001'
      }
    ],
    keyword: ''
  }
  handleChange = (e) => { //�˻�â ��ȭ ���� �ڵ鷯
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) => { //��ȭ��ȣ ��� �ڵ鷯
    const { information } = this.state; //���� ��ȭ��ȣ ����Ʈ �ҷ�����
    this.setState({
      information: information.concat({id: this.id++, ...data}) //���� ��ȭ��ȣ ����Ʈ ���� ���̱�
    })
  }
  handleRemove = (id) => { //��ȭ��ȣ ���� �ڵ鷯
    const { information } = this.state; //���� ��ȭ��ȣ ����Ʈ �ҷ�����
    this.setState({
      information: information.filter(info => info.id !== id)
      //filter: Ư�� ���ǿ� ���յǴ� ���ҵ鸸 �̾Ƴ��� �� �迭�� ����
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
        ? { ...info, ...data} //�� ��ü�� ���� ������ ���� ���޹��� data�� ���
        : info //������ ���� �״�� ����
      )
    })
  }
  render() {
    const {information, keyword} = this.state; //state ���� �������� �Ҵ�
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1 //keyword ���� ���� information �迭�� ���͸�
    );
    return (
      <div>
        <PhoneForm
          onCreate={this.handleCreate}
        />
        <p>
          <input
            placeholder="Please enter the name to search"
            onChange={this.handleChange}
            value={keyword}
            />
        </p>
        <hr />
        <PhoneInfoList 
          data={filteredList} //���͸��� ����� ������
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
