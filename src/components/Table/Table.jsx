import styles from './Table.module.scss';
import { getData } from '../../services';
import { loadCollageList } from '../../services';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Table = ({editStudent}) => {
    const [data, setData] = useState([]); //data from server
    const [collageList, setCollageList] = useState([]); //collage list

    useEffect(() => { 
        const renderTable = async () => {
            try {
                const url = '/api/?action=get_students';
                const fetchedData = await getData(url);
                setData(fetchedData.data);
            } catch (error) {
                console.error('Error fetching students data:', error);
            }
        };

        //when we get the collage list then we request the data for the table
        loadCollageList(setCollageList).then(() => {
            renderTable();
        });
    }, []);

    //id forwarded from the delete button will be deleted
    const deleteStudent = (id) => {
        const url = `/api/?action=delete_student&student_id=${id}`;
        axios.delete(url)
            .then(response => {
                console.log("Student deleted:", response.data);
            })
            .catch(error => {
                console.error("There was an error deleting the student:", error);
            });

        window.location.reload(); //reload
    }

    return (
        <>
            <h2>List of students</h2>

            <table className={styles.table}>
                <thead>
                    <tr className={styles.tableRow}>
                        <th id="idCol">ID</th>
                        <th id="studentCol">Student</th>
                        <th id="collageCol">Collage</th>
                        <th id="emailCol">Email</th>
                        <th id="phoneCol">Phone</th>
                        <th id="birthCol">Birth date</th>
                        <th id="createdCol">Created</th>
                        <th id="actionsCol">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data && data.length > 0 ? (
                        data.map((student, index) => {
                            const collageName = collageList.find(
                                (element) => element.college_id === student.college_id
                            )?.name || student.college_id;

                            return (
                                <tr key={index} className={styles.tableRow}>
                                    <td>{Math.floor(index +1)}</td>
                                    <td>{student.first_name} {student.last_name}</td>
                                    <td>{collageName}</td>
                                    <td>{student.email}</td>
                                    <td>{student.phone}</td>
                                    <td>{student.birth_date}</td>
                                    <td>{student.created}</td>
                                    <td>
                                        <button onClick={()=>{editStudent(student)}}>Edit</button>
                                        <button onClick={() => {deleteStudent(student.student_id)}}>Delete</button>
                                    </td>
                                </tr>
                            );
                        })
                    ) : (
                        <tr>
                            <td colSpan="8">No data available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </>
    );
};

export { Table };
