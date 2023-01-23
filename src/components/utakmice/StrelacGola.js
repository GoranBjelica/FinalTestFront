import React from 'react';
import CinemaAxios from '../../apis/CinemaAxios';

import './../../index.css';
import { withParams, withNavigation } from '../../routeconf'
import { Button, Col, Form, Row } from 'react-bootstrap';

class StrelacGola extends React.Component{

    constructor(props) {
        super(props);

       
        this.state = {
           igraci: [],
           igracId: -1
            
        }
    }
    componentDidMount(){
        this.getIgrace();
    }

    async getIgrace(){
        CinemaAxios.get("/reprezentacije/" + this.props.params.id)
        .then(res => {
          this.setState({igraci : res.data})
          console.log(this.state.igraci)
        })
        .catch(error => console.log(error))
      }

    selectChange(e){
      
        this.setState({igracId: e.target.value})
    }

dodajGol(){

    CinemaAxios.put('/igraci/'+ this.state.igracId);
    this.props.navigate("/utakmice")
}

    render() {
        return (
            <>
            <Form style={{ width: "99%" }}>
                <Row>
                <Form.Group>
                    <Form.Label>Reprezentacija A</Form.Label>
                           <Form.Select name="igracId" onChange={event => this.selectChange(event)}>
                                    <option value= "">Strelac gola</option>
                                    {
                                        this.state.igraci.map((igrac) => {
                                            return (
                                                <option key={igrac.id} value={igrac.id} >{igrac.ime} {igrac.prezime}</option>
                                            )
                                        })
                                    }
                             </Form.Select><br />
               </Form.Group>
           
                </Row>
                               
            </Form>
            <Row><Col>
                <Button className="mt-3" onClick={() => this.dodajGol()}>Dodaj gol</Button>
            </Col></Row>
            </>
        );
    }

}

export default withNavigation(withParams(StrelacGola));