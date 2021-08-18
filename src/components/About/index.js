import React from 'react'
import './About.css'

export default function About() {
    return (
        <div class='container d-flex flex-column' style={{marginTop: 50}}>
            <div class='d-flex justify-content-start'>
                <h3>About Us</h3>
            </div>
            <hr></hr>

            <div  class='d-flex flex-column justify-content-start align-items-center'>
                <div>
                    <h2>Welcome to Course Academy</h2>
                </div>
                <div style={{width: '60%', marginTop: 30}}>
                    <div>
                        <p>"Course Academy is independent New York coursestore and language school with location in Manhattan
                        and Brooklyn. We specialize in travel courses and language classes."</p>
                    </div>
                    <div class='row' style={{marginTop: 40}}>
                        <div class='col d-flex align-items-start flex-column'>
                            <h4>Our Story</h4>
                            <p >
                                The name courseworm was taken from the original name for New York International Airport,
                                which was renamed JFK in December 1963
                                <br />
                                <br />
                                Our Manhattan store has just moved to the West Village. Our new location in 170 7th
                                Avenue South at the concer of Perry Street
                                <br/>
                                <br/>
                                From March 2008 thought May 2016, the store was located in the Flatiron District
                            </p>
                        </div>
                        <div class='col d-flex align-items-start flex-column'>
                            <h4>Our Vision</h4>
                            <p>
                                One of the last travel coursestores in the contry, out Manhattan store carries a range of guidecourses (all 10% off)
                                to suit the needs and lastest of every treveler and budget.
                            <br />
                            <br />
                            We beileve the a novel or travelouge can be just as valuable a key to a place as any guidecourses
                            , and our well-read, well travelouge staff is happy to make reading recommendations for any traveler, course lover, or giftgiver.
                            </p> 
                            <br />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
