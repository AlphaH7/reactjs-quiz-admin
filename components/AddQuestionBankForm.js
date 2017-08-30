import React, {Component} from 'react';
import FileBase64 from './react-file-base64.js';


class AddQuestionBankForm extends Component {

constructor(props){
      super(props);
      this.state={ count: 1,inputs :[0],files: []}
  }

  handleAddQuestionBank(e){
    console.log(this.refs);
    e.preventDefault();
    let answersArray = [];
    let question = this.refs.question.value.trim();
    let refs = $.extend(true,{},this.refs);
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

    this.state.files.base64 ? questionBankObject.image = this.state.files.base64 : console.log('no image uploaded');
    this.state.files = [];
    console.log(questionBankObject);
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

 getFiles(files){
   this.setState({ files: files })
 }

  render() {

    var inputs = this.state.inputs;
    var inputsList = inputs.map(function(input,index){
                    var y = input.toString();
                    var ph = 'Enter option ' + (input+1)
                    return <div key={index} className="form-group md-responsive-fix">
                              <label
                                className="col-sm-2 col-xs-2 list-right-label"
                                htmlFor={y}>
                              {input + 1})</label>
                              <div className="col-sm-10 col-xs-10">
                                <input
                                  ref={y}
                                  type="textarea"
                                  className="form-control addqstn"
                                  id={y}
                                  placeholder={ph}/>
                              </div>
                            </div>
                          })



    return (
      <div>
        <h1 className="addq-head">Add a Question</h1>
        <form className="form-horizontal list-right-form" role="form"
        onSubmit={this.handleAddQuestionBank.bind(this)}>
        <div className="list-right-qa-cntnr">
          <div className="form-group list-right-question col-sm-12">
            <label  className="col-sm-2 col-xs-2 list-right-label"
            htmlFor="question">Q</label>
            <div className="col-sm-10 col-xs-10">
              <textarea
                ref="question"
                type="text"
                className="form-control addqstn"
                id="question"
                placeholder="Enter question here"/>
            </div>
          </div>

          <div className="mob-optns">
            <div className="col-sm-6 pad-0">
                { inputsList }
            </div>
            <div className="col-sm-6 text-center">
            { this.state.files.length != 0 ?
                <img className="image" src={this.state.files.base64} />
                : <label className="custom-file-upload">
                  <p className="mar-0">Upload an Image</p>
                  <FileBase64
                  multiple={ false }
                  onDone={ this.getFiles.bind(this)}/>
                  </label>
                }
            </div>
          </div>

          </div>

            <div className="form-group">
              <div className="col-sm-offset-1 col-sm-10 col-xs-12 mob-btn-container">
                  <button type="button" className="btn btn-add btn-add-form mob-optns-btn" disabled={this.state.count == 6} onClick={this.onclick.bind(this, 'add')}>Add Option</button>
                  <button type="button" className="btn btn-sub btn-add-form mob-optns-btn" disabled={this.state.count == 1} onClick={this.onclick.bind(this, 'sub')}>Remove Option</button>
                  <button onClick={this.props.onClose} type="submit" className="btn btn-add btn-add-form" disabled={this.state.count < 2}>Add Question</button>
                    </div>
            </div>
        </form>
      </div>
    );
  }
};

export default AddQuestionBankForm;
