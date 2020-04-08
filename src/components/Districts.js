import React from 'react';
import axios from 'axios';
import {Container, Grid, Header, Table, Dimmer, Loader, Image, Segment} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class Districts extends React.Component{

    state = {
        districts : [],
        loaded : false
    };

    componentDidMount() {
        axios.get('https://api.ibb.gov.tr/ispark/Park')
            .then((response) => {
                //console.log(response.data)
                let ilceler = [];
                let tuples = [];
                response.data.forEach(ilce => {
                    ilceler.push(ilce.Ilce)
                });
                //eliminate duplicates, turn into set
                ilceler.splice(0, ilceler.length, ...(new Set(ilceler)));

                let id = 0;
                ilceler.forEach(ilce =>{
                    id++;
                    tuples.push({ilce, id})
                });
                console.log(tuples);
                this.setState({districts : tuples, loaded : true})
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    render() {
        let dis = this.state.districts.map(di => {
            return (
                <Table.Row key = {di.id}>
                    <Table.Cell><div>
                        <Link to={{pathname:'/districts/' + di.ilce}}>{di.ilce}</Link>
                    </div></Table.Cell>
                </Table.Row>
            )
        });
        return(
            <Container text>
                <br/>
                <br/>
                <Header as = 'h2' textAlign = 'center'>List of Districts</Header>
                <br/>
                <Grid centered>
                    {this.state.loaded ? <Table basic='very' celled collapsing>
                        <Table.Body>{dis}</Table.Body>
                    </Table> : <Segment>
                        <Dimmer active inverted>
                            <Loader inverted>Loading</Loader>
                        </Dimmer>

                        <Image src='/short-paragraph.png' />
                    </Segment>}

                </Grid>
            </Container>

        )
    }

}

export default Districts;