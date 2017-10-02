import React from 'react';
import PropTypes from 'prop-types';

Catalog.propTypes = {
	items: PropTypes.array
};
export default function Catalog ({items}) {
	return (
		<div className="container">
			<main>
				<div className="wrapper">
					<section className="slider"> 
						<div className="detail-slider">
							<div className="slider-block item1">
								<div className="content-slider">
									<h3 className="title-slider">Fundamentals of Engineering Statistical Analysis</h3>
									<p className="detail-txt">This course provides fundamental concepts in probability and statistical inference, with application to engineering contexts.</p>
									<div className="statistic">
										<ul>
											<li> 
												<p className="date">Starts December 30  </p>
											</li>
											<li>
												<p className="visiter">•  4,321 Learners</p>
											</li>
											<li> 
												<p className="spot">20 Spots Left</p>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<div className="slider-block item2">
								<div className="content-slider">
									<h3 className="title-slider">Fundamentals of Engineering Statistical Analysis</h3>
									<p className="detail-txt">This course provides fundamental concepts in probability and statistical inference, with application to engineering contexts.</p>
									<div className="statistic">
										<ul>
											<li> 
												<p className="date">Starts December 1  </p>
											</li>
											<li>
												<p className="visiter">•  4,321 Learners</p>
											</li>
											<li> 
												<p className="spot">200 Spots Left          </p>
											</li>
										</ul>
									</div>
								</div>
							</div>
							<button className="arrow-left">prev</button>
							<button className="arrow-right"> next</button>
						</div>
					</section>
					<section className="content-catalog">
						<div className="side-bar-right">
							<div className="item popular-block">
								<p className="title-sidebar">POPULAR COURSES</p>
								<ol>
									<li> 
										<p>Law and Jusice</p>
									</li>
									<li> 
										<p>Chemistry of Beer</p>
									</li>
									<li> 
										<p>Gateway to College Learning  </p>
									</li>
									<li> 
										<p>Physical Geology for Scien …</p>
									</li>
									<li> 
										<p>Data Analyitcs  </p>
									</li>
								</ol>
							</div>
							<div className="item tag-block">
								<p className="title-sidebar">BROWSE BY TAG</p>
								<ul>
									<li> 
										<p>Free Courses</p>
									</li>
									<li> 
										<p>Physics</p>
									</li>
									<li> 
										<p>Computer Science  </p>
									</li>
									<li> 
										<p>Health</p>
									</li>
									<li> 
										<p>Economics </p>
									</li>
								</ul>
							</div>
							<div className="item redeem-block">
								<p>Redeem Code       </p>
							</div>
						</div>
						<div className="course-card">
							<div className="course-block"><img alt="course" src="assets/images/course1.png"/>
								<div className="info-course"><span>STATS 3201</span>
									<h3>INTRODUCTION TO WATER</h3><a href="#">R. DOUGLAS ELMORE, PHD</a>
								</div>
							</div>
							<div className="course-block"><img alt="course" src="assets/images/course2.png"/>
								<div className="info-course"><span>BIOL 2124</span>
									<h3>HUMAN PHYSIOLOGY</h3><a href="#">R. DOUGLAS ELMORE, PHD</a>
								</div>
							</div>
							<div className="course-block"><img alt="course" src="assets/images/course3.png"/>
								<div className="info-course"><span>ECON 2843</span>
									<h3>ELEMANTARY BUSINESS STATISTICS</h3><a href="#">R. DOUGLAS ELMORE, PHD        </a>
								</div>
								<div className="enroll"><a>ENROLLED</a></div>
							</div>
							<div className="course-block"><img alt="course" src="assets/images/course4.png"/>
								<div className="info-course"><span>UCOL 1002</span>
									<h3>Gateway to College Learning</h3><a href="#">LILEAN MILLER, M.ED.</a>
								</div>
							</div>
							<div className="course-block"><img alt="course" src="assets/images/course5.png"/>
								<div className="info-course"><span>SS 001</span>
									<h3>GARY ENGLAND’S TORNADO ALLEY</h3><a href="#">R. DOUGLAS ELMORE, PHD</a>
								</div>
							</div>
							<div className="course-block"><img alt="course" src="assets/images/course3.png"/>
								<div className="info-course"><span>ECON 2843</span>
									<h3>ELEMANTARY BUSINESS STATISTICS</h3><a href="#">R. DOUGLAS ELMORE, PHD        </a>
								</div>
								<div className="enroll"><a>STARTS NOV. 23    </a></div>
							</div>
						</div>
					</section>
				</div>
			</main>
		</div>
	);
}
