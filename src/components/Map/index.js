import * as d3 from 'd3';
import React from 'react';
import World from '../../world';
import FoodData from '../../food-data.json';
import Header from '../../components/Header';
import IntroModal from '../../components/IntroModal';
import meteroa from '../../icons/meteroa.jpg';
import { INTRO, HELPER, HELLO } from '../../types';

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentCountry: null
        }
    }

    componentDidMount() {
        this.renderMap();
    }

    closePopup = () => {
        document.querySelector('#modal-container-country').classList.add('out');
    }

    renderMap = () => {
        var numCountry = 17;

        // Width and height
        var chart_width     =  1900; // window.innerWidth - 1900
        var chart_height    =  1700; 
        
        var projection = d3.geoMercator()
        .center([0,0])    
        .scale((chart_width - 3) / (2 * Math.PI))
        .rotate([-10,0])
        .translate([chart_width / 2, chart_height / 2]);

        var path = d3.geoPath()
        .projection(projection);
        
        const width = d3.select('#chart').node().getBoundingClientRect().width;
        const height = width / 2;

        var zoom = d3.zoom().scaleExtent([1, 40])
        .extent([[width, height], [width, height]])
        .on("zoom", zoomed);
        
        // Create SVG
        var svg             =   d3.select("#chart")
            .append("svg")
            .attr('viewBox', '-100 -250 2100 1800')
            .attr('preserveAspect', 'xMidYMid')
            .style("position", "absolute")
            .style("top", "50%")
            .style("left", "50%")
            .style("transform", "translate(-50%, -50%)")
            .style("width", "100%")
            .call(zoom);

        var map             =   svg.append( 'g' )
            .attr( 'id', 'map' );

        function zoomed(){
            map.attr("transform", d3.event.transform);
        }

        var tooltip = d3.select("body").append("div") 
            .attr("class", "tooltip")       
            .style("opacity", 1)
            .style("background", "orange")
            .style("position", "absolute")
            .style("font-family", "monospace")
            .style("padding", "10px");

        // load in data Data
        World.features.forEach(function(us_e, us_i) {
            FoodData.forEach(function(z_e,z_i) {
                if( us_e.properties.name !== z_e.country ){
                    return null;
                }
                World.features[us_i].properties.num   =  z_e.num;
                World.features[us_i].properties.color  =  z_e.color;              
                World.features[us_i].properties.cities  =  z_e.cities;
                World.features[us_i].properties.food  =  z_e.food;
                World.features[us_i].properties.pic  =  z_e.pic;                
                World.features[us_i].properties.num  =  z_e.num;
                World.features[us_i].properties.tips =  z_e.tips;
            });
        });
         //apend data
         map.selectAll('path')
         .data( World.features )
         .enter()
         .append('path')
         .attr('class', 'path')
         .attr('d', path)
         .attr('fill', function( d, i ){
             var country = d.properties.num;
             return country ? d.properties.color : '#000000c2'; //only color in those with data
         })
         .attr('stroke', function(d) {
             if(d.properties.name == 'Singapore') {
                 return "#ab91ce";
             } else {
                 return 'green';
             }
         })
         .attr('stroke-width', function(d) {
             if(d.properties.name == 'Singapore') {
                 return 8;
             } else {
                if(d.properties.name == 'Singapore') {
                    return 8;
                } else {
                 return 1;
                }
             }
         })
         .on("mouseover", function(d, i) {    

             var country = d.properties.num;
             
             if(country) {
                 map.selectAll('path').attr('stroke-width', function(country) {
                     if(country.properties.num === d.properties.num) {
                         return 4;
                     } else {
                         return 0.8;
                        
                     }
                 })    
                 document.querySelector('body').style.cursor = 'pointer';         
             } else {
                document.querySelector('body').style.cursor = 'auto';      
             }   


            tooltip.style("left", (d3.event.pageX + 15) + "px")   
                    .style("top", (d3.event.pageY - 10) + "px")
                    .text(d.properties.name)

            tooltip.transition()
                .duration(0)
                .style('display', 'block')
                .style('opacity', 1)  
         })
         .on("mouseout", function() {
            map.selectAll('path').attr('stroke-width', function(country) {
                if(country.properties.name == 'Singapore') {
                    return 8;
                } else {
                    return 1;
                }
            })
            document.querySelector('body').style.cursor = 'auto';      
            tooltip.style("opacity", 0);
         })
         .on("click", function(d) {                                  
            if(d.properties.num) {
                document.querySelector('#modal-container-country').removeAttribute("class");
                document.querySelector('#modal-container-country').classList.add('one');
                document.querySelector('#countryName').innerHTML = d.properties.name;
                document.querySelector('#rank').innerHTML = `Rank: ${d.properties.num}`;
                document.querySelector('#countryPhoto').src = d.properties.pic;
                document.querySelector('#foodRecommendations').innerHTML = `Foods to try: ${d.properties.food}`;
                document.querySelector('#cities').innerHTML = `Cities visited: ${d.properties.cities}`;
                document.querySelector('#tips').innerHTML = `Side note: ${d.properties.tips}`;
            }

         });
    }

    render() {
        return (
        <div>
            <div id="chart">
                <Header 
                    title="The Food Hunt"
                    sideNote="Scroll to zoom in and drag to navigate"
                />
                <div id="modal-container-country">
                    <div className="modal-background modal-background-country">
                        <div className="modal modal-country">
                            <span className="close" onClick={this.closePopup}>&times;</span>
                            <img id="countryPhoto" src="" width="100%"></img>
                            <h2 id="countryName"></h2>
                            <p id="rank"></p>
                            <p id="foodRecommendations"></p>
                            <p id="cities"></p>
                            <p id="tips"></p>
                        </div>
                    </div>
                </div>
            </div>
            <IntroModal 
                firstVisitText={HELLO}
                helper={HELPER} 
                dp={meteroa}
                description={INTRO}
            />
            </div>)
    }
}

export default Map;