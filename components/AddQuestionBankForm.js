import React, {Component} from 'react';

class AddQuestionBankForm extends Component {

constructor(props){
      super(props);
      this.state={ count: 1,inputs :[0]}
  }

  handleAddQuestionBank(e){
    console.log(this.refs);
    e.preventDefault();
    let answersArray = [];
    let question = this.refs.question.value.trim();
    let refs = $.extend(true,{},this.refs);
    console.log(refs);
    delete refs.question;

    Object.keys(refs).map(function(inp,index) {
      console.log(refs[inp].value);
      answersArray[index] = refs[inp].value;
      refs[inp].value = '';
    })

    let questionBankObject = {
      question: question,
      answers: answersArray
    };

    this.props._handleAddQuestionBank(questionBankObject);
    this.refs.question.value = "";
    this.state.count=1;
    this.state.inputs=[0]
  }

 onclick(type){
     this.setState({
        count: type == 'add' ? this.state.count + 1 : this.state.count - 1,
     });
     type == 'add' ? this.state.inputs.push(this.state.count) : this.state.inputs.pop();
     console.log(this.state.inputs);
 }


  render() {

    var inputs = this.state.inputs;
    var inputsList = inputs.map(function(input,index){
                    var y = input.toString();
                    var ph = 'option ' + (input+1)
                    return <div key={index} className="form-group">
                              <label
                                className="col-sm-2 list-right-label"
                                htmlFor={y}>
                              {input + 1})</label>
                              <div className="col-sm-10">
                                <input
                                  ref={y}
                                  type="textarea"
                                  className="form-control"
                                  id={y}
                                  placeholder={ph}/>
                              </div>
                            </div>
                          })

    return (
              <form className="form-horizontal list-right-form" role="form"
              onSubmit={this.handleAddQuestionBank.bind(this)}>
                <div className="form-group list-right-question">
                  <label  className="col-sm-2 list-right-label"
                  htmlFor="question">Q</label>
                  <div className="col-sm-10">
                    <input
                      ref="question"
                      type="text"
                      className="form-control"
                      id="question"
                      placeholder="Question"/>
                  </div>
                </div>

                  { inputsList }

                  <div className="form-group">
                    <div className="col-sm-offset-2 col-sm-10">
                      <button
                        onClick={this.props.onClose}
                        type="submit"
                        className="btn btn-add btn-add-form"
                        disabled={this.state.count < 2}>Add Question</button>
                        <button type="button" className="btn btn-add btn-add-form"  onClick={this.onclick.bind(this, 'add')}>Add Option</button>
                        <button type="button" className="btn btn-sub btn-add-form" disabled={this.state.count == 1} onClick={this.onclick.bind(this, 'sub')}>Remove Option</button>

                          </div>
                  </div>
              </form>
    );
  }
};

export default AddQuestionBankForm;