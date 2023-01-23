import React from 'react';
import CinemaAxios from '../../apis/CinemaAxios';
import { Row, Col, Button, ButtonGroup, Table, Form, Collapse } from 'react-bootstrap'
import './../../index.css';
import { withParams, withNavigation } from '../../routeconf'

class Utakmice extends React.Component {

    constructor(props) {
        super(props);

        const search = {
            reprezentacijaAId: "",
            reprezentacijaBId: ""
            
        }
        this.state = {
            reprezentacije: [],
            utakmice:[],
            search: search,
            
            pageNo: 0,
            totalPages: 0,
            
        }
    }

    componentDidMount() {
        this.getReprezentacije();  
        this.getUtakmice(0);
    }

    

    async getReprezentacije(){
        CinemaAxios.get("/reprezentacije")
        .then(res => {
          this.setState({reprezentacije : res.data})
          console.log(this.state.reprezentacije)
        })
        .catch(error => console.log(error))
      }

    getUtakmice(newPageNo) {
       let config = {
           params: {
               reprezentacijaAId: this.state.search.reprezentacijaAId,
               reprezentacijaBId: this.state.search.reprezentacijaBId,
             pageNo: newPageNo
          }
      }
              /*if (this.state.search.name != "") {
            config.params['naziv'] = this.state.search.name;
        }
        if (this.state.search.minDuration != "") {
            config.params['trajanjeOd'] = this.state.search.minDuration;
        }
        if (this.state.search.maxDuration != "") {
            config.params['trajanjeDo'] = this.state.search.maxDuration;
        }*/
        CinemaAxios.get('/utakmice', config)  //dodaj config posle zareza
            .then(res => {
                // handle success
                console.log(res);
                this.setState({
                    utakmice: res.data,
                    pageNo: newPageNo,
                    totalPages:res.headers['total-pages']
                });
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Greska pri preuzimanju utakmica!');
            });
    }

    delete(utakmicaId) {
        CinemaAxios.delete('/utakmice/' + utakmicaId)
            .then(res => {
                // handle success
                console.log(res);
                alert('Utamica je uspesno obrisana!');
             window.location.reload();
            })
            .catch(error => {
                // handle error
                console.log(error);
                alert('Utakmica nije obrisana uspesno!');
            });
    }

    onInputChange(event) {
        
        const name = event.target.name;
        const value = event.target.value

        let search = this.state.search;
        search[name] = value;

        this.setState({ search })
    }
    najStrelac(){
        CinemaAxios.get("/igraci/najboljiStrelac")
        .then(res => alert(res.data))
    }


    goToAdd() {
        this.props.navigate('/dodaj');
    }

    povecajGolove(id, reprezentacijaId){
        CinemaAxios.put('/utakmice/povecajGolove/'+ id +"/"+reprezentacijaId)
        .then(res => {alert("Broj golova je uspesno promenjen")
        this.props.navigate("/strelacGola/0" +reprezentacijaId);})
        .catch(error => alert("Broj golova nije uspesno promenjen"))


    }

    renderUtakmice() {

        console.log(this.state.showSearch);
        return this.state.utakmice.map((u) => {
            return (
                <tr key={u.id}>
                    <td>{u.reprezentacijaANaziv}</td>
                    <td>{u.reprezentacijaBNaziv}</td>
                    <td>{u.brojGolovaA}</td>
                    <td>{u.brojGolovaB}</td>
                    <td>
                    <Button  variant='info' style={{color: 'white'}} onClick={() => this.povecajGolove(u.id, u.reprezentacijaAId)}>A+1</Button>
                    </td>   
                    <td>
                    <Button variant='info' style={{color: 'white'}} onClick={() => this.povecajGolove(u.id, u.reprezentacijaBId)}>B+1</Button>
                    </td>
                    {window.localStorage['role']=="ROLE_ADMIN"?
                    [
                    <td> <Button variant='danger'  onClick={() => this.delete(u.id)}>Obrisi</Button> </td>]: null}
            
                    
                </tr>
            )
        })
    }

    renderSearchForm() {
        return (
            <>
            <Form style={{ width: "99%" }}>
                <Row>
                <Form.Group>
                    <Form.Label>Reprezentacija A</Form.Label>
                           <Form.Select name="reprezentacijaAId" onChange={event => this.onInputChange(event)}>
                                    <option value= "">Odaberi reprezentaciju</option>
                                    {
                                        this.state.reprezentacije.map((r) => {
                                            return (
                                                <option key={r.id} value={r.id} >{r.skraceniNaziv}</option>
                                            )
                                        })
                                    }
                             </Form.Select><br />
               </Form.Group>
              <Form.Group>
                    <Form.Label>Reprezentacija B</Form.Label>
                           <Form.Select name="reprezentacijaBId" onChange={event => this.onInputChange(event)}>
                                    <option value= "">Odaberi reprezentaciju</option>
                                    {
                                        this.state.reprezentacije.map((r) => {
                                            return (
                                                <option key={r.id} value={r.id} >{r.skraceniNaziv}</option>
                                            )
                                        })
                                    }
                             </Form.Select><br />
               </Form.Group>
                </Row>
                               
            </Form>
            <Row><Col>
                <Button className="mt-3" onClick={() => this.getUtakmice(0)}>Pretraga</Button>
            </Col></Row>
            </>
        );
    }


    render() {
        return (
            <Col>
                <Row><h1>Utakmice</h1></Row>
                
                    {this.renderSearchForm()}
                
                <br/>
                <Row>
                <Col>
                <Button onClick={() => this.goToAdd() }>Nova utakmica</Button>
                </Col>
                <Col style={{display:'flex', justifyContent:'right'}}>
                <Button disabled={this.state.pageNo===0} 
                  onClick={()=>this.getUtakmice(this.state.pageNo-1)}
                  className="mr-3">Prethodna</Button>
                <Button disabled={this.state.pageNo===(this.state.totalPages-1)} 
                onClick={()=>this.getUtakmice(this.state.pageNo+1)}>Sledeca</Button>
                
                </Col>
                </Row>
                <Row><Col>
                <Table style={{marginTop: 5}}>
                <thead style={{color: 'white', background: 'black'}}>
                <tr>
                <th>Reprezentacija A</th>
                <th>Reprezentacija B</th>
                <th>Golova A</th>
                <th>Golova B</th>
               
                <th></th>
                <th></th>
                <th></th>
                
               
                </tr>
                </thead>
                <tbody>
                    {this.renderUtakmice()}
                </tbody>
                </Table>
                </Col>
                
                </Row>
                <Col>
                <Button variant='success' className="mt-3" onClick={() => this.najStrelac()}>Najbolji strelac</Button>
                </Col>
            </Col>
        );
    }
}

export default withNavigation(withParams(Utakmice));