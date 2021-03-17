import React, {Component} from 'react';
//�� ��ȭ��ȣ ������ �����ִ� ������Ʈ
//info ��ü�� props�� �޾ƿͼ� ������
class PhoneInfo extends Component{
    static defaultProps = {
        info: {
            name: 'name',
            phone: '010-0000-0000',
            id: 0
        }
    }
    
    state = {
      //������ư ������ editing �� true�� ����
      //true�� ��: ���� �ؽ�Ʈ ���·� �����ִ� ������ input���·� �����ְ� ��
      editing: false,
      //input���� ��� ���ؼ� �� �ʵ带 ���� �� ����
      name: '',
      phone: '',
    }

    shouldComponentUpdate(nextProps, nextState){
      //���� ���°� �ƴϰ�, info ���� ���ٸ� �������� ����
      if(!this.state.editing
        && !nextState.editing
        && nextProps.info === this.props.info){
          return false;
        }
        //������ ��쿣 ��������
        return true;
    }

    handleRemove = () => { //���� ��ư ���� �ڵ鷯
      //���� ��ư�� Ŭ���Ǹ� onRemove�� id �־ ȣ��
      const { info, onRemove } = this.props;
      onRemove(info.id);
    }

    //editing �� ���� �Լ�
    handleToggleEdit = () => { //���� �� ���� ��ư ���� �ڵ鷯
      const { editing } = this.state;
      this.setState({ editing: !editing });
    }
  
    //input���� onChange �̺�Ʈ�� �߻� �� �� ȣ��Ǵ� �Լ�
    handleChange = (e) => { //��ȭ ���� �ڵ鷯
      const { name, value } = e.target;
      this.setState({
        [name]: value
      });
    }

    //editing ���� �ٲ� �� ó�� �� ����
    //���� ������ ��: ������ ���� input�� ��Ÿ��
    //���� ������ ��: input�� ������ �θ����� ����
    componentDidUpdate(prevProps, prevState){
      const { info, onUpdate } = this.props;
      if(!prevState.editing && this.state.editing) {
      // editing ���� false -> true �� ��ȯ �� �� (���� ��ư ������ ��)
      // info �� ���� state �� �־��ش�
        this.setState({ //���� ��ư Ŭ�� �� ���� ���� ������Ű�� ����
          name: info.name, 
          phone: info.phone
      })
    }

      if (prevState.editing && !this.state.editing) {
        // editing ���� true -> false �� ��ȯ �� ��
        //onUpdate�� ���ڸ� �ְ� ȣ��
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
        
        const { editing } = this.state; //���� ����

        if(editing){ //�������
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

        //�Ϲݸ��
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