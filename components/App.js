import React, {Component} from 'react';
import {render} from 'react-dom';
import QuestionBankList from './QuestionBankList';
import AddQuestionBankForm from './AddQuestionBankForm';
import EditQuestionBankForm from './EditQuestionBankForm';

require('../public/main.scss');

let questionBankArray = [];
let lsArray = JSON.parse(localStorage.getItem('questionBanks'));

if (!lsArray || lsArray == null || lsArray.length == 0){
    let sample1 = {
      question: 'ReactJS was developed by?',
      answers: ['Amazon', 'Facebook', 'Mega', 'Google']
    };
    let sample2 = {
      question: 'What is the capital of India?',
      answers: ['Chennai', 'Delhi', 'Manali', 'Kashmir']
    };
    questionBankArray.push(sample1);
    questionBankArray.push(sample2);
}else{
    questionBankArray = lsArray
}



class App extends Component{
  constructor(props) {
    super(props);
    this.state = {
      active: 'col-sm-4 list-left closePanel',
      modalOpen: props.opened,
      editModalOpen: props.editOpened,
      buttonText: 'ADD QUESTION',
      questionBanks: questionBankArray,
      editingData: '',
      editingIndex: ''
    };
  }

  addQuestionBank(questionBank) {
    let allQuestionBanks = this.state.questionBanks.concat([questionBank]);
    this.setState({
      questionBanks: allQuestionBanks
    });
    localStorage.setItem('questionBanks', JSON.stringify(allQuestionBanks));
  }

  deleteQuestionBank(index) {
    let finalQuestionBanks = this.state.questionBanks.filter((d, i) => i !== index);
    this.setState({
      questionBanks: finalQuestionBanks
    });
    localStorage.setItem('questionBanks', JSON.stringify(finalQuestionBanks));
  }

  editQuestionBank(index) {
    let editingData = this.state.questionBanks[index];

    this.setState({
      editingIndex: index,
      editingData: editingData
    });

    const state = this.state.editModalOpen;
    this.setState({editModalOpen: !state});
  }

  closeEditModal() {
    const state = this.state.editModalOpen;
    this.setState({editModalOpen: !state});
    this.setState({
      editingIndex: '',
      editingData: ''
    });
  }

  editQuestionBankComplete(index, questionBank) {
    let questionBanks = this.state.questionBanks;
    questionBanks[index] = questionBank;
    localStorage.setItem('questionBanks', JSON.stringify(questionBanks));
    this.setState({ questionBanks: questionBanks });
    this.setState({
      editingIndex: '',
      editingData: ''
    });
  }

  onclick(type){
    this.setState({
       active: type == 'col-md-4 list-left closePanel' ? 'col-md-4 list-left openPanel' : 'col-md-4 list-left closePanel',
       buttonText: type == 'col-md-4 list-left closePanel' ? 'CLOSE PANEL' : 'ADD A QUESTION',
    });
  }

  render(){


    let editForm = '';
    if (this.state.editingData !== '') {
      editForm = <EditQuestionBankForm
          show={this.state.editModalOpen}
          onClose={this.closeEditModal.bind(this)}
          data={this.state.editingData}
          index={this.state.editingIndex}
          _handleEditQuestionBank={this.editQuestionBankComplete.bind(this)}>
        </EditQuestionBankForm>;
    }

    return (
      <div className="sub-container">
        {editForm}
        <div className={this.state.active}>
          <h1>QuestionBank Admin</h1>
          <div className="well list-left-accordion">
            <QuestionBankList
              questionBanks={this.state.questionBanks}
              _removeQuestionBank={this.deleteQuestionBank.bind(this)}
              _modifyQuestionBank={this.editQuestionBank.bind(this)} />

            <div className="addq-container">
              <button type="button" className='btn btn-add addq'  onClick={this.onclick.bind(this, this.state.active)}>{this.state.buttonText}</button>
            </div>
          </div>
          <div className="addq-mob">
            <button type="button" className='btn btn-add addq'  onClick={this.onclick.bind(this, this.state.active)}>{this.state.buttonText}</button>
          </div>

        </div>
        <div className="col-sm-12 col-md-8 list-right">
          <AddQuestionBankForm
            _handleAddQuestionBank={this.addQuestionBank.bind(this)}>
          </AddQuestionBankForm>
        </div>

      </div>
    )
  }
};

render(<App opened={false} editOpened={false} />, document.getElementById('main'));
