import React from 'react';
import Course from './Course';
import jQuery from 'jquery';

class Courses extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      courses: []
    };
  }

  componentDidMount() {
    var self = this;
    jQuery.get("http://localhost:3000/courses.json", function(data){
      console.log(data.courses);
      self.setState({
        courses: data.courses,
        loaded: true
      });
    });
  }

  render() {
    if (!this.state.loaded) { return <div>Loading...</div>; }

    let courses = this.state.courses.map(function(course) {
      return <Course key={course.id} course={course} />;
    });

    return (
        <ul>
          {courses}
        </ul>
    )
  }

}

export default Courses;