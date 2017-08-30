import React, {Component} from 'react';

class EditQuestionBankForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      question: '',
      answers: '',
      inputs :[]
    };
    this.changeQuestion = this.changeQuestion.bind(this);
  }

  componentDidMount() {
    let u = [];
    this.props.data.answers.map(function(input,index){
      u.push(index)
    });
    this.setState({
      question: this.props.data.question,
      inputs: u
    });
  }

  handleEditQuestionBank(e){
    e.preventDefault();

    let answersArray = this.props.data.answers;
    let question = this.refs.question.value.trim();
    let refs = $.extend(true,{},this.refs);
    console.log(refs);
    delete refs.question;

    Object.keys(refs).map(function(inp,index) {
      console.log(refs[inp].value);
      if(refs[inp].value !== ''){
         answersArray[index] = refs[inp].value;
         refs[inp].value = '';
       }
    })

    let questionBankObject = {
      question: this.state.question,
      answers: answersArray
    };

    this.props._handleEditQuestionBank(this.props.index, questionBankObject);

    this.props.onClose.bind(this);
  }

  changeQuestion(e) {
    this.setState({question: e.target.value});
  }

  changeAnswers(e) {
    console.log(this.refs)
  }

  render() {
    const { show } = this.props;
    const styles = {
      modal: {
        display: (show) ? (show) : 'none',
        zIndex: 100000
      }
    };

    var inp = this.props.data.answers;
    var inputsList = inp.map(function(input,index){
                    console.log(input);
                    var ph = 'option ' + (index+1)
                    return <div key={index} className="form-group">
                              <label
                                className="col-sm-2 control-label"
                                htmlFor="{index}">
                              {ph}</label>
                              <div className="col-sm-10">
                                <input
                                  ref={index}
                                  type="textarea"
                                  className="form-control"
                                  id={index}
                                  placeholder={input}/>
                              </div>
                            </div> })

    return (

      <div className="modal-wrapper" style={styles.modal}>
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <button onClick={this.props.onClose} type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
              <h4 className="modal-question">Edit Question</h4>
            </div>

            <div className="modal-body">

              <form
                className="form-horizontal"
                role="form"
                onSubmit={this.handleEditQuestionBank.bind(this)}>
                <div className="form-group">
                  <label  className="col-sm-2 control-label"
                  htmlFor="question">Question</label>
                  <div className="col-sm-10">
                    <input
                      type="text"
                      className="form-control"
                      id="question"
                      ref="question"
                      value={this.state.question}
                      onChange={this.changeQuestion}
                      placeholder="Question"/>
                  </div>
                </div>

                {inputsList}

                <div className="form-group">
                  <div className="col-sm-offset-2 col-sm-10 modal-btn">
                    <button
                      type="submit"
                      className="btn btn-success">Finish Edit</button>
                  </div>
                </div>
              </form>

            </div>

          </div>
        </div>
      </div>
    );
  }
};

export default EditQuestionBankForm;
