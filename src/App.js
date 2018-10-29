import React, { Component } from 'react';
import './App.css';

import { Form, RadioGroup, Radio, Text } from 'react-form';
import { ERRORS, validate } from './passport-validation';

class App extends Component {
  state = { error: false, missing: [] };

  handleFormChange = ({ values }, formApi) => {
    if (values.passportID) {
      formApi.setValue(
        'passportID',
        values.passportID.toUpperCase()
      );
    }
  };

  validateForm = values => {
    let missing = [];
    if (!values.title) {
      missing = [ ...missing, 'title' ];
    }
    if (!values.firstname) {
      missing = [ ...missing, 'firstname' ];
    }
    if (!values.lastname) {
      missing = [ ...missing, 'lastname' ];
    }
    if (!values.email) {
      missing = [ ...missing, 'email' ];
    }
    if (!values.country) {
      missing = [ ...missing, 'country' ];
    }
    if (!values.passportID) {
      missing = [ ...missing, 'passportID' ];
      return { error: { missingFields: missing } };
    }
    const validationResult = validate(values.country, values.passportID);
    if (validationResult.valid && missing.length === 0) {
      return { success: 'Thank you' };
    }
    let errorMessage = null;
    switch (validationResult.error) {
      case ERRORS.WRONG_LETTER:
        errorMessage = validationResult.detail.length === 1 ?
          'The following letter in the passport ID is not valid:' :
          'The following letters in the passport ID are not valid:';
        errorMessage = `${errorMessage} ${validationResult.detail.join(', ')}`;
        break;
      case ERRORS.WRONG_LENGTH:
        errorMessage = `Passport ID should have ${validationResult.detail} characters`;
        break;
      case ERRORS.WRONG_FORMAT:
        errorMessage = 'The passport ID does not follow the right format';
        break;
    }
    return {
      error: {
        missingFields : missing,
        passportValidationFailure: errorMessage
      },
    };
  };

  handleSubmitFailure = errors => {
    console.log(errors);
    const extracted = errors[undefined];
    let newState = { error: true, missing: [], errorMessage: null };
    if (extracted.missingFields) {
      newState = { ...newState, missing: extracted.missingFields };
    }
    if (extracted.passportValidationFailure) {
      newState = {
        ...newState,
        missing: [ ...newState.missing, 'passportID '],
        errorMessage: extracted.passportValidationFailure
      };
    }
    this.setState(newState);
  };

  handleSubmit = () => {
    this.setState({
      error: false,
      missing:[],
      errorMessage: null,
      submitted: true
    });
  }

  setClassNameForField = (field, defaultClassName) => {
    if (this.state.missing.includes(field)) {
      return `${defaultClassName} missing`;
    }
    return defaultClassName;
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Registration</p>
          <p
            className={
              this.state.submitted ?
                'App-header-success' :
                this.state.error ?
                  'App-header-error' :
                  'App-header-warning'
            }
          >
            {
              this.state.submitted ?
                'Registration completed!' :
                this.state.errorMessage ?
                  this.state.errorMessage :
                  'All fields are required.'
            }
          </p>
        </header>
        <Form
          onChange={this.handleFormChange}
          onSubmit={this.handleSubmit}
          onSubmitFailure={this.handleSubmitFailure}
          validate={this.validateForm}
        >
          {formApi => (
            <form className="App-form" onSubmit={formApi.submitForm}>
              <div className="App-form-group">
                <p className="App-form-group-title">Personal info</p>
                <label
                  htmlFor="title"
                  className={this.setClassNameForField('title', 'primary-label')}
                >
                  Title
                </label>
                <RadioGroup field="title" className="radio-group">
                  <Radio value="male" id="radio-input-male" />
                  <label htmlFor="radio-input-male" className="secondary-label">Mr.</label>
                  <Radio value="female" id="radio-input-female" />
                  <label htmlFor="radio-input-female" className="secondary-label">Mrs.</label>
                </RadioGroup>
                <label
                  htmlFor="firstname"
                  className={this.setClassNameForField('firstname', 'primary-label')}
                >
                  First Name
                </label>
                <Text
                  field="firstname"
                  id="firstname"
                  className={this.setClassNameForField('firstname', 'text-input')}
                />
                <label
                  htmlFor="lastname"
                  className={this.setClassNameForField('lastname', 'primary-label')}
                >
                  Last Name
                </label>
                <Text
                  field="lastname"
                  id="lastname"
                  className={this.setClassNameForField('lastname', 'text-input')}
                />
                <label
                  htmlFor="email"
                  className={this.setClassNameForField('email', 'primary-label')}
                >
                  Email
                </label>
                <Text
                  field="email"
                  id="email"
                  className={this.setClassNameForField('email', 'text-input')}
                />
              </div>
              <hr />
              <div className="App-form-group">
                <p className="App-form-group-title">Passport info</p>
                <label
                  htmlFor="country"
                  className={this.setClassNameForField('country', 'primary-label')}
                >
                  Country of citizenship
                </label>
                <RadioGroup field="country" id="country" className="radio-group">
                  <Radio value="brazil" id="radio-input-brazil" />
                  <label htmlFor="radio-input-brazil" className="secondary-label">Brazil</label>
                  <Radio value="france" id="radio-input-france" />
                  <label htmlFor="radio-input-france" className="secondary-label">France</label>
                </RadioGroup>
                <label
                  htmlFor="passportID"
                  className={this.setClassNameForField('passportID', 'primary-label')}
                >
                  Passport ID
                </label>
                <Text
                  field="passportID"
                  id="passportID"
                  className={this.setClassNameForField('passportID', 'text-input')}
                  onChange={this.onPassportIDChange}
                />
              </div>
              <hr />
              <button type="submit" className="App-form-submit">Register</button>
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default App;
