import React, { Component } from 'react';

class PhoneForm extends Component{
    state={
        name: '',
        phone: ''
    }

    handleChange = (e) => { //등록창 변화 감지 핸들러
        this.setState({
            [e.target.name]: e.target.value
            //현재의 텍스트 값
        })
    }

    handleSubmit = (e) => { //등록 제출 감지 핸들러
        // 페이지 리로딩 방지
        e.preventDefault();
        // 상태값을 onCreate 를 통하여 부모에게 전달
        this.props.onCreate(this.state);
        // 상태 초기화
        this.setState({
          name: '',
          phone: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}> {/* submit시 연결할 함수 등록*/}
                <input
                placeholder="Name"
                value={this.state.name} //제출될 값
                onChange={this.handleChange} //input의 텍스트 값이 바뀔 때마다 발생
                name="name"
                />
                <input
                placeholder="Phone Number"
                value={this.state.phone}
                onChange={this.handleChange}
                name="phone"
                />
                <button type="submit">submit</button>
            </form>
        );
    }
}

export default PhoneForm;