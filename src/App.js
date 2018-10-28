import React, { Component } from 'react';
import './App.css';

import { Form, RadioGroup, Radio, Text } from 'react-form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>Registration</p>
        </header>
        <Form>
          {formApi => (
            <form className="App-form">
              <div className="App-form-group">
                <p className="App-form-group-title">Personal info</p>
                <label htmlFor="title" className="primary-label">Title</label>
                <RadioGroup field="title" id="title" className="radio-group">
                  <Radio value="male" id="radio-input-male" />
                  <label htmlFor="radio-input-male" className="secondary-label">Mr.</label>
                  <Radio value="female" id="radio-input-female" />
                  <label htmlFor="radio-input-female" className="secondary-label">Mrs.</label>
                </RadioGroup>
                <label htmlFor="firstname" className="primary-label">First Name</label>
                <Text field="firstname" id="firstname" className="text-input" />
                <label htmlFor="lastname" className="primary-label">Last Name</label>
                <Text field="lastname" id="lastname" className="text-input" />
              </div>
              <div className="App-form-group">
                <p className="App-form-group-title">Passport info</p>
                <label htmlFor="country" className="primary-label">Country of citizenship</label>
                <RadioGroup field="country" id="country" className="radio-group">
                  <Radio value="brazil" id="radio-input-brazil" />
                  <label htmlFor="radio-input-brazil" className="secondary-label">Brazil</label>
                  <Radio value="france" id="radio-input-france" />
                  <label htmlFor="radio-input-france" className="secondary-label">France</label>
                </RadioGroup>
                <label htmlFor="passportID" className="primary-label">Passport ID</label>
                <Text field="passportID" id="passportID" className="text-input" /> {/* UPPERCASE */}
              </div>
              <label htmlFor="email" className="primary-label">Email</label>
              <Text field="email" id="email" className="text-input" />
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default App;
