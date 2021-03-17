import React, {Component} from 'react';
//각 전화번호 정보를 보여주는 컴포넌트
//info 객체를 props로 받아와서 렌더링
class PhoneInfo extends Component{
    static defaultProps = {
        info: {
            name: 'name',
            phone: '010-0000-0000',
            id: 0
        }
    }
    
    state = {
      //수정버튼 눌리면 editing 값 true로 설정
      //true일 때: 기존 텍스트 형태로 보여주던 값들을 input형태로 보여주게 됨
      editing: false,
      //input값을 담기 위해서 각 필드를 위한 값 설정
      name: '',
      phone: '',
    }

    shouldComponentUpdate(nextProps, nextState){
      //수정 상태가 아니고, info 값이 같다면 리렌더링 안함
      if(!this.state.editing
        && !nextState.editing
        && nextProps.info === this.props.info){
          return false;
        }
        //나머지 경우엔 리렌더링
        return true;
    }

    handleRemove = () => { //삭제 버튼 감지 핸들러
      //삭제 버튼이 클릭되면 onRemove에 id 넣어서 호출
      const { info, onRemove } = this.props;
      onRemove(info.id);
    }

    //editing 값 반전 함수
    handleToggleEdit = () => { //수정 및 적용 버튼 감지 핸들러
      const { editing } = this.state;
      this.setState({ editing: !editing });
    }
  
    //input에서 onChange 이벤트가 발생 될 때 호출되는 함수
    handleChange = (e) => { //변화 감지 핸들러
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }

    //editing 값이 바뀔 때 처리 할 로직
    //수정 눌렀을 때: 기존의 값이 input에 나타남
    //수정 적용할 때: input의 값들이 부모한테 전달
    componentDidUpdate(prevProps, prevState){
      const { info, onUpdate } = this.props;
      if(!prevState.editing && this.state.editing) {
      // editing 값이 false -> true 로 전환 될 때 (수정 버튼 눌렸을 때)
      // info 의 값을 state 에 넣어준다
        this.setState({ //수정 버튼 클릭 시 기존 값을 유지시키기 위해
          name: info.name, 
          phone: info.phone
      })
    }

      if (prevState.editing && !this.state.editing) {
        // editing 값이 true -> false 로 전환 될 때
        //onUpdate에 인자를 넣고 호출
        onUpdate(info.id, {
          name: this.state.name,
          phone: this.state.phone
        });
      }
    }

    render() {
      console.log('render PhoneInfo ' + this.props.info.id);
        const style = {
          border: '1px solid black', 
          padding: '8px',
          margin: '8px'
        };
        
        const { editing } = this.state; //수정 여부

        if(editing){ //수정모드
          return(
            <div style={style}>
              <div>
                <input
                  value={this.state.name}
                  name="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </div>
              <div>
                <input
                  value={this.state.phone}
                  name="phone"
                  placeholder="Phone"
                  onChange={this.handleChange}
                />
              </div>
              <button onClick={this.handleToggleEdit}>apply</button>
              <button onClick={this.handleRemove}>delete</button>
            </div>
          );
        }

        //일반모드
        const {
          name, phone, id
        } = this.props.info;
        
        return (
          <div style={style}>
            <div><b>{name}</b></div>
            <div>{phone}</div>
            <button onClick={this.handleToggleEdit}>modify</button>
            <button onClick={this.handleRemove}>delete</button>
          </div>
        );
      }   
}

export default PhoneInfo;