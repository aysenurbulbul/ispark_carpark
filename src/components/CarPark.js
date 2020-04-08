import React from 'react';
import axios from 'axios';
import {Container, Dimmer, Grid, Header, Image, Loader, Segment, Table} from 'semantic-ui-react';
import {Link} from 'react-router-dom';


class CarPark extends React.Component{

    state = {
        carparks : [],
        loaded : false
    };

    componentDidMount() {
        axios.get('https://api.ibb.gov.tr/ispark/Park')
            .then((response) => {
                //console.log(response.data)
                let parks = [];
                response.data.forEach(ele => {
                    if(ele.Ilce === this.props.match.params.name){
                        let id = ele.ParkID;
                        let ad = ele.ParkAdi;
                        parks.push({id, ad});
                    }

                });
                console.log(parks)
                this.setState({carparks:parks, loaded:true});
            })
            .catch((error) => {
                console.log(error.message)
            })

    }

    render() {
        let pas = this.state.carparks.map(pa => {
            return (
                <Table.Row key = {pa.id}>
                    <Table.Cell><div>
                        <Link to={{pathname:'/carparks/' + pa.id}}>{pa.ad}</Link>
                    </div></Table.Cell>
                </Table.Row>
            )
        });
        let dist = this.props.match.params.name;
        dist = dist.toLowerCase();
        let thing = dist.charAt(0).toUpperCase() + dist.substring(1);
        return(
            <Container text>
                <br/>
                <br/>
                <Header as = 'h2' textAlign = 'center'>List of Car Parks in {thing}</Header>
                <br/>
                <Grid centered>
                    {this.state.loaded ? <Table basic='very' celled collapsing>
                        <Table.Body>{pas}</Table.Body>
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

export default CarPark;