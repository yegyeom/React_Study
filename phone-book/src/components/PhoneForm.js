import React, { Component } from 'react';

class PhoneForm extends Component{
    state={
        name: '',
        phone: ''
    }

    handleChange = (e) => { //���â ��ȭ ���� �ڵ鷯
        this.setState({
            [e.target.name]: e.target.value
            //������ �ؽ�Ʈ ��
        })
    }

    handleSubmit = (e) => { //��� ���� ���� �ڵ鷯
        // ������ ���ε� ����
        e.preventDefault();
        // ���°��� onCreate �� ���Ͽ� �θ𿡰� ����
        this.props.onCreate(this.state);
        // ���� �ʱ�ȭ
        this.setState({
          name: '',
          phone: ''
        })
    }

    render(){
        return(
            <form onSubmit={this.handleSubmit}> {/* submit�� ������ �Լ� ���*/}
                <input
                placeholder="Name"
                value={this.state.name} //����� ��
                onChange={this.handleChange} //input�� �ؽ�Ʈ ���� �ٲ� ������ �߻�
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