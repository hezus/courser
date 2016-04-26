import React from 'react';
import jQuery from 'jquery';

class Students extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      students: []
    };
  }

  componentDidMount() {
    this.loadStudents()
  }

  loadStudents(event){
    jQuery.get("http://localhost:3000/students.json", function(data){
      this.setState({
        students: data.students
      });
    }.bind(this));
  }

  render() {
    let students = this.state.students.map(function(student) {
      return <option key={student.id} value={student.id}>{student.name}</option>;
    });

    return (
        <select>
          {students}
        </select>
    )
  }

}

export default Students;