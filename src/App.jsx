
import styles from './App.module.scss'
import { Form, Table } from './components';
import { useState } from 'react';


function App() {

  const [selectedStudent, setSelectedStudent] = useState(null); //state for the selected student

    const handleEditStudent = (student) => { 
        setSelectedStudent(student); //setting of the state
    };

  return (
    <section className={styles.app}>
      <div className={styles.taskTable}>
        <Table editStudent={handleEditStudent}/>
        <Form studentData={selectedStudent}/>
      </div>
    </section>
  )
}

export default App
