import React, { Component } from 'react';
import PhoneForm from './components/PhoneForm';
import PhoneInfoList from './components/PhoneInfoList';

class App extends Component {
  id = 2 //각 데이터를 식별하기 위함, 데이터를 추가할 때마다 숫자를 1씩 더함
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
  handleChange = (e) => { //검색창 변화 감지 핸들러
    this.setState({
      keyword: e.target.value,
    });
  }
  handleCreate = (data) => { //전화번호 등록 핸들러
    const { information } = this.state; //기존 전화번호 리스트 불러오기
    this.setState({
      information: information.concat({id: this.id++, ...data}) //기존 전화번호 리스트 끝에 붙이기
    })
  }
  handleRemove = (id) => { //전화번호 삭제 핸들러
    const { information } = this.state; //기존 전화번호 리스트 불러오기
    this.setState({
      information: information.filter(info => info.id !== id)
      //filter: 특정 조건에 부합되는 원소들만 뽑아내서 새 배열을 만듦
    })
  }
  handleUpdate = (id, data) => {
    const { information } = this.state;
    this.setState({
      information: information.map(
        info => id === info.id
        ? { ...info, ...data} //새 객체를 만들어서 기존의 값과 전달받은 data를 덮어씀
        : info //기존의 값을 그대로 유지
      )
    })
  }
  render() {
    const {information, keyword} = this.state; //state 정보 구조분해 할당
    const filteredList = information.filter(
      info => info.name.indexOf(keyword) !== -1 //keyword 값에 따라서 information 배열을 필터링
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
          data={filteredList} //필터링한 결과를 보여줌
          onRemove={this.handleRemove}
          onUpdate={this.handleUpdate}
        />
      </div>
    );
  }
}

export default App;
