import React from 'react';
import './landingPage.css';
import './mediaqueries.css';

const landingPage = () => {
  return (<>
    <div id="home">
        <section class="hero-section">
    <div>
      <div className='main-mission'>
      <div data-aos="fade-down" class="flex-hero">
          <h1>
            Your Health<br></br>
            <span>
              Our Mission
            </span>
          </h1>
          <h4>
            “Primum non nocere” <br></br>“First do no harm”</h4>
        </div>
      </div>
        <a href="/login"><button className ="startbutton" type="button"> Let's start
        </button>
        </a>
    </div>
    </section>
    </div>
    </>
  )
}

export default landingPage;