import React from "react";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import CinemaAxios from "../../apis/CinemaAxios";

import { withNavigation } from "../../routeconf";

class DodajUtakmicu extends React.Component {
  constructor(props) {
    super(props);

    let utakmica = {
      reprezentacijaAId: "",
      reprezentacijaBId:"",
      brojGolovaA: 0,
      brojGolovaB: 0
    }

    this.state = {utakmica: utakmica, reprezentacije: [] };
    this.create = this.create.bind(this);
  }
  componentDidMount(){
    
    this.getReprezentacije();
  }

  async getReprezentacije(){
    CinemaAxios.get("/reprezentacije")
    .then(res => {
      this.setState({reprezentacije : res.data})
      console.log(this.state.reprezentacije)
    })
    .catch(error => console.log(error))
  }

 

  async create() {
  
   await  CinemaAxios.post("/utakmice", this.state.utakmica)
      .then((res) => {
        // handle success
        console.log(res);

        alert("Utakmica je uspesno dodata!");
        this.props.navigate("/utakmice");
      })
      .catch((error) => {
        // handle error
        console.log(error);
        alert("Doslo je do greske, utakmica nije uneta");
      });
  }

  valueInputChanged(e) {
    let input = e.target;

    let name = input.name;
    let value = input.value;

    let utakmica = this.state.utakmica;
    utakmica[name]= value;
    
    this.setState({utakmica});
  
}

  

  render() {
    return (
      <>
        <Row>
          <Col></Col>
          <Col xs="12" sm="10" md="8">
            <h1>Dodaj utakmicu</h1>
            <Form>
            <Form.Group>
                    <Form.Label>Reprezentacija A</Form.Label>
                           <Form.Select name="reprezentacijaAId" onChange={event => this.valueInputChanged(event)}>
                                    <option value= "">Odaberi reprezentaciju</option>
                                    {
                                        this.state.reprezentacije.map((r) => {
                                            return (
                                                <option key={r.id} value={r.id}>{r.skraceniNaziv}</option>
                                            )
                                        })
                                    }
                             </Form.Select><br />
               </Form.Group>
              <Form.Group>
                    <Form.Label>Reprezentacija B</Form.Label>
                           <Form.Select name="reprezentacijaBId" onChange={event => this.valueInputChanged(event)}>
                                    <option value= "">Odaberi reprezentaciju</option>
                                    {
                                        this.state.reprezentacije.map((r) => {
                                            return (
                                                <option key={r.id} value={r.id}>{r.skraceniNaziv}</option>
                                            )
                                        })
                                    }
                             </Form.Select><br />
               </Form.Group>
                
              

              <Button style={{ marginTop: "25px" }} onClick={this.create}>
                Kreiraj utakmicu
              </Button>
            </Form>
          </Col>
          <Col></Col>
        </Row>

        
      </>
    );
  }
}

export default withNavigation(DodajUtakmicu);