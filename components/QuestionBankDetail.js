import React, {Component} from 'react';

class QuestionBankDetail extends Component {
  constructor(props) {
    super(props);
  }

  deleteQuestionBank() {
    this.props._deleteQuestionBank(this.props.id);
  }

  editQuestionBank() {
    this.props._editQuestionBank(this.props.id);
  }

  render() {
    return (
      <div className="panel panel-default" key={`questionBank-${this.props.id}`}>

        <div className="panel-heading">
          <h4 className="panel-question">
            <a
              data-toggle="collapse"
              data-parent="#accordion"
              href={`#questionBank-${this.props.id}`}>{this.props.item.question}</a>
          </h4>
        </div>

        <div id={`questionBank-${this.props.id}`} className="panel-collapse collapse">
          <div className="panel-body">
              {this.props.item.image ?

                <ul className="list-group col-sm-6 col-xs-12 mob-pad0">
                  <li className="list-group-item text-center"><img className="image" src={this.props.item.image} /></li>
                </ul>
                : null
              }

            <ul className={this.props.item.image ? "list-group col-sm-6 col-xs-12 mob-pad0" : "list-group"}>
              {this.props.item.answers.map((item, i) => {
                return <li key={`item-${this.props.id}-${i}`} className="list-group-item"><b>Option {i+1} : {item}</b></li>
              })}
            </ul>
            <div className="form-group">
              <div className="col-sm-12 pad-0">
                <button
                  type="submit"
                  onClick={this.deleteQuestionBank.bind(this)}
                  className="btn btn-sub btn-edit-form">DELETE</button>
                <button
                  type="submit"
                  onClick={this.editQuestionBank.bind(this)}
                  className="btn btn-add btn-edit-form">EDIT</button>
              </div>
            </div>
          </div>
        </div>

      </div>
    )
  }
};

export default QuestionBankDetail;
