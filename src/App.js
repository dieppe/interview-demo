import React, { Component } from 'react';
import './App.css';

import { Form, RadioGroup, Radio, Text } from 'react-form';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Form>
          {formApi => (
            <form>
              <label htmlFor="title">Title</label>
              <RadioGroup field="title">
                <label htmlFor="radio-input-male">Mr.</label>
                <Radio value="male" id="radio-input-male" />
                <label htmlFor="radio-input-female">Mrs.</label>
                <Radio value="female" id="radio-input-female" />
              </RadioGroup>
              <label htmlFor="firstname">First Name</label>
              <Text field="firstname" id="firstname" />
              <label htmlFor="lastname">Last Name</label>
              <Text field="lastname" id="lastname" />
              <label htmlFor="country">Country of citizenship</label>
              <RadioGroup field="country">
                <label htmlFor="radio-input-brazil">Brazil</label>
                <Radio value="brazil" id="radio-input-brazil" />
                <label htmlFor="radio-input-france">France</label>
                <Radio value="france" id="radio-input-france" />
              </RadioGroup>
              <label htmlFor="passportID">Passport ID</label>
              <Text field="passportID" id="passportID" /> {/* UPPERCASE */}
              <label htmlFor="email">Email</label>
              <Text field="email" id="email" />
            </form>
          )}
        </Form>
      </div>
    );
  }
}

export default App;
