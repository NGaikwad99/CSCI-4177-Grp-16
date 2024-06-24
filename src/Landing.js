import './landing.css'
import mission from './assets/img/mission.png'

function Landing() {
    return (
        <main className="landing">
            <section className="mission">
                <div className='content'>
                    <h1>Our Mission</h1>
                    <p>
                        Here at SafeSpace we strive to offer a safe place for people of all backgrounds to have a place to meet not only with qualified professionals, but also with other individuals in our growing community.
                        <br />
                        <br />
                        Schedule a regular meeting session, join an impromptu meeting, make friends and join online discussions, all while being provided with an abundance of resources and tools to help you along your journey.
                    </p>
                </div>
                <img className='mission-image' src={mission}></img>
            </section>

            <section className="services">
                <div className="service" style={{ backgroundColor: '#FFC1C1' }}>
                    <h2>Meet Virtually</h2>
                    <p>
                    Take advantage of our scheduling system to attend regular therapy sessions with qualified professionals, or join an impromptu session on the fly.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#C1FFC1' }}>
                    <h2>Join Our Community</h2>
                    <p>
                    Join our online discussion forum to meet new people, and make new friends to support one another in your mental health journey.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#C1C1FF' }}>
                    <h2>Find Local Resources</h2>
                    <p>
                    We offer plenty of online resources, including a list of resources available in your area.
                    </p>
                </div>
                <div className="service" style={{ backgroundColor: '#FFFFC1' }}>
                    <h2>Journal Your Journey</h2>
                    <p>
                    Keep track of your mental health journey with our embedded diary system.
                    </p>
                </div>
            </section>
        </main>
    )
}

export default Landing;