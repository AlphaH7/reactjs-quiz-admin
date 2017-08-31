import React, {Component} from 'react';
import QuestionBankDetail from './QuestionBankDetail';

class QuestionBankList extends Component{
  constructor() {
    super();
    this.state = { mounted: false };
  }

  componentDidMount() {
    this.setState({ mounted: true });
  }

  deleteQuestionBank(id) {
    this.props._removeQuestionBank(id);
  }

  editQuestionBank(id) {
    this.props._modifyQuestionBank(id);
  }

  render(){
    let questionBankNames = "";
    if(this.state.mounted){
      if(this.props.questionBanks.length === 0) {
        questionBankNames = <h4 className="emptyQB"> No questions yet</h4>;
      } else {
        questionBankNames = this.props.questionBanks.map((data, index) => {
          return <QuestionBankDetail
            item={data}
            key={index}
            id={index}
            _deleteQuestionBank={this.deleteQuestionBank.bind(this)}
            _editQuestionBank={this.editQuestionBank.bind(this)} />;
        });
      }
    }

    return (
      <div>
        <div className="panel-group" id="accordion">
          {questionBankNames}
        </div>
      </div>
    );
  }
};

export default QuestionBankList;
