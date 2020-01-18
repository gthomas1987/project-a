
import React, { useState } from "react";
import {
  Card,
  FormGroup,
  FormControl,
  FormLabel,
  FormText,
  Container,
  Col,
  Row
} from "react-bootstrap";
import LoaderButton from "../components/LoaderButton";
import { useFormFields } from "../libs/hooksLib";
import {Auth} from 'aws-amplify';

export default function ConfirmationForm(props) {
    const [fields, handleFieldChange] = useFormFields({
        confirmationCode: ""
      });
    const [isLoading, setIsLoading] = useState(false);

    async function handleConfirmationSubmit(event) {
        console.log(props)
        event.preventDefault();
        setIsLoading(true);
    
        try {
        await Auth.confirmSignUp(props.email, fields.confirmationCode);
        //await Auth.signIn(props.email, props.password);
    
        //props.userHasAuthenticated(true);
        props.confirmed()
        } catch (e) {
        alert(e.message);
        setIsLoading(false);
        }
    }


    function validateConfirmationForm() {
        return fields.confirmationCode.length > 0;
    }



    return (
      <Container>
        <br></br>
          <Row>
              <Col md="auto" lg="4"></Col>
                <Col md="auto" lg="4">
                <Card bg="dark" text="white">
                  <form onSubmit={handleConfirmationSubmit}>
                    <FormGroup controlId="confirmationCode" bsSize="large">
                      <FormLabel>Confirmation Code</FormLabel>
                      <FormControl
                        autoFocus
                        type="tel"
                        onChange={handleFieldChange}
                        value={fields.confirmationCode}
                      />
                      <FormText>Please check your email (and Spam/Junk folder) for the code.</FormText >
                    </FormGroup>
                    <LoaderButton
                      block
                      variant="primary"
                      type="submit"
                      bssize="large"
                      isLoading={isLoading}
                      disabled={!validateConfirmationForm()}
                    >
                      Verify
                    </LoaderButton>
                  </form>
                  </Card>
                  </Col>
                <Col md="auto" lg="4" ></Col>
            </Row>
            <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      </Container>
    );
  }
